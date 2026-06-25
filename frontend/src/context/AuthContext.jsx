import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getProfile } from "../api/apiCall";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] =
    useState(!!token);

  const fetchProfile = async () => {
    if (!localStorage.getItem("token")) return;
    try {
      const res = await getProfile();
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching profile", error);
      logout();
    }
  };

  const login = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const storedToken =
      localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchProfile();
    } else {
      setUser(null);
    }
  }, [isAuthenticated, token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);