import { Pizza } from './Pizza';

export const Menu = ({ list }) => {
  return (
    <div className="menu">
      <h2>Our Menu</h2>

      {list.length > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious
          </p>
          <ul>
            {list.map((item) => (
              <Pizza
                name={item.name}
                ingredients={item.ingredients}
                price={item.price}
                image={item.photoName}
                soldOut={item.soldOut}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>We're working on our menu. Please come back later :)</p>
      )}
    </div>
  );
};
