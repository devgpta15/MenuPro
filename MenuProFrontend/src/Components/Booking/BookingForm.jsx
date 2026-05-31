import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import "./BookingForm.css";

export default function BookingForm({ restaurantId, onBook }) {
  const [slots, setSlots] = useState([]);
  const [tables, setTables] = useState([]);
  const [slotId, setSlotId] = useState("");
  const [tableId, setTableId] = useState("");
  const [error, setError] = useState("");
  const [tablesLoaded, setTablesLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load timeslots
  useEffect(() => {
    axiosInstance
      .get(`/timeslots/restaurant/${restaurantId}`)
      .then(r => setSlots(r.data))
      .catch(() => setError("Failed to load time slots"));
  }, [restaurantId]);

  const handleBook = async () => {
    setError("");
    const token = localStorage.getItem("token");
    if (!token || token === "undefined" || token === "null") {
      setError("Please login first to continue booking.");
      return;
    }

    if (!tablesLoaded) {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/tables/restaurant/${restaurantId}`);
        setTables(res.data);
        setTablesLoaded(true);
      } catch {
        setError("Failed to load tables. Try again.");
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!slotId) { setError("Please select a time slot."); return; }
    if (!tableId) { setError("Please select a table."); return; }

    const bookingDate = new Date().toISOString().slice(0, 10);
    onBook({ tableId: Number(tableId), timeSlotId: Number(slotId), bookingDate });
  };

  return (
    <div className="booking-form-card">
      {/* Header */}
      <div className="booking-form-header">
        <span className="booking-form-icon">📅</span>
        <div>
          <h3>Reserve Your Table</h3>
          <p>Pick a slot and table to book</p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="booking-error">
          <span>⚠️</span> {error}
        </div>
      )}

      {/* Time Slot Select */}
      <div className="booking-field">
        <label htmlFor="slot-select">🕐 Time Slot</label>
        <div className="booking-select-wrap">
          <select
            id="slot-select"
            value={slotId}
            onChange={e => setSlotId(e.target.value)}
            className="booking-select"
          >
            <option value="">Select a time slot</option>
            {slots.map(s => (
              <option key={s.timeSlotId} value={s.timeSlotId}>
                {s.startTime} – {s.endTime}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Select */}
      <div className="booking-field">
        <label htmlFor="table-select">🪑 Table</label>
        <div className="booking-select-wrap">
          <select
            id="table-select"
            value={tableId}
            disabled={!tablesLoaded}
            onChange={e => setTableId(e.target.value)}
            className={`booking-select ${!tablesLoaded ? "disabled-select" : ""}`}
          >
            <option value="">
              {!tablesLoaded ? "Click below to load tables" : "Select a table"}
            </option>
            {tables.map(t => (
              <option key={t.tableId ?? t.id} value={t.tableId ?? t.id}>
                Table {t.tableId ?? t.id} · {t.seats} seats
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table charge notice */}
      <div className="booking-charge-notice">
        <span>🏷️</span>
        <span>Table booking charge: <strong>₹100</strong></span>
      </div>

      {/* Action Button */}
      <button
        className={`booking-cta-btn ${loading ? "loading" : ""}`}
        onClick={handleBook}
        disabled={loading}
      >
        {loading ? (
          <span className="btn-spinner">⏳ Loading tables...</span>
        ) : tablesLoaded ? (
          <>✅ Continue to Pay</>
        ) : (
          <>🔓 Load Tables & Book</>
        )}
      </button>
    </div>
  );
}
