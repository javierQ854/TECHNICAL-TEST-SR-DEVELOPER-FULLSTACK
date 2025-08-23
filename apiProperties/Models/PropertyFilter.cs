namespace apiProperties.Models;

public class PropertyFilter
{
    public string? name { get; set; }
    public string? address { get; set; }
    public decimal? minPrice { get; set; }
    public decimal? maxPrice { get; set; }
}