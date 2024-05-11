import { useEffect, useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const storedEmail = localStorage.getItem("email");
  const storedPassword = localStorage.getItem("password");

  const [isLoggedIn, setIsLoggedIn] = useState(!!(storedEmail && storedPassword));
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loginUser = async () => {
      setLoading(true);
      try {
        if (storedEmail && storedPassword) {
          const response = await axios.post(
            "http://localhost:1337/api/users/login",
            {
              email: storedEmail,
              password: storedPassword,
              
            }
          );
          if (response.data.message) {
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loginUser();
  }, [storedEmail, storedPassword]);

  return { isLoggedIn, loading };
};
