import { createContext, useState } from 'react';

const AuthContext = createContext();

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const isAuth = !!user;

  const login = ({ email, password }) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      setUser(FAKE_USER);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider, AuthContext };
