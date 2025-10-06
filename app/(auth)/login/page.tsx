"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import { BACKEND_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const newData = { email: data.email, password: data.password };

    try {
      setLoading(true);

      const response = await fetch(`${BACKEND_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      const result = await response.json();

      if (!response.ok) {
        const backendError =
          result?.error || "Something went wrong. Please try again.";

        toast("Error", {
          description: backendError,
        });
        return;
      }

      console.log("Login success:", result);

      // Save token
      localStorage.setItem("authToken", result.token);

      toast("Success", {
        description: "✅ Login successful",
      });
      router.push("/portfolio");
    } catch (error) {
      console.error(error);
      toast("Network Error", {
        description: "⚠️ Network error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundImage: "url(/bg_auth.png)" }}
      className="font-poppins min-h-screen bg-center bg-cover"
    >
      <div className="flex items-center bg-teal-900 text-white px-4 py-3">
        <div onClick={() => router.push("/")}>
          <ArrowLeft className="w-6 h-6 mr-3" />
        </div>
        <h1 className="text-lg font-semibold">Login</h1>
      </div>

      <Link href="/" className="flex items-center flex-col space-x-2">
        <Image
          src="/images/logo.png"
          alt="CitadelMarketPro"
          className="w-20 h-20 md:w-30 md:h-30"
          width={100}
          height={100}
        />
      </Link>

      <div className="flex flex-col bg-white md:border p-5 md:rounded-xl max-w-full md:max-w-xl mx-auto h-screen md:h-fit md:mt-10 w-full">
        {/* Header */}
        <div className="px-4 py-3">
          <h2 className="text-3xl font-bold text-teal-900">Login</h2>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 px-4 py-6 space-y-6 max-w-[1000px]"
        >
          {/* Email */}
          <div>
            <label className="block text-gray-500">Email: </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className="w-full border-b p-2 outline-none text-gray-800"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-500">Password: </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full border-b p-2 outline-none text-gray-800 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 md:w-7 md:h-7" />
                ) : (
                  <Eye className="w-5 h-5 md:w-7 md:h-7" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            {/* <Link
              className="text-teal-900 inline-block hover:underline mb-1"
              href={"/"}
            >
              Forget Password
            </Link> */}
            <Link className="text-teal-900 inline-block" href={"/register"}>
              Don&apos;t have an account{" "}
              <span className="underline hover:text-teal-800">Sign Up</span>
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-900 text-white py-3 rounded-lg font-medium hover:bg-teal-800 transition flex justify-center items-center"
          >
            {!loading ? (
              <span>Login</span>
            ) : (
              <PulseLoader color="#fff" size={15} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
