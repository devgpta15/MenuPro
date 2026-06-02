using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MenuPro.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddFoodItemImagePath : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "FoodItems",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.Sql(@"
UPDATE FoodItems
SET ImagePath = CASE
    WHEN FoodName LIKE '%naan%' OR FoodName LIKE '%Naan%' THEN '/images/FoodItems/naan-1.jpg'
    WHEN FoodName LIKE '%kofta%' OR FoodName LIKE '%Kofta%' THEN '/images/FoodItems/malai-kofta-1.jpg'
    WHEN FoodName LIKE '%dal%' OR FoodName LIKE '%Dal%' THEN '/images/FoodItems/malai-kofta-2.jpg'
    WHEN FoodName LIKE '%paneer%' OR FoodName LIKE '%Paneer%' THEN '/images/FoodItems/malai-kofta-2.jpg'
    ELSE '/images/FoodItems/naan-2.jpg'
END
WHERE ImagePath IS NULL OR ImagePath = '';

UPDATE Restaurants
SET ImagePath = CASE
    WHEN Name LIKE '%cafe%' OR Name LIKE '%Cafe%' THEN '/images/restaurants/cafe.jpg'
    WHEN Name LIKE '%ocean%' OR Name LIKE '%Ocean%' THEN '/images/restaurants/ocean.jpg'
    WHEN Name LIKE '%green%' OR Name LIKE '%Green%' THEN '/images/restaurants/green.jpg'
    WHEN Name LIKE '%delight%' OR Name LIKE '%Delight%' THEN '/images/restaurants/cafe-delight.jpg'
    ELSE '/images/restaurants/spice.jpg'
END
WHERE ImagePath IS NULL OR ImagePath = '';
");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
UPDATE Restaurants
SET ImagePath = NULL
WHERE ImagePath IN (
    '/images/restaurants/cafe.jpg',
    '/images/restaurants/ocean.jpg',
    '/images/restaurants/green.jpg',
    '/images/restaurants/cafe-delight.jpg',
    '/images/restaurants/spice.jpg'
);
");

            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "FoodItems");
        }
    }
}
