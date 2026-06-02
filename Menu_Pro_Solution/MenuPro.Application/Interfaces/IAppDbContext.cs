using Microsoft.EntityFrameworkCore;
using MenuPro.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace MenuPro.Application.Interfaces
{
    public interface IAppDbContext
    {
        DbSet<User> Users { get; }
        DbSet<Restaurant> Restaurants { get; }
        DbSet<Table> Tables { get; }
        DbSet<TimeSlot> TimeSlots { get; }
        DbSet<Booking> Bookings { get; }
        DbSet<FoodItem> FoodItems { get; }
        DbSet<BookingFood> BookingFoods { get; }
        DbSet<Payment> Payments { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
