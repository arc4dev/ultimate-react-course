import { useState } from 'react';

export const AddItemForm = ({ onAddItem }) => {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    // Add item to the items state
    onAddItem(newItem);

    // Reset form by resetting state
    setDescription('');
    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="Item..."
      />
      <button type="submit">Add</button>
    </form>
  );
};
