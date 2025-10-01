"use client";

import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { BACKEND_URL } from "@/lib/constants";
import { Input } from "@/components/ui/input";

type FormValues = {
  firstName: string;
  lastName: string;
  dob: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
};

export default function PersonalDetailsPage() {
  const router = useRouter();
  const { user } = useUserProfile();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      country: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("No authentication token found");
      setLoading(false);
      window.location.href = "/login";
      return;
    }
    try {
      const res = await fetch(`${BACKEND_URL}/profile/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          dob: data.dob,
          address: data.address,
          postal_code: data.postalCode,
          country: data.country,
          city: data.city,
        }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const result = await res.json();
      alert(result.message || "Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setValue("firstName", user.first_name || "");
      setValue("lastName", user.last_name || "");
      setValue("country", user.country || "");
      setValue("city", user.city || "");
      setValue("dob", user.dob || "");
      setValue("address", user.address || "");
      setValue("postalCode", user.postal_code || "");
    }
  }, [user, setValue]);

  return (
    <div className="flex flex-col min-h-screen bg-white font-poppins">
      {/* Header */}
      <div className="flex items-center bg-teal-900 text-white px-4 py-3">
        <div onClick={() => router.back()} className="cursor-pointer">
          <ArrowLeft className="w-6 h-6 mr-3" />
        </div>
        <h1 className="text-lg font-semibold">Personal Details</h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 px-4 py-6 space-y-6 max-w-[1000px]"
      >
        {/* First Name */}
        <div>
          <label className="block text-sm text-gray-500">First Name</label>
          <Input
            {...register("firstName", { required: "First name is required" })}
            className="w-full border-b text-gray-800  rounded-none border-t-0 shadow-none border-x-0"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm text-gray-500">Last Name</label>
          <Input
            {...register("lastName", { required: "Last name is required" })}
            className="w-full border-b text-gray-800  rounded-none border-t-0 shadow-none border-x-0"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm text-gray-500">Date of Birth</label>
          <Input
            type="date"
            {...register("dob", { required: "Date of birth is required" })}
            className="w-full border-b text-gray-800  rounded-none border-t-0 shadow-none border-x-0"
          />
          {errors.dob && (
            <p className="text-red-500 text-sm">{errors.dob.message}</p>
          )}
        </div>

        {/* Street Address */}
        <div>
          <label className="block text-sm text-gray-500">Street Address</label>
          <Input
            {...register("address", { required: "Street Address is required" })}
            className="w-full border-b text-gray-800 rounded-none border-t-0 shadow-none border-x-0"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        {/* Postal Code */}
        <div>
          <label className="block text-sm text-gray-500">Postal Code</label>
          <Input
            {...register("postalCode", {
              required: "Postal code is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Postal code must be numbers only",
              },
            })}
            className="w-full border-b text-gray-800 rounded-none border-t-0 shadow-none border-x-0"
          />
          {errors.postalCode && (
            <p className="text-red-500 text-sm">{errors.postalCode.message}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm text-gray-500">Country</label>
          <Input
            disabled
            {...register("country", { required: "Country is required" })}
            className="w-full border-b text-gray-800 bg-gray-100 rounded-none"
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm text-gray-500">City</label>
          <Input
            disabled
            {...register("city", { required: "City is required" })}
            className="w-full border-b text-gray-800 bg-gray-100 rounded-none"
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="w-full mb-25 lg:mb-10 bg-teal-900 text-white py-3 rounded-lg font-medium hover:bg-teal-800 transition"
        >
          {!loading ? (
            <span>Update</span>
          ) : (
            <PulseLoader color="#fff" size={15} />
          )}
        </button>
      </form>
    </div>
  );
}
