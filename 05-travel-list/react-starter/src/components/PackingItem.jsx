export const PackingItem = ({ item, onDeleteItem, onToggleItem }) => {
  return (
    <li>
      <input
        onChange={() => onToggleItem(item.id)}
        value={item.checked}
        type="checkbox"
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};
