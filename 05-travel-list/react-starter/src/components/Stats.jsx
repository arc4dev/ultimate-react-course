export const Stats = ({ items }) => {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 👌</em>
      </p>
    );

  const itemsCount = items.length;
  const itemsPacked = items.reduce(
    (acc, curr) => (curr.packed ? acc + 1 : acc),
    0
  );
  const percentage = Math.round((itemsPacked / itemsCount) * 100);

  return (
    <footer className="stats">
      <em>
        👜You have {itemsCount} items on your list, and you already packed{' '}
        {itemsPacked}({percentage}%)
      </em>
    </footer>
  );
};
