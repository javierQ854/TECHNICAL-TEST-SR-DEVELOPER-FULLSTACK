namespace apiProperties.DTOs;


public class PropertyOwnerDto
{
    public string Id { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Address { get; set; } = null!;
    public decimal Price { get; set; }
    public string CodeInternal { get; set; } = null!;
    public int Year { get; set; }
    public string OwnerId { get; set; } = null!;
    public OwnerDto Owner { get; set; } = null!;
    public List<ImageDto> Images { get; set; } = new();
    public List<TraceDto> Traces { get; set; } = new();
}