// useAuth.js
import { useEffect, useState } from "react";
import axios from "axios";

export const useAuth = (navigate) => {
  const storedEmail = localStorage.getItem("email");
  const storedPassword = localStorage.getItem("password");

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!(storedEmail && storedPassword)
  );
  const [loading, setLoading] = useState(!(storedEmail && storedPassword));

  useEffect(() => {
    setLoading(true);

    console.log(storedEmail, storedPassword);
    if (storedEmail && storedPassword) {
      const loginUser = async () => {
        try {
          const response = await axios.post(
            "http://localhost:1337/api/users/login",
            {
              email: storedEmail,
              password: storedPassword,
            }
          );
          if (response.data.message) {
            console.log("Login successful");

            setIsLoggedIn(true);
            navigate('/');
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      loginUser();
    } else {
      setLoading(false);
    }
  }, [storedEmail, storedPassword, navigate]);

  return { isLoggedIn, loading };
};
