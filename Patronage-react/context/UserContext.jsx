import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [userFound, setUserFound] = useState(null);

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/usersFind"); // Replace with your API endpoint
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        users,
        setUsers,
        userFound,
        setUserFound,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
