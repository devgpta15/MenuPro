using AutoMapper;
using MenuPro.Domain.Entities;
using MenuPro.Application.DTOs;

namespace MenuPro.Application.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // User mappings
            CreateMap<RegisterDto, User>()
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email != null ? src.Email.Trim().ToLowerInvariant() : string.Empty))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name != null ? src.Name.Trim() : string.Empty))
                .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.Phone != null ? src.Phone.Trim() : string.Empty));

            CreateMap<CreateManagerDto, User>()
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email != null ? src.Email.Trim().ToLowerInvariant() : string.Empty))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name != null ? src.Name.Trim() : string.Empty))
                .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.Phone != null ? src.Phone.Trim() : string.Empty));

            // Restaurant mappings
            CreateMap<CreateRestaurantDto, Restaurant>();

            // Table mappings
            CreateMap<Table, TableResponseDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.TableId))
                .ForMember(dest => dest.Seats, opt => opt.MapFrom(src => src.Capacity))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status));

            // Booking mappings
            CreateMap<CreateBookingRequestDto, Booking>();
            CreateMap<Booking, BookingSummaryResponseDto>();
            CreateMap<Booking, BookingHistoryDto>();
            CreateMap<BookingFood, BookingFoodItemDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.FoodItem != null ? src.FoodItem.FoodName : string.Empty));

            // FoodItem mappings
            CreateMap<FoodItemCreateDto, FoodItem>()
                .ForMember(dest => dest.FoodName, opt => opt.MapFrom(src => src.FoodName != null ? src.FoodName.Trim() : string.Empty));
            CreateMap<FoodItemUpdateDto, FoodItem>()
                .ForMember(dest => dest.FoodName, opt => opt.MapFrom(src => src.FoodName != null ? src.FoodName.Trim() : string.Empty));
        }
    }
}
