
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    companyName: "",
    registrationNumber: "",
    zipcode: "",
    state: "",
    country: "",
  });

  const router = useRouter();
  const isRecruiter = form.role === "recruiter";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = { ...form };
    if (!isRecruiter) {
      delete submitData.companyName;
      delete submitData.registrationNumber;
      delete submitData.zipcode;
      delete submitData.state;
      delete submitData.country;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(submitData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      toast.success(data?.message || "Registered Successfully!");
      router.push("/login");
    } else {
      toast.error(data?.message || "Registration failed");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="p-2 border rounded-lg col-span-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded-lg col-span-1"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border rounded-lg col-span-1"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <select
            className="p-2 border rounded-lg col-span-2"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
          >
            <option value="">Select Role</option>
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </select>

          {/* Recruiter Fields */}
          {isRecruiter && (
            <>
              <input
                type="text"
                placeholder="Company Name"
                className="p-2 border rounded-lg col-span-2"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Registration Number"
                className="p-2 border rounded-lg col-span-1"
                value={form.registrationNumber}
                onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Zipcode"
                className="p-2 border rounded-lg col-span-3"
                value={form.zipcode}
                onChange={(e) => setForm({ ...form, zipcode: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="State"
                className="p-2 border rounded-lg col-span-2"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Country"
                className="p-2 border rounded-lg col-span-1 md:col-span-1"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                required
              />
            </>
          )}

          <button
            type="submit"
            className="col-span-1 md:col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <span className="text-red-500">
            <Link href="/login">Login</Link>
          </span>
        </p>
      </div>
    </>
  );
}


