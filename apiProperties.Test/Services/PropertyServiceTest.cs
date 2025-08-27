using apiProperties.DTOs;
using apiProperties.Models;
using apiProperties.Services;
using MongoDB.Bson;
using MongoDB.Driver;
using Moq;
using NUnit.Framework;
using System.Threading;
using System.Collections.Generic;
using System.Linq;

namespace apiProperties.Test.Services
{
    [TestFixture]
    public class PropertyServiceTest
    {
        private Mock<IMongoCollection<Property>> _mockCollection = null!;
        private PropertyService _service = null!;

        [SetUp]
        public void Setup()
        {
            // Documento simulado
            var propertyBson = new BsonDocument
            {
                { "_id", ObjectId.GenerateNewId() },
                { "name", "Casa prueba" },
                { "address", "Calle Falsa 123" },
                { "price", 150000 },
                { "codeInternal", "P001" },
                { "year", 2022 },
                { "ownerId", ObjectId.GenerateNewId() },
                { "Owner", new BsonDocument {
                    { "_id", ObjectId.GenerateNewId() },
                    { "name", "Danilo" },
                    { "address", "Calle 123" },
                    { "photo", "url" },
                    { "birthday", DateTime.UtcNow }
                }},
                { "images", new BsonArray { new BsonDocument { { "_id", ObjectId.GenerateNewId() }, { "file", "img1.jpg" }, { "enabled", true } } } },
                { "traces", new BsonArray { new BsonDocument { { "_id", ObjectId.GenerateNewId() }, { "dateSale", DateTime.UtcNow }, { "name", "Venta 1" }, { "value", 1000 }, { "tax", 100 } } } }
            };
            var properties = new List<BsonDocument> { propertyBson };

            // Mock de IAsyncCursor<BsonDocument>
            var mockCursor = new Mock<IAsyncCursor<BsonDocument>>();
            mockCursor.Setup(_ => _.Current).Returns(properties);
            mockCursor
                .SetupSequence(_ => _.MoveNext(It.IsAny<CancellationToken>()))
                .Returns(true)
                .Returns(false);
            mockCursor
                .SetupSequence(_ => _.MoveNextAsync(It.IsAny<CancellationToken>()))
                .ReturnsAsync(true)
                .ReturnsAsync(false);

            // Mock de la colección
            _mockCollection = new Mock<IMongoCollection<Property>>();
            _mockCollection
                .Setup(c => c.Aggregate(
                    It.IsAny<PipelineDefinition<Property, BsonDocument>>(),
                    It.IsAny<AggregateOptions>(),
                    It.IsAny<CancellationToken>()))
                .Returns(mockCursor.Object);

            // Servicio con la colección mockeada
            _service = new PropertyService(_mockCollection.Object);
        }

        [Test]
        public async Task GetPropertiesAsync_ShouldReturnMappedProperty()
        {
            var result = await _service.GetPropertiesAsync();

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result[0].Name, Is.EqualTo("Casa prueba"));
            Assert.That(result[0].Owner.Name, Is.EqualTo("Danilo"));
            Assert.That(result[0].Images.Count, Is.EqualTo(1));
            Assert.That(result[0].Traces.Count, Is.EqualTo(1));
        }

        [Test]
        public async Task FilterPropertiesWithOwnerAsync_ShouldReturnFilteredProperty()
        {
            var filter = new PropertyFilter { name = "Casa" };
            var result = await _service.FilterPropertiesWithOwnerAsync(filter);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result[0].Name, Does.Contain("Casa"));
        }
    }
}
