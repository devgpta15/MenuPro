import "../../Styles/component/CartDrawer.css";

export default function CartDrawer({ cart, onAdd, onRemove, onDelete, onClose }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="cart-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cart-drawer">

        {/* HEADER */}
        <div className="cart-header">
          <h3>
            🛒 Your Cart
            {itemCount > 0 && (
              <span className="cart-item-count">{itemCount}</span>
            )}
          </h3>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {/* ITEMS */}
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🍽️</div>
              <p>Your cart is empty.<br />Add items from the menu!</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">

                {/* INFO */}
                <div className="cart-item-info">
                  <strong>{item.name}</strong>
                  <span>₹{item.price} each</span>
                </div>

                {/* CONTROLS */}
                <div className="cart-controls">
                  <button className="qty-btn" onClick={() => onRemove(item.id)} aria-label="Decrease">−</button>
                  <span className="qty-display">{item.qty}</span>
                  <button className="qty-btn" onClick={() => onAdd(item)} aria-label="Increase">+</button>
                  <button className="delete-btn" onClick={() => onDelete(item.id)} aria-label="Remove item">🗑</button>
                </div>

                {/* LINE TOTAL */}
                <div className="item-total">₹{item.price * item.qty}</div>

              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span className="cart-total-label">Subtotal ({itemCount} items)</span>
              <span className="cart-total-amount">₹{total}</span>
            </div>
            <p className="cart-checkout-hint">💡 Select time slot & table on the right to proceed</p>
          </div>
        )}

      </div>
    </div>
  );
}
