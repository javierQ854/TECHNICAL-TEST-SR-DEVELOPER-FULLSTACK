namespace apiProperties.DTOs;

public class TraceDto
{
    public string Id { get; set; } = null!;
    public DateTime DateSale { get; set; }
    public string Name { get; set; } = null!;
    public decimal Value { get; set; }
    public decimal Tax { get; set; }
}