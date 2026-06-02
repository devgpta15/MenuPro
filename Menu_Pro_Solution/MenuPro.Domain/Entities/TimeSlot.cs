using System;
using System.Collections.Generic;

namespace MenuPro.Domain.Entities
{
    public class TimeSlot
    {
        public int TimeSlotId { get; set; }

        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
