export const Pizza = ({ name, ingredients, price, image, soldOut }) => {
  // early return
  // if (soldOut) return null;

  return (
    <li className={`pizza ${soldOut && 'sold-out'}`}>
      <img src={image} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? 'SOLD OUT' : +price}</span>
      </div>
    </li>
  );
};
