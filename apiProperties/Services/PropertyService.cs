using apiProperties.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using apiProperties.DTOs;

namespace apiProperties.Services;

public class PropertyService
{
    private readonly IMongoCollection<Property> _property;

    public PropertyService(IOptions<MongoDbSettings> setting)
    {
        var client = new MongoClient(setting.Value.ConnectionString);
        var database = client.GetDatabase(setting.Value.DataBaseName);
        _property = database.GetCollection<Property>(setting.Value.PropertiesCollection);
    }

    public async Task<List<PropertyOwnerDto>> FilterPropertiesWithOwnerAsync(PropertyFilter filter)
    {
        var pipeline = new List<BsonDocument>();
        var match = new BsonDocument();

        // Filtros dinámicos
        if (!string.IsNullOrWhiteSpace(filter.id))
            match["_id"] = ObjectId.Parse(filter.id);

        if (!string.IsNullOrWhiteSpace(filter.name))
            match["name"] = new BsonDocument { { "$regex", filter.name }, { "$options", "i" } };

        if (!string.IsNullOrWhiteSpace(filter.address))
            match["address"] = new BsonDocument { { "$regex", filter.address }, { "$options", "i" } };

        if (filter.minPrice.HasValue || filter.maxPrice.HasValue)
        {
            var priceFilter = new BsonDocument();
            if (filter.minPrice.HasValue) priceFilter["$gte"] = filter.minPrice.Value;
            if (filter.maxPrice.HasValue) priceFilter["$lte"] = filter.maxPrice.Value;
            match["price"] = priceFilter;
        }

        if (match.ElementCount > 0)
            pipeline.Add(new BsonDocument("$match", match));

        // JOIN con Owners
        pipeline.Add(new BsonDocument("$lookup", new BsonDocument
            {
                { "from", "Owner" },
                { "localField", "ownerId" },
                { "foreignField", "_id" },
                { "as", "Owner" }
            }));

        // Desenrollar array de Owner
        pipeline.Add(new BsonDocument("$unwind", "$Owner"));

        var properties = await _property.Aggregate<BsonDocument>(pipeline).ToListAsync();

        return properties.Select(MapOwnerDTO).ToList();

    }

    public async Task<List<PropertyOwnerDto>> GetPropertiesAsync()
    {
        var pipeline = new List<BsonDocument>();
        pipeline.Add(new BsonDocument("$lookup", new BsonDocument
            {
                { "from", "Owner" },
                { "localField", "ownerId" },
                { "foreignField", "_id" },
                { "as", "Owner" }
            }));

        pipeline.Add(new BsonDocument("$unwind", "$Owner"));

        var properties = await _property.Aggregate<BsonDocument>(pipeline).ToListAsync();

        return properties.Select(MapOwnerDTO).ToList();

    }
    private PropertyOwnerDto MapOwnerDTO(BsonDocument p)
    {
        return new PropertyOwnerDto
        {
            Id = p["_id"].AsObjectId.ToString(),
            Name = p["name"].AsString,
            Address = p["address"].AsString,
            Price = p["price"].ToDecimal(),
            CodeInternal = p["codeInternal"].AsString,
            Year = p["year"].ToInt32(),
            OwnerId = p["Owner"]["_id"].AsObjectId.ToString(),
            Owner = new OwnerDto
            {
                Id = p["Owner"]["_id"].AsObjectId.ToString(),
                Name = p["Owner"]["name"].AsString,
                Address = p["Owner"]["address"].AsString,
                Photo = p["Owner"]["photo"].AsString,
                Birthday = p["Owner"]["birthday"].ToUniversalTime()
            },
            Images = p["images"].AsBsonArray.Select(img => new ImageDto
            {
                Id = img["_id"].AsObjectId.ToString(),
                File = img["file"].AsString,
                Enabled = img["enabled"].AsBoolean
            }).ToList(),
            Traces = p["traces"].AsBsonArray.Select(trace => new TraceDto
            {
                Id = trace["_id"].AsObjectId.ToString(),
                DateSale = trace["dateSale"].ToUniversalTime(),
                Name = trace["name"].AsString,
                Value = trace["value"].ToDecimal(),
                Tax = trace["tax"].ToDecimal()
            }).ToList()
        };
    }
}


