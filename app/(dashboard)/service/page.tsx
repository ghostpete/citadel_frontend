"use client";

import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { BACKEND_URL } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";

type TicketFormValues = {
  subject: string;
  category: string;
  description: string;
};

type Ticket = {
  id: number;
  subject: string;
  category: string;
  description: string;
  created_at: string;
};

const ServiceDesk = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TicketFormValues>({
    defaultValues: {
      subject: "",
      category: "",
      description: "",
    },
  });

  // Fetch tickets
  const fetchTickets = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await fetch(`${BACKEND_URL}/tickets/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch tickets");
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.error(err);
      alert("Unable to load tickets.");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Create Ticket
  const onSubmit = async (data: TicketFormValues) => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("No authentication token found");
      setLoading(false);
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/tickets/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create ticket");
      await res.json();
      alert("Ticket created successfully");

      reset();
      fetchTickets();
    } catch (err) {
      console.error(err);
      alert("An error occurred while creating ticket.");
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
        <h1 className="text-lg font-semibold">Service Desk</h1>
      </div>

      {/* Ticket Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 px-4 py-6 space-y-6 max-w-[1000px]"
      >
        {/* Subject */}
        <div>
          <label className="block text-sm text-gray-500">Subject</label>
          <Input
            {...register("subject", { required: "Subject is required" })}
            className="w-full border-b text-gray-800 rounded-none border-t-0 shadow-none border-x-0"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm text-gray-500">Category</label>
          <Input
            {...register("category", { required: "Category is required" })}
            className="w-full border-b text-gray-800 rounded-none border-t-0 shadow-none border-x-0"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-500">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border-b p-3 text-gray-800 rounded-none border-t-0 shadow-none border-x-0 min-h-[100px] resize-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Create Ticket Button */}
        <button
          type="submit"
          className="w-full md:w-fit px-4 bg-teal-900 text-white py-3 rounded-lg font-medium hover:bg-teal-800 transition"
        >
          {!loading ? (
            <span>Create Ticket</span>
          ) : (
            <PulseLoader color="#fff" size={15} />
          )}
        </button>
      </form>

      {/* Ticket List */}
      <div className="px-4 py-6 max-w-[1000px]">
        <h2 className="text-lg font-semibold mb-4">My Tickets</h2>
        {tickets.length === 0 ? (
          <p className="text-gray-500">No tickets yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg shadow-sm mb-20">
              <thead className="bg-teal-900 text-white">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Subject
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Category
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm font-medium text-gray-900">
                      {formatDate(ticket?.created_at)}
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-900">
                      {ticket.subject}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {ticket.category}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {ticket.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDesk;
