namespace apiProperties.Models;

public class MongoDbSettings
{
    public string ConnectionString { get; set; } = null!;
    public string DataBaseName { get; set; } = null!;
    public string OwnersCollection { get; set; } = null!;
    public string PropertiesCollection { get; set; } = null!;
}