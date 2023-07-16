import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export default function App() {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [friendsList, setFriendsList] = useState([...initialFriends]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend(friend) {
    setFriendsList((friendsList) => [...friendsList, friend]);

    // Hide add friend form
    setIsAddFriendOpen(false);
  }

  function handleSelectFriend(friend) {
    setSelectedFriend((current) => (current?.id === friend.id ? null : friend));

    setIsAddFriendOpen(false);
  }

  function handleSplitBill(bill) {
    setFriendsList((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + bill }
          : friend
      )
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friendsList}
          onClick={handleSelectFriend}
          selectedFriend={selectedFriend}
        />
        <FormAddFriend isOpen={isAddFriendOpen} onAddFriend={handleAddFriend} />
        <Button onClick={() => setIsAddFriendOpen((value) => !value)}>
          {isAddFriendOpen ? 'Close' : 'Add Friend'}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          friend={selectedFriend}
          handleSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onClick, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onClick={onClick}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onClick, selectedFriend }) {
  const selected = friend.id === selectedFriend?.id;

  return (
    <li className={selected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => onClick(friend)}>
        {selected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
}

function FormAddFriend({ isOpen, onAddFriend }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    // Reset form
    setName('');
    setImage('https://i.pravatar.cc/48');
  }

  return (
    <>
      {isOpen && (
        <form className="form-add-friend" onSubmit={handleSubmit}>
          <label>🙍‍♂️Friend name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            type="text"
          />

          <label>🛻Image URL</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            name="imgUrl"
            type="text"
          />
          <Button type="submit">Add</Button>
        </form>
      )}
    </>
  );
}

function Button({ children, onClick, type }) {
  return (
    <button onClick={onClick} className="button" type={type}>
      {children}
    </button>
  );
}

function FormSplitBill({ friend, handleSplitBill }) {
  const [bill, setBill] = useState(0);
  const [userExpenses, setUserExpenses] = useState(0);
  const [billOption, setBillOption] = useState('user');

  const friendExpenses = bill - userExpenses;

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !userExpenses) return;

    handleSplitBill(billOption === 'user' ? friendExpenses : -friendExpenses);

    // Reset form
    setBill(0);
    setUserExpenses(0);
    setBillOption('user');
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split bill with {friend.name}</h2>

      <label>🪙Bill value</label>
      <input
        onChange={(e) => setBill(+e.target.value)}
        value={bill}
        type="text"
      />

      <label>🙍‍♂️Your expense</label>
      <input
        onChange={(e) => {
          if (e.target.value <= bill) setUserExpenses(+e.target.value);
        }}
        value={userExpenses}
        type="text"
      />

      <label>🙍{friend.name}'s expense</label>
      <input value={friendExpenses} type="text" disabled />

      <label>Who is paying the bill?</label>
      <select
        onChange={(e) => setBillOption(e.target.value)}
        value={billOption}>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>

      <Button type="submit">Split bill</Button>
    </form>
  );
}
