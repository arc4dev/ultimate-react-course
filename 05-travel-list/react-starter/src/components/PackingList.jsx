import { useState } from 'react';
import { PackingItem } from './PackingItem';

export const PackingList = ({
  items,
  onDeleteItem,
  onToggleItem,
  onDeleteItems,
}) => {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy === 'input') sortedItems = items;

  if (sortBy === 'packed')
    sortedItems = items.sort((a, b) => Number(a.packed) - Number(b.packed));

  if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <PackingItem
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      {/* Sort Component */}
      <div className="actions">
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onDeleteItems}>Clear list</button>
      </div>
    </div>
  );
};
