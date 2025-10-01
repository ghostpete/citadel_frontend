"use client";

import { useUserProfile } from "@/hooks/useUserProfile";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BACKEND_URL } from "@/lib/constants";

type WithdrawalForm = {
  asset: "balance" | "equity" | "user_funds" | "free_margin";
  amount: number;
};

const assetLabels: Record<string, string> = {
  balance: "Balance",
  equity: "Equity",
  user_funds: "User Funds",
  free_margin: "Free Margin",
};

const WithdrawalPage = () => {
  const router = useRouter();
  const { user } = useUserProfile();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    setError,
  } = useForm<WithdrawalForm>({
    defaultValues: {
      asset: "balance",
      amount: 0,
    },
  });

  const selectedAsset = watch("asset");

  const onSubmit = async (data: WithdrawalForm) => {
    const availableBalance = user?.[data.asset] ?? 0;

    if (data.amount > availableBalance) {
      setError("amount", {
        type: "manual",
        message: "Insufficient funds in selected asset",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/withdrawal/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Withdrawal failed");
      }

      alert("Withdrawal request submitted successfully!");
      router.push("/history");
    } catch (err: any) {
      console.error(err);
      alert("Something went wrong");
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
        <h1 className="text-lg font-semibold">Withdrawal</h1>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center md:p-6">
        <Card className="w-full max-w-md shadow-none md:shadow-lg rounded-2xl mb-10 border-0 md:border">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold text-gray-800">
              Withdraw Funds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Asset Selection */}
              <div className="space-y-2">
                <Label>Select Asset</Label>
                <Select
                  defaultValue="balance"
                  onValueChange={(value) =>
                    setValue("asset", value as WithdrawalForm["asset"])
                  }
                >
                  <SelectTrigger className="w-full rounded-none py-6">
                    <SelectValue placeholder="Select asset" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="balance">
                      Balance ${user?.balance ?? 0}
                    </SelectItem>
                    <SelectItem value="equity">
                      Equity ${user?.equity ?? 0}
                    </SelectItem>
                    <SelectItem value="user_funds">
                      User Funds ${user?.user_funds ?? 0}
                    </SelectItem>
                    <SelectItem value="free_margin">
                      Free Margin ${user?.free_margin ?? 0}
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.asset && (
                  <p className="text-red-500 text-sm">{errors.asset.message}</p>
                )}
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter amount"
                  {...register("amount", {
                    required: "Amount is required",
                    min: { value: 1, message: "Amount must be greater than 0" },
                  })}
                  className="w-full rounded-none py-6"
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm">
                    {errors.amount.message}
                  </p>
                )}
                {selectedAsset && (
                  <p className="text-xs text-gray-500">
                    Available {assetLabels[selectedAsset]}:{" "}
                    {user?.[selectedAsset] ?? 0}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-900 hover:bg-teal-800 rounded-none py-3"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Submit Withdrawal"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WithdrawalPage;
