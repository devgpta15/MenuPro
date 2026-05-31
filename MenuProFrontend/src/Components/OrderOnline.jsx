import { useNavigate, useParams } from "react-router-dom";

export default function OrderOnline({ menu }) {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!menu || menu.length === 0) {
    return (
      <div className="order-online">
        <div className="order-empty">No items available for online order.</div>
      </div>
    );
  }

  return (
    <div className="order-online">
      <div className="order-heading">
        <div>
          <h3>Order Online</h3>
          <p>Pick your favorites and reserve a table to complete checkout.</p>
        </div>
        <button className="order-book-btn" type="button" onClick={() => navigate(`/restaurant/${id}/book`)}>
          Book & Order
        </button>
      </div>

      <div className="order-list">
        {menu.map((item) => (
          <div key={item.id} className="order-item">
            <div className="order-item-main">
              <div className="order-thumb">
                <img src={item.imageUrl} alt={item.name} />
                <div className="veg-dot" aria-hidden="true">
                  <span />
                </div>
              </div>
              <div>
                <h4>{item.name}</h4>
                <p>Rs {item.price}</p>
              </div>
            </div>

            <button
              type="button"
              className="order-add-btn"
              disabled={!item.isAvailable}
              onClick={() => navigate(`/restaurant/${id}/book`)}
            >
              {item.isAvailable ? "+ Add" : "Unavailable"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
