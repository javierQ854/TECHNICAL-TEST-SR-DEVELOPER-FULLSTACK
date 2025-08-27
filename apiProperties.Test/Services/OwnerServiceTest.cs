using apiProperties.Models;
using apiProperties.Services;
using MongoDB.Driver;
using Moq;
using NUnit.Framework;

namespace apiProperties.Test.Services;

[TestFixture]
public class OwnerServiceTest
{
    private Mock<IMongoCollection<Owner>> _mockCollection = null!;
    private Mock<IAsyncCursor<Owner>> _mockCursor = null!;
    private OwnerService _service = null!;

    [SetUp]
    public void Setup()
    {
        // Datos simulados
        var owners = new List<Owner>
        {
            new Owner { Id = "1", Name = "Danilo", Address = "Calle 123", Photo = "url1", Birthday = new DateTime(1990,1,1) },
            new Owner { Id = "2", Name = "Maria", Address = "Carrera 45", Photo = "url2", Birthday = new DateTime(1995,5,5) }
        };

        // Mock del cursor de Mongo
        _mockCursor = new Mock<IAsyncCursor<Owner>>();
        _mockCursor.SetupSequence(x => x.MoveNext(It.IsAny<CancellationToken>()))
                   .Returns(true)
                   .Returns(false);
        _mockCursor.SetupSequence(x => x.MoveNextAsync(It.IsAny<CancellationToken>()))
                   .ReturnsAsync(true)
                   .ReturnsAsync(false);
        _mockCursor.SetupGet(x => x.Current).Returns(owners);

        // Mock de la colección
        _mockCollection = new Mock<IMongoCollection<Owner>>();
        _mockCollection.Setup(c => c.FindAsync(
            It.IsAny<FilterDefinition<Owner>>(),
            It.IsAny<FindOptions<Owner, Owner>>(),
            It.IsAny<CancellationToken>()
        )).ReturnsAsync(_mockCursor.Object);

        // Inyectamos el mock en el servicio
        _service = new OwnerService(_mockCollection.Object);
    }

    [Test]
    public async Task returnListOwners()
    {
        // Act
        var result = await _service.GetOwnersAsync();

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Count, Is.EqualTo(2));
        Assert.That(result[0].Name, Is.EqualTo("Danilo"));
        Assert.That(result[1].Name, Is.EqualTo("Maria"));
    }
}
