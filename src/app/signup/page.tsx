"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm, useFormState, SubmitHandler } from "react-hook-form";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
import axios from "axios";

type FormValues = {
  email: string;
  password: string;
  username: string;
};

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSafeToReset, setIsSafeToReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<any>(null);

  const defaultValues = {
    email: "",
    password: "",
    username: "",
  };
  const { handleSubmit, register, reset, control } = useForm<FormValues>({
    defaultValues,
  });
  const { errors } = useFormState({ control });

  // clear form on submission
  useEffect(() => {
    if (isSafeToReset) {
      reset(defaultValues);
      setLoginError(null);
      setIsSafeToReset(false);
    }
    // eslint-disable-next-line
  }, [isSafeToReset, defaultValues]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsLoading(true);
      setLoginError(null);

      const response = await axios.post("/api/users/signup", data);

      if (response.data.status >= 400) {
        return setLoginError(response.data);
      }

      // Redirect to nextauth signin...
      router.push("/login");
      toast.success(`Success! You can now login.`);
    } catch (error: any) {
      console.error(error);
      toast.error(`Oops! \n ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container mt-5 mb-10">
      <h1 className="text-center text-2xl mb-5">Signup</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md flex flex-col gap-5 mx-auto"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="username"
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "Username must be 5 or more characters long.",
              },
              maxLength: { value: 20, message: "Max length: 20" },
              onChange: () => setLoginError(null),
            })}
            className="p-2"
          />
          {errors.username && (
            <span className="italic text-sm text-red-500 ml-3">
              {errors.username.message}
            </span>
          )}
          {loginError && loginError.type === "username" && (
            <span className="italic text-sm text-red-500 ml-3">
              {loginError.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required.",
              onChange: () => setLoginError(null),
            })}
            className="p-2"
          />
          {errors.email && (
            <span className="italic text-sm text-red-500 ml-3">
              {errors.email.message}
            </span>
          )}
          {loginError && loginError.type === "email" && (
            <span className="italic text-sm text-red-500 ml-3">
              {loginError.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be 6 or more charcters long.",
                },
              })}
              className="p-2 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <BsFillEyeSlashFill size={20} />
              ) : (
                <BsFillEyeFill size={20} />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="italic text-sm text-red-500 ml-3">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className={`flex-1 bg-sky-800 rounded-sm py-2 px-1 ${
              isLoading && "grayscale cursor-not-allowed"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Signup"}
          </button>
          <button
            type="button"
            onClick={() => setIsSafeToReset(true)}
            className={`border-b-2 border-b-orange-400 text-sm ${
              isLoading && "grayscale cursor-not-allowed"
            }`}
            disabled={isLoading}
          >
            Clear Form
          </button>
        </div>
      </form>
    </section>
  );
}
