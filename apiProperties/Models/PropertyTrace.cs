using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace apiProperties.Models;

public class PropertyTrace
{

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("id")]
    public string? Id { get; set; } 

    [BsonElement("dateSale")]
    public DateTime DateSale { get; set; }

    [BsonElement("name")]
    public string Name { get; set; } = null!;

    [BsonElement("value")]
    public decimal Value { get; set; }

    [BsonElement("tax")]
    public decimal Tax { get; set; }
}