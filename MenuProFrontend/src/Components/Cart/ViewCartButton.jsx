import "./ViewCartButton.css";

export default function ViewCartButton({ cart, onClick }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  if (!cart.length) return null;

  return (
    <button className="view-cart-btn" onClick={onClick} aria-label="View cart">
      <span className="view-cart-icon">🛒</span>
      <span className="view-cart-text">View Cart</span>
      <span className="view-cart-badge">{count}</span>
      <span className="view-cart-divider">|</span>
      <span className="view-cart-total">₹{total}</span>
    </button>
  );
}
