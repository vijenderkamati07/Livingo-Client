import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Try auto-login when page loads
  useEffect(() => {
    fetch("https://livingo-backend.onrender.com/api/auth/me", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data?.isLoggedIn) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
  {children}
</AuthContext.Provider>

  );
}
