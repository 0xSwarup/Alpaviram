import axios from "axios";
import {
  userRegisterFail,
  userRegisterRequest,
  userRegisterSuccess,
} from "./userRegister-slice";
import { toast } from "react-toastify";

export const registerUser = (registrationDetails) => {
  return async (dispatch) => {
    const { username, city, email, password } = registrationDetails;

    try {
      dispatch(userRegisterRequest());

      // Request body configurations
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Data from response (response from backend)
      const { data } = await axios.post(
        "http://localhost:3001/api/v1/user/register",
        { username, city, email, password },
        config
      );

      toast.success("Registration Successful!", {
        position: "bottom-right",
        style: { backgroundColor: "black", color: "white" },
      });

      dispatch(userRegisterSuccess(data.message));
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message, {
        position: "top-right",
        style: { backgroundColor: "black", color: "white" },
      });

      dispatch(userRegisterFail(err?.response?.data?.message || err.message));
    }
  };
};
