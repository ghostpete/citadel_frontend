"use client";

import { BACKEND_URL } from "@/lib/constants";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dropzone from "react-dropzone";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AccountVerification = () => {
  const router = useRouter();
  const [idType, setIdType] = useState("");
  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idType || !idFront || !idBack) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("id_type", idType);
    formData.append("id_front", idFront);
    formData.append("id_back", idBack);

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      const res = await fetch(`${BACKEND_URL}/kyc/upload/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("KYC uploaded successfully!");
        console.log(data);
      } else {
        alert(data.error || "Upload failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white font-poppins">
      {/* Header */}
      <div className="flex items-center bg-teal-900 text-white px-4 py-3">
        <div onClick={() => router.back()} className="cursor-pointer">
          <ArrowLeft className="w-6 h-6 mr-3" />
        </div>
        <h1 className="text-lg font-semibold">Verify your Account</h1>
      </div>

      {/* Intro Section */}
      <div className="p-6 max-w-xl mx-auto text-gray-700">
        <h2 className="text-xl font-semibold mb-2">Why Verification Matters</h2>
        <p className="text-sm leading-relaxed">
          To keep your account secure and to comply with international
          regulations, we require all users to complete a simple Know Your
          Customer (KYC) process. By uploading a valid government-issued ID, you
          help us protect your identity, prevent fraud, and ensure safe access
          to financial services.
          <br />
          <span className="font-medium">
            This process only takes a few minutes and guarantees that your
            account remains fully active.
          </span>
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-6 max-w-xl mx-auto w-full"
      >
        {/* ID Type */}
        <div>
          <label className="block text-sm font-medium mb-2">ID Type</label>
          <Select value={idType} onValueChange={(val) => setIdType(val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select ID Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="passport">Passport</SelectItem>
              <SelectItem value="drivers_license">
                Driver&apos;s License
              </SelectItem>
              <SelectItem value="national_id">National ID</SelectItem>
              <SelectItem value="voter_card">Voter&apos;s Card</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ID Front Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Front of ID</label>
          <Dropzone onDrop={(files) => setIdFront(files[0])}>
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-teal-500 transition"
              >
                <input {...getInputProps()} />
                {idFront ? (
                  <Image
                    src={URL.createObjectURL(idFront)}
                    alt="ID Front Preview"
                    width={300}
                    height={200}
                    className="max-h-48 object-cover rounded-lg"
                    unoptimized
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <Upload className="w-10 h-10 mb-2" />
                    <p>Drop front image here or click to upload</p>
                  </div>
                )}
              </div>
            )}
          </Dropzone>
        </div>

        {/* ID Back Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Back of ID</label>
          <Dropzone onDrop={(files) => setIdBack(files[0])}>
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-teal-500 transition"
              >
                <input {...getInputProps()} />
                {idBack ? (
                  <Image
                    src={URL.createObjectURL(idBack)}
                    alt="ID Back Preview"
                    width={300}
                    height={200}
                    className="max-h-48 object-cover rounded-lg"
                    unoptimized
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <Upload className="w-10 h-10 mb-2" />
                    <p>Drop back image here or click to upload</p>
                  </div>
                )}
              </div>
            )}
          </Dropzone>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-teal-900 text-white py-2 px-4 rounded-lg hover:bg-teal-800 transition disabled:opacity-50 disabled:cursor-not-allowed mb-20"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Uploading...
            </>
          ) : (
            "Submit Verification"
          )}
        </button>
      </form>
    </div>
  );
};

export default AccountVerification;
