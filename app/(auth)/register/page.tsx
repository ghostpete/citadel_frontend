"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import { BACKEND_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country?: string;
  region?: string;
  city?: string;
  currency?: string;
};

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [locationData, setLocationData] = useState<{
    country?: string;
    region?: string;
    city?: string;
    currency?: string;
  }>({});

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
      region: "",
      city: "",
      currency: "",
    },
  });

  // ✅ Detect country, region, city, and currency on mount
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.country_name) {
          const loc = {
            country: data.country_name,
            region: data.region,
            city: data.city,
            currency: data.currency,
          };
          setLocationData(loc);

          // auto-fill form values
          setValue("country", loc.country || "");
          setValue("region", loc.region || "");
          setValue("city", loc.city || "");
          setValue("currency", loc.currency || "");
        }
      } catch (error) {
        console.error("Failed to detect location:", error);
      }
    };

    fetchLocation();
  }, [setValue]);

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      const response = await fetch(`${BACKEND_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          first_name: data.firstName,
          last_name: data.lastName,
          country: data.country || locationData.country,
          region: data.region || locationData.region,
          city: data.city || locationData.city,
          currency: data.currency || locationData.currency,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (Array.isArray(result.error)) {
          alert(result.error.join("\n"));
        } else {
          alert(result.error || "Registration failed ❌");
        }
        return;
      }

      alert(result.message || "Registration successful ✅");
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Something went wrong, please try again ❌");
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
        <Link href="/menu">
          <ArrowLeft className="w-6 h-6 mr-3" />
        </Link>
        <h1 className="text-lg font-semibold">Sign Up</h1>
      </div>

      <div className="flex flex-col bg-white border p-5 md:rounded-xl max-w-full md:max-w-xl mx-auto h-screen md:h-fit md:mb-10 md:mt-10 w-full">
        <div className="px-4 py-3">
          <h2 className="text-3xl font-bold text-teal-900">Sign Up</h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 px-4 py-6 space-y-6 max-w-[1000px]"
        >
          {/* First Name */}
          <div>
            <label className="block text-gray-500">First Name: </label>
            <input
              type="text"
              {...register("firstName", { required: "First Name is required" })}
              className="w-full border-b p-2 outline-none text-gray-800"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-500">Last Name: </label>
            <input
              type="text"
              {...register("lastName", { required: "Last Name is required" })}
              className="w-full border-b p-2 outline-none text-gray-800"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

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

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-500">Confirm Password: </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="w-full border-b p-2 outline-none text-gray-800 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5 md:w-7 md:h-7" />
                ) : (
                  <Eye className="w-5 h-5 md:w-7 md:h-7" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Country (Auto-filled) */}
          <div>
            <label className="block text-gray-500">Country: </label>
            <input
              type="text"
              {...register("country")}
              value={locationData.country || ""}
              readOnly
              className="w-full border-b p-2 outline-none text-gray-500 bg-gray-100"
            />
          </div>

          {/* Region */}
          <div>
            <label className="block text-gray-500">Region: </label>
            <input
              type="text"
              {...register("region")}
              value={locationData.region || ""}
              readOnly
              className="w-full border-b p-2 outline-none text-gray-500 bg-gray-100"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-500">City: </label>
            <input
              type="text"
              {...register("city")}
              value={locationData.city || ""}
              readOnly
              className="w-full border-b p-2 outline-none text-gray-500 bg-gray-100"
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block text-gray-500">Currency: </label>
            <input
              type="text"
              {...register("currency")}
              value={locationData.currency || ""}
              readOnly
              className="w-full border-b p-2 outline-none text-gray-500 bg-gray-100"
            />
          </div>

          <div className="flex flex-col">
            <Link className="text-teal-900 inline-block" href={"/login"}>
              Already have an account?{" "}
              <span className="underline hover:text-teal-800">Login</span>
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-900 text-white py-3 rounded-lg font-medium hover:bg-teal-800 transition flex justify-center items-center"
          >
            {!loading ? (
              <span>Sign Up</span>
            ) : (
              <PulseLoader color="#fff" size={15} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
