import axios from "axios";
import { setIsAuthenticated, setUserInfo } from "./authUser-slice";
import { toast } from "react-toastify";

export const authUser = (loginDetails) => {
  return async (dispatch) => {
    const { email, password } = loginDetails;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        { email, password },
        config
      );

      dispatch(setIsAuthenticated(true));

      localStorage.setItem("firstLogin", true);

      toast.success("Login successful!", {
        position: "bottom-right",
        style: { backgroundColor: "black", color: "white" },
      });

      return { success: true, message: data.message }; // Indicate success
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || err.message, {
        position: "top-right",
        style: { backgroundColor: "black", color: "white" },
      });

      return { success: false, error: err.message }; // Indicate failure
    }
  };
};

export const fetchAuthUser = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/user",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(
        setUserInfo({
          user: response.data,
          isAdmin: response.data.role === 1 ? true : false,
        })
      );

      dispatch(setIsAuthenticated(true));
    } catch (err) {
      console.log(err);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.get("http://localhost:3001/api/v1/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      window.location.href = "/";
    }
  };
};
