using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace apiProperties.Models;

public class Property
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; } = null!;

    [BsonElement("address")]
    public string Address { get; set; } = null!;

    [BsonElement("price")]
    public decimal Price { get; set; }

    [BsonElement("codeInternal")]
    public string CodeInternal { get; set; } = null!;

    [BsonElement("year")]
    public int Year { get; set; }

    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("ownerId")]
    public string OwnerId { get; set; } = null!;


    [BsonElement("images")]
    public List<PropertyImage> Images { get; set; } = new();


    [BsonElement("traces")]
    public List<PropertyTrace> Traces { get; set; } = new();
}