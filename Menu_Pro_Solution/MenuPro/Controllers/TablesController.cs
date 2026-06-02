using MenuPro.Application.DTOs;
using MenuPro.Domain.Entities;
using MenuPro.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Hotel.Controllers
{
    [ApiController]
    [Route("api/tables")]
    public class TablesController : ControllerBase
    {
        private readonly IAppDbContext _context;
        private readonly IMapper _mapper;

        public TablesController(IAppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // ? Only Admin can add tables
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Table table)
        {
            _context.Tables.Add(table);
            await _context.SaveChangesAsync();
            return Ok(table);
        }

        //Manager/Admin can view tables for a restaurant
        //Users can view tables to book


        [Authorize]
        [HttpGet("restaurant/{restaurantId}")]
        public async Task<IActionResult> GetByRestaurant(int restaurantId)
        {
            var tables = await _context.Tables
                .Where(t => t.RestaurantId == restaurantId)
                .ToListAsync();

            var dtos = _mapper.Map<List<TableResponseDto>>(tables);
            return Ok(dtos);
        }
    }

}


