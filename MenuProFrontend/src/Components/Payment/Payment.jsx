import "../../Styles/component/Payment.css";

export default function RazorpayDemo({ booking, cart = [], error = "", onSuccess, onCancel }) {
  const tableCharge = Number(booking?.tableCharge || 0);
  const foodTotal = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0);
  const total = foodTotal + tableCharge;

  return (
    <div className="payment-overlay" role="dialog" aria-modal="true" aria-labelledby="payment-title">
      <div className="payment-card">
        <div className="payment-banner">
          <h3 id="payment-title">Confirm Payment</h3>
          <p>Review your booking and complete the demo payment.</p>
        </div>

        <div className="payment-header">
          <h3>Booking Summary</h3>
          <button className="close-btn" type="button" onClick={onCancel} aria-label="Close payment">
            x
          </button>
        </div>

        <div className="payment-body">
          <section className="payment-section">
            <h4>Reservation</h4>
            <div className="info-grid">
              <span>Restaurant</span>
              <span>#{booking?.restaurantId || "-"}</span>
              <span>Table</span>
              <span>#{booking?.tableId || "-"}</span>
              <span>Time Slot</span>
              <span>#{booking?.timeSlotId || "-"}</span>
            </div>
          </section>

          <section className="payment-section">
            <h4>Food Items</h4>
            {cart.length === 0 ? (
              <div className="cart-row">
                <span className="item-name">No food items selected</span>
                <span className="item-price">Rs 0</span>
              </div>
            ) : (
              cart.map((item) => (
                <div className="cart-row" key={item.id}>
                  <span className="item-name">
                    {item.name}
                    <small>Qty {item.qty}</small>
                  </span>
                  <span className="item-price">Rs {Number(item.price || 0) * Number(item.qty || 0)}</span>
                </div>
              ))
            )}

            <div className="bill">
              <div className="bill-row">
                <span>Food total</span>
                <span>Rs {foodTotal}</span>
              </div>
              <div className="bill-row">
                <span>Table booking charge</span>
                <span>Rs {tableCharge}</span>
              </div>
              <div className="bill-row total">
                <span>Total</span>
                <span>Rs {total}</span>
              </div>
            </div>
          </section>
        </div>

        <div className="payment-footer">
          {error && <div className="payment-error">{error}</div>}
          <button className="pay-btn" type="button" onClick={onSuccess}>
            Pay Rs {total}
          </button>
          <div className="demo-text">Demo checkout: clicking pay saves the booking and payment record.</div>
        </div>
      </div>
    </div>
  );
}
