"use client";

import { ArrowLeft, Inbox } from "lucide-react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BACKEND_URL as BACKEND_URL_API } from "@/lib/constants";

const BACKEND_URL = BACKEND_URL_API || "http://localhost:8000";

// Transaction type
interface Transaction {
  id: number;
  reference: string;
  transaction_type: string;
  amount: number;
  status: "successful" | "pending" | "failed" | string;
  created_at: string;
}

// fetcher helper
const fetcher = async (
  url: string
): Promise<{ transactions: Transaction[] }> => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("authToken")}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch transactions");
  }
  return res.json();
};

const TransactionHistory = () => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR<{ transactions: Transaction[] }>(
    `${BACKEND_URL}/transactions/`,
    fetcher
  );

  const transactions: Transaction[] = data?.transactions || [];

  const statusColor = (status: string) => {
    switch (status) {
      case "successful":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-poppins">
      {/* Header */}
      <div className="flex items-center bg-teal-900 text-white px-4 py-3 shadow">
        <div onClick={() => router.back()} className="cursor-pointer">
          <ArrowLeft className="w-6 h-6 mr-3" />
        </div>
        <h1 className="text-lg font-semibold">Transaction History</h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 mb-20 max-w-4xl mx-auto w-full">
        {/* Loading */}
        {isLoading && (
          <Card className="p-6 space-y-3">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </Card>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500 text-center mt-10">
            Failed to load transactions
          </p>
        )}

        {/* No transactions */}
        {!isLoading && transactions.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <Inbox className="w-15 h-15 md:w-20 md:h-20 text-gray-300 mx-auto" />
            <h2 className="text-lg font-semibold text-gray-700">
              No Transactions Found
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Your transaction history will appear here once you start trading.
            </p>
          </div>
        )}

        {/* Desktop Table */}
        {transactions.length > 0 && (
          <div className="hidden sm:block">
            <Card>
              <CardHeader>
                <CardTitle>All Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>S/N</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((txn, index) => (
                      <TableRow key={txn.id}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-medium">
                          {txn.reference}
                        </TableCell>
                        <TableCell className="capitalize">
                          {txn.transaction_type}
                        </TableCell>
                        <TableCell>${txn.amount}</TableCell>
                        <TableCell>
                          <Badge
                            className={statusColor(txn.status) + " capitalize"}
                          >
                            {txn.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(txn.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Mobile Cards */}
        {transactions.length > 0 && (
          <div className="space-y-3 sm:hidden mb-20">
            {transactions.map((txn, index) => (
              <Card key={txn.id}>
                <CardContent className="p-4 py-2">
                  <div className="bg-teal-900 text-white w-8 h-8 flex items-center justify-center rounded-full mb-3">
                    {index + 1}
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-semibold capitalize">
                      {txn.transaction_type}
                    </h2>
                    <Badge className={statusColor(txn.status)}>
                      {txn.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Reference: {txn.reference}
                  </p>
                  <p className="font-bold text-sm">
                    Amount: <span className="text-teal-800">${txn.amount}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(txn.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
