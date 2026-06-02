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
    [Route("api/restaurants")]
    public class RestaurantsController : ControllerBase
    {
        private readonly IAppDbContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly IMapper _mapper;

        public RestaurantsController(IAppDbContext context, IWebHostEnvironment env, IMapper mapper)
        {
            _context = context;
            _env = env;
            _mapper = mapper;
        }

        // =========================================================
        //  PUBLIC API – HOME PAGE (NO LOGIN REQUIRED)
        // =========================================================
        [AllowAnonymous]
        [HttpGet("public")]
        public async Task<IActionResult> GetActiveRestaurants()
        {
            var restaurants = await _context.Restaurants
                .Where(r => r.IsActive)
                .Select(r => new
                {
                    r.RestaurantId,
                    r.Name,
                    r.Location,
                    r.Rating,
                    r.IsActive,
                    r.ImagePath
                })
                .ToListAsync();

            return Ok(restaurants);
        }

       
        [AllowAnonymous] // public details (optional)
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRestaurantById(int id)
        {
            var restaurant = await _context.Restaurants
                .Where(r => r.RestaurantId == id && r.IsActive)
                .Select(r => new
                {
                    r.RestaurantId,
                    r.Name,
                    r.Description,
                    r.Location,
                    r.City,
                    r.Rating,
                    r.TotalRatings,
                    r.PriceForTwo,
                    r.OpenTime,
                    r.CloseTime,
                    r.Phone,
                    r.ImagePath,

                    Tables = r.Tables.Select(t => new
                    {
                        t.TableId,
                        t.TableNumber,
                        t.Capacity,
                        t.Status
                    }).ToList(),

                    FoodItems = r.FoodItems.Select(f => new
                    {
                        f.FoodItemId,
                        f.FoodName,
                        f.Price,
                        f.IsAvailable,
                        f.ImagePath
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (restaurant == null) return NotFound("Restaurant not found");
            return Ok(restaurant);
        }



        // =========================================================
        //  ADMIN ONLY – CREATE RESTAURANT WITH IMAGE
        // =========================================================
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRestaurantDto dto)
        {
            var restaurant = _mapper.Map<Restaurant>(dto);

            _context.Restaurants.Add(restaurant);
            await _context.SaveChangesAsync();
            return Ok(restaurant);
        }


        // =========================================================
        //  ADMIN ONLY – GET ALL RESTAURANTS
        // =========================================================
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllRestaurants()
        {
            return Ok(await _context.Restaurants.ToListAsync());
        }

        // =========================================================
        //  ADMIN ONLY – ACTIVATE / DEACTIVATE RESTAURANT
        // =========================================================
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateRestaurantStatus(int id, bool isActive)
        {
            var restaurant = await _context.Restaurants.FindAsync(id);
            if (restaurant == null)
                return NotFound("Restaurant not found");

            restaurant.IsActive = isActive;
            await _context.SaveChangesAsync();

            return Ok(new { restaurant.RestaurantId, restaurant.Name, restaurant.IsActive });
        }
    }
}



