import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../features/userRegister/userRegister-actions";
import { toast } from "react-toastify";

const SignUp = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoading, error, successMessage } = useSelector(
    (state) => state.userRegister
  );

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    dispatch(registerUser(data));
    reset();
  };
  
  return (
    <>
      <div className="flex justify-center items-center my-20 h-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border px-6 py-4 rounded-lg shadow-2xl w-3/4 sm:max-w-screen-sm space-y-5 md:max-w-prose lg:max-w-prose"
        >
          <h1 className="text-2xl mb-4 font-semibold">Sign Up</h1>

          <div className="grid grid-cols-2 space-x-2">
            <div className="flex flex-col space-y-3">
              <input
                type="text"
                name="username"
                className="firstName border border-slate-400 rounded-sm w-full py-2 px-2 placeholder:text-sm md:placeholder:text-base focus:shadow-lg focus:outline-slate-400"
                placeholder="User Name"
                {...register("username", { required: true })}
              />
              {errors.firstName?.type === "required" && (
                <p className="text-red-500 text-sm">User Name is required.</p>
              )}
            </div>
            {/* <div className="flex flex-col space-y-3">
              <input
                type="text"
                name="lastName"
                className="lastName border border-slate-400 rounded-sm w-full py-2 px-2 placeholder:text-sm md:placeholder:text-base focus:shadow-lg focus:outline-slate-400"
                placeholder="Last Name"
                {...register("lastName", { required: true })}
              />
              {errors.lastName?.type === "required" && (
                <p className="text-red-500 text-sm">Last Name is required.</p>
              )}
            </div> */}
          </div>

          <div className="space-y-6">
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                name="email"
                className="email border border-slate-400 block rounded-sm w-full py-2 px-2 placeholder:text-sm md:placeholder:text-base focus:shadow-lg focus:outline-slate-400"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 text-sm">Email is required.</p>
              )}
            </div>

            <div className="flex flex-col space-y-3">
              <input
                type="text"
                name="city"
                className="city border border-slate-400 block rounded-sm w-full py-2 px-2 placeholder:text-sm md:placeholder:text-base focus:shadow-lg focus:outline-slate-400"
                placeholder="City"
                {...register("city", { required: true })}
              />
              {errors.city?.type === "required" && (
                <p className="text-red-500 text-sm">City is required.</p>
              )}
            </div>

            <div className="flex flex-col space-y-3">
              <input
                type="password"
                name="password"
                className="password border border-slate-400 block rounded-sm w-full py-2 px-2 placeholder:text-sm md:placeholder:text-base focus:shadow-lg focus:outline-slate-400"
                placeholder="Password"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm">Password is required.</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-sm">
                  Password must be at least 6 characters.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="newsletter" className="" />
            <label htmlFor="newsletter" className="text-xs mx-2">
              Sign Up for newsletter
            </label>
          </div>

          <button
            type="submit"
            className="signup bg-[#2C2C2C] text-white my-4 rounded-sm text-sm md:text-base py-2 w-full shadow-lg hover:bg-black"
          >
            SIGN UP
          </button>

          <div className="text-xs flex justify-center">
            <p className="forgot">
              Already have an account?
              <Link
                to="/login"
                className="signup uppercase underline underline-offset-1 hover:text-red-500 hover:tracking-wide"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
