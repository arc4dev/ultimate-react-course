import { useState } from 'react';
import { AddItemForm } from './components/AddItemForm';
import { Logo } from './components/Logo';
import { PackingList } from './components/PackingList';
import { Stats } from './components/Stats';

function App() {
  const [items, setItems] = useState([]);

  const handleAddItem = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const onToggleItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleDeleteItems = () => {
    setItems([])

  return (
    <div className="app">
      <Logo />
      <AddItemForm onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={onToggleItem}
        onDeleteItems={handleDeleteItems}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
