"use client";

import {
  ArrowLeft,
  CreditCard,
  Banknote,
  Wallet,
  DollarSign,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BACKEND_URL } from "@/lib/constants";

// Define payment structure
interface Payment {
  id?: number;
  method_type: string;
  address?: string;
  bank_name?: string;
  bank_account_number?: string;
  cashapp_id?: string;
  paypal_email?: string;
  wallet_type?: string;
}

// Dynamic form data object
type PaymentFormData = Partial<Payment>;

const Payments = () => {
  const router = useRouter();
  const [method, setMethod] = useState<string>("");
  const [formData, setFormData] = useState<PaymentFormData>({});
  const [loading, setLoading] = useState(false);
  const [userPayments, setUserPayments] = useState<Payment[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(true);

  // Fetch user’s saved payments
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/payments/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch payments (${res.status})`);
        }

        const data = await res.json();

        // normalize data into an array
        let payments: Payment[] = [];
        if (Array.isArray(data)) {
          payments = data as Payment[];
        } else if (data && Array.isArray(data.payments)) {
          payments = data.payments as Payment[];
        }

        setUserPayments(payments);
      } catch (err) {
        console.error("Error fetching payments:", err);
        setUserPayments([]);
      } finally {
        setLoadingPayments(false);
      }
    };

    fetchPayments();
  }, []);

  const handleChange = (field: keyof PaymentFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!method) {
      alert("Please select a payment method");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/payments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          method_type:
            method === "wallet"
              ? formData.wallet_type || "BTC"
              : method.toUpperCase(),
          ...formData,
        }),
      });

      if (!res.ok) throw new Error("Failed to save payment info");

      const refreshed: Payment = await res.json();
      setUserPayments((prev) => [...prev, refreshed]);
      setMethod("");
      setFormData({});
      alert("Payment info saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving payment info");
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (method) {
      case "wallet":
        return (
          <div className="space-y-4">
            <Label>Wallet Address</Label>
            <Input
              className="py-3 rounded-none"
              placeholder="Enter your crypto wallet address"
              onChange={(e) => handleChange("address", e.target.value)}
            />
            <Label>Wallet Type</Label>
            <Select
              onValueChange={(val) => handleChange("wallet_type", val)}
              defaultValue="BTC"
            >
              <SelectTrigger className="w-full py-3 rounded-none">
                <SelectValue placeholder="Choose wallet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BTC">Bitcoin</SelectItem>
                <SelectItem value="ETH">Ethereum</SelectItem>
                <SelectItem value="SOL">Solana</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case "bank":
        return (
          <div className="space-y-4">
            <Label>Bank Name</Label>
            <Input
              className="py-3 rounded-none"
              placeholder="Enter your bank name"
              onChange={(e) => handleChange("bank_name", e.target.value)}
            />
            <Label>Account Number</Label>
            <Input
              className="py-3 rounded-none"
              placeholder="Enter your account number"
              onChange={(e) =>
                handleChange("bank_account_number", e.target.value)
              }
            />
          </div>
        );
      case "cashapp":
        return (
          <div className="space-y-4">
            <Label>Cash App ID</Label>
            <Input
              className="py-3 rounded-none"
              placeholder="$YourCashAppID"
              onChange={(e) => handleChange("cashapp_id", e.target.value)}
            />
          </div>
        );
      case "paypal":
        return (
          <div className="space-y-4">
            <Label>PayPal Email</Label>
            <Input
              className="py-3 rounded-none"
              type="email"
              placeholder="Enter your PayPal email"
              onChange={(e) => handleChange("paypal_email", e.target.value)}
            />
          </div>
        );
      default:
        return <p className="text-gray-500">Select a payment method</p>;
    }
  };

  const renderIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "wallet":
      case "btc":
      case "eth":
      case "sol":
        return <Wallet className="w-5 h-5 text-teal-700" />;
      case "bank":
        return <Banknote className="w-5 h-5 text-teal-700" />;
      case "cashapp":
        return <CreditCard className="w-5 h-5 text-teal-700" />;
      case "paypal":
        return <DollarSign className="w-5 h-5 text-teal-700" />;
      default:
        return <CreditCard className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-poppins">
      {/* Header */}
      <div className="flex items-center bg-teal-900 text-white px-4 py-3">
        <div onClick={() => router.back()} className="cursor-pointer">
          <ArrowLeft className="w-6 h-6 mr-3" />
        </div>
        <h1 className="text-lg font-semibold">Payment Methods</h1>
      </div>

      {/* Current Saved Payments */}
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-3">
          Your Preferred Payment Methods
        </h2>
        {loadingPayments ? (
          <p className="text-gray-500">Loading...</p>
        ) : userPayments.length === 0 ? (
          <p className="text-gray-500">No saved payment methods</p>
        ) : (
          <div className="grid gap-3">
            {userPayments.map((p, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border rounded-xl p-3 shadow-sm bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex items-center space-x-3">
                  {renderIcon(p.method_type)}
                  <div>
                    <p className="font-medium capitalize">
                      {p.method_type.replace("_", " ")}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {p.address ||
                        p.bank_name ||
                        p.bank_account_number ||
                        p.cashapp_id ||
                        p.paypal_email}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-4 mb-20">
        <Card className="w-full max-w-md shadow-lg rounded-2xl border">
          <CardHeader>
            <CardTitle className="text-center">Update Payment Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Select Payment Method</Label>
              <Select onValueChange={(value) => setMethod(value)}>
                <SelectTrigger className="w-full mt-2 py-3 rounded-none">
                  <SelectValue placeholder="Choose a method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wallet">
                    Crypto Wallet (BTC, ETH, SOL)
                  </SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="cashapp">Cash App</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {renderForm()}

            <Button
              className="w-full bg-teal-900 hover:bg-teal-800 py-3 rounded-none"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Payment Info"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payments;
