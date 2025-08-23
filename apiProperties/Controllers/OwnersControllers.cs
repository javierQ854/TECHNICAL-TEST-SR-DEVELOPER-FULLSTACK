using apiProperties.Models;
using apiProperties.Services;
using Microsoft.AspNetCore.Mvc;

namespace apiProperties.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OwnersControllers : ControllerBase

{
    private readonly OwnerService _ownerservice;

    public OwnersControllers(OwnerService ownerService) => _ownerservice = ownerService;

    [HttpGet]
    public async Task<ActionResult<List<Owner>>> GetOwner() => await _ownerservice.GetOwnersAsync();

}