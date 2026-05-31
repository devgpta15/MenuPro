// import './Photos.css';
// export default function Photos({ photos }) {
    
//     // tempoaray images till backend part is not connected 
//     const fallbackPhotos = [
//         "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
//         "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
//         "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
//       ];
      




//     // if (!photos || photos.length === 0) {
//     //   return <p>No photos available.</p>;
//     // }

//     // 🔁 Decide source at runtime
//         const imagesToShow =
//         photos && photos.length > 0 ? photos : fallbackPhotos;

  
//     return (
//         <div className="photos-grid">
//       {photos.map((url, index) => (
//         <img key={index} src={url} alt="Restaurant" />
//       ))}
//     </div>

//     //   <div className="photos-grid">
//     //     {photos.map((url, index) => (
//     //       <img key={index} src={url} alt="Restaurant" />
//     //     ))}
//     //   </div>
//     );
//   }
  


import '../Styles/Photos.css';
import { API_ORIGIN } from "../services/axiosInstance";

export default function Photos({ photos }) {

  // 🔥 temporary images till backend is ready
  const fallbackPhotos = [
    `${API_ORIGIN}/images/restaurants/spice.jpg`,
    `${API_ORIGIN}/images/restaurants/cafe.jpg`,
    `${API_ORIGIN}/images/FoodItems/malai-kofta-1.jpg`,
    `${API_ORIGIN}/images/FoodItems/naan-1.jpg`,
  ];

  // 🔒 HARD SAFETY: always an array
  const imagesToShow = Array.isArray(photos) && photos.length > 0
    ? photos
    : fallbackPhotos;

  return (
    <div className="photos-grid">
      {imagesToShow.map((url, index) => (
        <img
          key={`${url}-${index}`}
          src={url}
          alt="Restaurant"
          onError={(e) => {
            e.currentTarget.src = fallbackPhotos[index % fallbackPhotos.length];
          }}
        />
      ))}
    </div>
  );
}
 
