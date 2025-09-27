/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { saveUser, getUser, removeUser } from "../../utils/Storage";

// ✅ export the context so useAuth.js can import it
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getUser());

  const login = (userData) => {
    setUser(userData);
    saveUser(userData);
  };

  const logout = () => {
    setUser(null);
    removeUser();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
