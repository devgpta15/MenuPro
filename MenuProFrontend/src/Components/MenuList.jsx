import MenuCard from "./MenuCard";
import { API_ORIGIN } from "../services/axiosInstance";

const dishPhotos = [
  "/images/FoodItems/malai-kofta-1.jpg",
  "/images/FoodItems/malai-kofta-2.jpg",
  "/images/FoodItems/naan-1.jpg",
  "/images/FoodItems/naan-2.jpg",
];

const resolveImageUrl = (path, fallbackIndex = 0) => {
  const fallback = dishPhotos[fallbackIndex % dishPhotos.length];
  const value = path || fallback;

  if (/^https?:\/\//i.test(value)) return value;
  return `${API_ORIGIN}${value}`;
};

export default function MenuList({ menu, onAddToCart }) {

  if (!menu || menu.length === 0) {
    return <p>No menu available.</p>;
  }

  return (
    <div className="menu-list">
      {menu.map((item, index) => {
        const mappedItem = {
          id: item.id ?? item.foodItemId,
          name: item.name ?? item.foodName,
          price: item.price,
          isAvailable: item.isAvailable,
          imageUrl: resolveImageUrl(item.imageUrl || item.imagePath || item.photoUrl, index),
          isVeg: true
        };

        return (
          <MenuCard
            key={mappedItem.id}
            item={mappedItem}
            onAdd={() => onAddToCart(mappedItem)}
          />
        );
      })}
    </div>
  );
}
