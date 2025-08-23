namespace apiProperties.DTOs;

public class OwnerDto
{
    public string Id { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Address { get; set; } = null!;
    public string Photo { get; set; } = null!;
    public DateTime Birthday { get; set; }
}