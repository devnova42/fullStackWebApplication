import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEyeSlash } from "react-icons/fa";
import { z } from "zod";
import { FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";

const Login = () => {
  const navigate = useNavigate();
  const loginSchema = z.object({
    email: z.string().min(3),
    password: z.string().min(6),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //   const password = watch("password");
  // const [isPasswordVisile, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = async (data) => {
    const response = await fetch(
      "https://teaching-aqeel-backend-sv.vercel.app/login",
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const jsonData = await response.json();
    localStorage.setItem("token", jsonData.data.token);
    reset();
    if (!jsonData.success) {
      toast.error(jsonData.message);
    } else {
      toast.success(jsonData.message);
    }
    navigate("/");
  };

  return (
    <>
      <section className="min-h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="bg-white w-4xl p-5 rounded-md text-black"
        >
          <h2 className="text-3xl font-medium text-center">
            Create Your Account
          </h2>
          <div className="mt-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-lg" htmlFor="name">
                Name:
              </label>
              <input
                className="outline-none border border-neutral-300 px-3 py-2 rounded-sm text-lg"
                type="text"
                placeholder="Enter your name:"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-lg" htmlFor="name">
                Email:
              </label>
              <input
                className="outline-none border border-neutral-300 px-3 py-2 rounded-sm text-lg"
                type="text"
                placeholder="Enter your email:"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-lg" htmlFor="password">
                Password:
              </label>
              <div className="w-full flex border border-neutral-300 px-3 py-2 items-center gap-2">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="outline-none w-full px-3 py-2 rounded-sm text-lg"
                  type="text"
                  placeholder="Enter your password:"
                  {...register("password")}
                />
                {!isPasswordVisible ? (
                  <FaRegEye
                    className="text-blue-500 cursor-pointer"
                    size={20}
                    onClick={() => setIsPasswordVisible(true)}
                  />
                ) : (
                  <FaEyeSlash
                    className="text-blue-500 cursor-pointer"
                    size={20}
                    onClick={() => setIsPasswordVisible(false)}
                  />
                )}
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                
              </div>
            </div>
            <div>
              <button
                className="bg-blue-400 text-white w-full text-center rounded-md py-3 text-lg font-semibold cursor-pointer hover:bg-blue-500 transition-all duration-300 ease-in-out"
                type="submit"
              >
                {isSubmitting ? "Loading...." : "sumbit"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
