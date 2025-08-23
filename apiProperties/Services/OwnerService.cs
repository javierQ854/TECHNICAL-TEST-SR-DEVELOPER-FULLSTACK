using apiProperties.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace apiProperties.Services;

public class OwnerService
{
    private readonly IMongoCollection<Owner> _owners;

    public OwnerService(IOptions<MongoDbSettings> setting)
    {
        var client = new MongoClient(setting.Value.ConnectionString);
        var database = client.GetDatabase(setting.Value.DataBaseName);
        _owners = database.GetCollection<Owner>(setting.Value.OwnersCollection);        
    }
    public async Task<List<Owner>> GetOwnersAsync() =>
            await _owners.Find(_ => true).ToListAsync();
}