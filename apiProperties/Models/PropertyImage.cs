using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace apiProperties.Models;

public class PropertyImage
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; } 

    [BsonElement("file")]
    public string File { get; set; } = null!;

    [BsonElement("enabled")]
    public bool Enabled { get; set; }
}