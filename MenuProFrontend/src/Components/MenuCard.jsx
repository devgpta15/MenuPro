import "../Styles/MenuCard.css";
import { API_ORIGIN } from "../services/axiosInstance";

export default function MenuCard({ item, onAdd }) {
  const fallbackImage =
    `${API_ORIGIN}/images/FoodItems/malai-kofta-1.jpg`;

  return (
    <div className={`menu-card ${!item.isAvailable ? "disabled" : ""}`}>

      {/* IMAGE */}
      <div className="menu-image">
        <img
          src={item.imageUrl || fallbackImage}
          alt={item.name}
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
        {item.isVeg !== false && <span className="veg-badge" title="Vegetarian" />}
      </div>

      {/* INFO */}
      <div className="menu-info">
        <div>
          <h4>{item.name}</h4>
          <p>₹{item.price}</p>
        </div>

        {item.isAvailable ? (
          <button className="menu-add-btn" onClick={onAdd}>
            <span>+</span> Add
          </button>
        ) : (
          <span className="sold-out">Sold Out</span>
        )}
      </div>
    </div>
  );
}
