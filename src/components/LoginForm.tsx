"use client";

import { useState, useEffect } from "react";
import { useForm, useFormState, SubmitHandler } from "react-hook-form";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

type FormValues = {
  email: string;
  password: string;
  username: string;
};

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSafeToReset, setIsSafeToReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<any>(null);

  const defaultValues = {
    username: "",
    email: "",
    password: "",
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
      signIn("credentials", data);
    } catch (error: any) {
      console.error(error);
      toast.error(`Oops! \n ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container mt-5 mb-10">
      <h1 className="mb-5 text-center">Or sign in with email</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md flex flex-col gap-5 mx-auto"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-xs">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required.",
              onChange: () => setLoginError(null),
            })}
            className="p-1 bg-neutral-100"
          />
          {errors.email && (
            <span className="italic text-sm text-red-500 ml-3">
              {errors.email.message}
            </span>
          )}
          {loginError && loginError.type === "email" && (
            <span className="italic text-red-500 ml-3">
              {loginError.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-xs">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required.",
                onChange: () => setLoginError(null),
              })}
              className="p-1 bg-neutral-100 w-full"
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
            {loginError && loginError.type === "password" && (
              <span className="italic text-red-500 ml-3">
                {loginError.message}
              </span>
            )}
          </div>
          {errors.password && (
            <span className="italic text-sm text-red-500 ml-3">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* <div className="flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="username"
            {...register("username", { required: "Username is required." })}
            className="p-1 bg-neutral-100"
          />
          {errors.username && (
            <span className="italic text-sm text-red-500 ml-3">
              {errors.username.message}
            </span>
          )}
        </div> */}

        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-sky-800 rounded-sm py-2 px-1 disabled:text-neutral-400 disabled:grayscale"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}
