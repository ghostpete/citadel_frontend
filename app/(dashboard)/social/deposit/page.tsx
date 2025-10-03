"use client";

import { useDepositStore } from "@/hooks/useDepositStore";
import { BACKEND_URL } from "@/lib/constants";
import { ArrowLeft, Check, Copy, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface Wallet {
  id: number;
  currency: string;
  wallet_address: string;
  qr_code_url: string;
  amount: string; // conversion rate from backend
  is_active: boolean;
}

interface DepositFormData {
  currency: string;
  unit: string; // calculated crypto units
  amount: string; // USD amount (from store, not user input)
  receipt: File | null;
}

const SocialCopyDeposit = () => {
  const router = useRouter();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  // Zustand store for deposit amount
  const storeAmount = useDepositStore((state) => state.amount);

  const { register, handleSubmit, setValue, control, watch, reset } =
    useForm<DepositFormData>({
      defaultValues: {
        currency: "",
        unit: "",
        amount: storeAmount.toString(),
        receipt: null,
      },
    });

  const amount = watch("amount");
  const receipt = watch("receipt");

  useEffect(() => {
    setValue("amount", storeAmount.toString());
  }, [storeAmount, setValue]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchWallets = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/admin-wallets/`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const data = await res.json();
        setWallets(data);
      } catch (err) {
        console.error("Error fetching wallets:", err);
      }
    };
    fetchWallets();
  }, []);

  useEffect(() => {
    if (amount && selectedWallet) {
      const usd = parseFloat(amount);
      const rate = parseFloat(selectedWallet.amount || "0");
      if (rate > 0) {
        const units = usd / rate;
        setValue("unit", units.toFixed(6));
      } else {
        setValue("unit", "");
      }
    } else {
      setValue("unit", "");
    }
  }, [amount, selectedWallet, setValue]);

  const handleCopy = () => {
    if (selectedWallet) {
      navigator.clipboard.writeText(selectedWallet.wallet_address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const onSubmit = async (formData: DepositFormData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const payload = new FormData();
      payload.append("currency", formData.currency);
      payload.append("amount", formData.amount);
      payload.append("unit", formData.unit);
      if (formData.receipt) {
        payload.append("receipt", formData.receipt);
      }

      const res = await fetch(`${BACKEND_URL}/deposits/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: payload,
      });

      if (!res.ok) {
        throw new Error("Deposit failed");
      }

      reset();
      setOpen(false);
      alert("Deposit submitted successfully!");
      router.push("/history");
    } catch (err) {
      console.error("Error submitting deposit:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-poppins">
      {/* Header */}
      <div className="flex items-center bg-teal-900 text-white px-4 py-3">
        <div onClick={() => router.back()} className="cursor-pointer">
          <ArrowLeft className="w-6 h-6 mr-3" />
        </div>
        <h1 className="text-lg font-semibold">Social Deposit</h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 p-6 space-y-6 max-w-lg mx-auto w-full"
      >
        <h2 className="text-xl font-bold">Deposit to Copy Trade</h2>
        <div className="text-gray-700 text-sm">
          Please confirm your deposit by selecting a currency and reviewing the
          converted crypto amount.
        </div>

        {/* Amount in USD (from store, not editable) */}
        <div>
          <label className="block mb-2 text-sm font-medium">Amount (USD)</label>
          <input
            type="number"
            {...register("amount")}
            className="w-full border rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>

        {/* Select Currency */}
        <div>
          <label className="block mb-2 text-sm font-medium">Currency</label>
          <Controller
            control={control}
            name="currency"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  const wallet = wallets.find((w) => w.currency === value);
                  setSelectedWallet(wallet || null);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {wallets.map((wallet) => (
                    <SelectItem key={wallet.id} value={wallet.currency}>
                      {wallet.currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Crypto Units (calculated, disabled) */}
        <div>
          <label className="block mb-2 text-sm font-medium">Crypto Units</label>
          <input
            type="text"
            {...register("unit")}
            className="w-full border rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>

        {/* Button */}
        <button
          type="button"
          disabled={!selectedWallet || !amount}
          onClick={() => setOpen(true)}
          className="w-full py-3 mb-20 bg-teal-900 text-white rounded-lg font-medium disabled:opacity-50"
        >
          {loading ? "Processing..." : "Choose"}
        </button>
      </form>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto overflow-x-hidden">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>
          {selectedWallet && (
            <div className="space-y-4">
              <p className="text-gray-700 text-sm">
                You are about to deposit{" "}
                <span className="font-semibold">${amount}</span> in{" "}
                <span className="font-semibold">{selectedWallet.currency}</span>{" "}
                which equals approximately{" "}
                <span className="font-semibold">
                  {watch("unit")} {selectedWallet.currency}
                </span>
                . Please scan the QR code or copy the wallet address below.
              </p>

              <Image
                src={selectedWallet.qr_code_url}
                alt="QR Code"
                width={150}
                height={150}
                className="mx-auto"
              />
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <input
                  type="text"
                  value={selectedWallet.wallet_address}
                  readOnly
                  className="flex-1 border rounded-md px-3 py-2 bg-gray-100 text-sm truncate"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-2 bg-gray-200 rounded w-full sm:w-auto flex justify-center"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Receipt Upload inside Modal */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Upload Receipt
                </label>
                <Controller
                  control={control}
                  name="receipt"
                  rules={{ required: true }}
                  render={({ field }) => {
                    const { getRootProps, getInputProps } = useDropzone({
                      onDrop: (acceptedFiles) =>
                        field.onChange(acceptedFiles[0]),
                    });
                    return (
                      <div
                        {...getRootProps()}
                        className="w-full border-2 border-dashed rounded-md p-6 text-center cursor-pointer"
                      >
                        <input {...getInputProps()} />
                        {receipt ? (
                          <div>
                            <p className="mb-2">{(receipt as File).name}</p>
                            <Image
                              src={URL.createObjectURL(receipt as File)}
                              alt="Receipt Preview"
                              width={200}
                              height={200}
                              className="mx-auto rounded-md"
                            />
                          </div>
                        ) : (
                          <p className="text-gray-500">
                            <Upload className="inline-block mr-2 w-4 h-4" />
                            Drag & drop or click to upload receipt
                          </p>
                        )}
                      </div>
                    );
                  }}
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                disabled={loading || !receipt}
                className="w-full py-3 bg-teal-900 text-white rounded-lg font-medium disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Confirm Deposit"}
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialCopyDeposit;
