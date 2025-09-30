"use client";

import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type FormValues = {
  firstName: string;
  lastName: string;
  dob: string;
  country: string;
  nationality: string;
  address: string;
  city: string;
  postalCode: string;
};

export default function PersonalDetailsPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "Peter",
      lastName: "Ezezobor",
      dob: "1996-08-03",
      country: "Nigeria",
      nationality: "Nigerian",
      address: "30 Agbons Street",
      city: "Benin City",
      postalCode: "300104",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Updated Data:", data);
    alert("Details updated ✅");
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white font-poppins ">
        {/* Header */}
        <div className="flex items-center bg-teal-900 text-white px-4 py-3">
          <div onClick={() => router.back()}>
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
            <input
              {...register("firstName", { required: "First name is required" })}
              className="w-full border-b p-2 outline-none text-gray-800"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          {/* Last Name */}
          <div>
            <label className="block text-sm text-gray-500">Last Name</label>
            <input
              {...register("lastName", { required: "Last name is required" })}
              className="w-full border-b p-2 outline-none text-gray-800"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm text-gray-500">Date of Birth</label>
            <input
              type="date"
              {...register("dob", { required: "Date of birth is required" })}
              className="w-full border-b p-2 outline-none text-gray-800"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm">{errors.dob.message}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm text-gray-500">Country</label>
            <input
              {...register("country", { required: "Country is required" })}
              className="w-full border-b p-2 outline-none text-gray-800"
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>

          {/* Nationality */}
          <div>
            <label className="block text-sm text-gray-500">Nationality</label>
            <input
              {...register("nationality", {
                required: "Nationality is required",
              })}
              className="w-full border-b p-2 outline-none text-gray-800"
            />
            {errors.nationality && (
              <p className="text-red-500 text-sm">
                {errors.nationality.message}
              </p>
            )}
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-sm text-gray-500">
              Street Address
            </label>
            <input
              {...register("address", {
                required: "Street Address is required",
              })}
              className="w-full border-b p-2 outline-none text-gray-800"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm text-gray-500">City</label>
            <input
              {...register("city", { required: "City is required" })}
              className="w-full border-b p-2 outline-none text-gray-800"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-sm text-gray-500">Postal Code</label>
            <input
              {...register("postalCode", {
                required: "Postal code is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Postal code must be numbers only",
                },
              })}
              className="w-full border-b p-2 outline-none text-gray-800"
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm">
                {errors.postalCode.message}
              </p>
            )}
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full bg-teal-900 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
}
