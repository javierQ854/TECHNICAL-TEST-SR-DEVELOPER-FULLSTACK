using Microsoft.AspNetCore.Mvc;
using apiProperties.Models;
using apiProperties.Services;
using MongoDB.Bson;

namespace RealEstateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
    private readonly PropertyService _propertyService;

    public PropertiesController(PropertyService propertyService) => _propertyService = propertyService;

    [HttpGet("filter")]
    public async Task<IActionResult> FilterProperties([FromQuery] PropertyFilter propertyFilter)
    {
        var result = await _propertyService.FilterPropertiesWithOwnerAsync(propertyFilter);
        return Ok(result);
    }

    [HttpGet]
    public async Task<ActionResult<List<Property>>> GetProperties()
    {
        var result = await _propertyService.GetPropertiesAsync();
        return Ok(result);
    }    

}
