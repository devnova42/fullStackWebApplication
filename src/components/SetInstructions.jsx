import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import PasswordChecklist from "react-password-checklist";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SetInstructions = () => {
  const instructionSchema = z.object({
    user_instructions: z.string(),
  });

  const [aiMessage, setAIMessage] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(instructionSchema),
    defaultValues: {
      user_instructions: "",
    },
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch(
      "https://teaching-aqeel-backend-sv.vercel.app/set-system-instructions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );
    const jsonData = await response.json();
    reset();

    if (!jsonData.success) {
      toast.error(jsonData.message);
    } else {
      toast.success(jsonData.message);
    }
  };

  return (
    <>
      <section className="min-h-screen flex items-center  justify-center">
        <div className="w-3xl">
          <p className="text-2xl font-semibold text-center">
            Configure your bot
          </p>
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="mt-6 flex flex-col justify-center"
            action=""
          >
            <input
              className="border border-neutral-100 rounded-full px-4 py-4 text-lg w-full"
              type="text"
              placeholder="Set instructions"
              {...register("user_instructions")}
            />
            <button
              type="submit"
              className="w-fit mx-auto bg-white text-black px-5 py-2 rounded-full text-lg cursor-pointer hover:bg-white/80 transition-all duration-300 ease-in-out mt-4"
            >
              {isSubmitting ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SetInstructions;
