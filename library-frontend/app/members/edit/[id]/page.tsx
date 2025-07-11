"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "../../../../lib/useAuth";
import { getMembers, updateMember } from "../../../../lib/memberService";
import FormField from "../../../../components/FormField";

interface Member {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'Active' | 'Inactive';
}

export default function EditMemberPage() {
  const { token } = useAuth();
  const router = useRouter();
  const params = useParams();
  const memberId = params.id as string;
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", status: "Active" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token || !memberId) return;
    getMembers(token)
      .then((data: Member[]) => {
        const member = data.find((m) => m._id === memberId);
        if (member) {
          setFormData({
            name: member.name || "",
            email: member.email || "",
            phone: member.phone || "",
            status: member.status || "Active",
          });
        } else {
          setError("Member not found");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load member");
        setLoading(false);
      });
  }, [token, memberId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!token) {
      setError("Authentication token is missing.");
      return;
    }
    try {
      await updateMember(token, memberId, formData);
      router.push("/members");
    } catch {
      setError("Failed to update member");
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-red-600">{error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-6">
        <Link href="/members" className="text-indigo-600 hover:text-indigo-900">
          ← Back to Members
        </Link>
      </div>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Member</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <FormField
            id="name"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <FormField
            id="email"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormField
            id="phone"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          {error && <div className="text-red-600 mt-4">{error}</div>}
          <div className="mt-8 flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </motion.button>
            <Link
              href="/members"
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
}