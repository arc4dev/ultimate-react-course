export const Order = ({ closeHour }) => {
  return (
    <div className="order">
      <p>We're open until {closeHour}. Order online.</p>
      <button type="button" className="btn">
        Order
      </button>
    </div>
  );
};
