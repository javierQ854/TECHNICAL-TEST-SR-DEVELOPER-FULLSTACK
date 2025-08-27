using apiProperties.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace apiProperties.Services;

public class OwnerService
{
    private readonly IMongoCollection<Owner> _owners;


    //Constructor para Obtener los datos desde base de datos
    public OwnerService(IOptions<MongoDbSettings> setting)
    {
        var client = new MongoClient(setting.Value.ConnectionString);
        var database = client.GetDatabase(setting.Value.DataBaseName);
        _owners = database.GetCollection<Owner>(setting.Value.OwnersCollection);
    }

    //Contructor para pruebas unitarias 
    public OwnerService(IMongoCollection<Owner> ownersCollection)
    {
        _owners = ownersCollection;
    }

    public async Task<List<Owner>> GetOwnersAsync() =>
            await _owners.Find(_ => true).ToListAsync();
}