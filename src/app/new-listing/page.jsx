"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewListingPage() {
    const router=useRouter();
    const [form, setForm] = useState({
        title: "",
        image: null,
        salary: "",
        location: "",
        jobtype: "",
    });

    const [touched, setTouched] = useState({});
    

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setForm((prev) => ({ ...prev, image: files[0] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const isValid = (name) => {
        if (name === "image") return !!form.image;
        if (name === "salary") return form.salary.trim().length > 0;
        return form[name]?.trim().length > 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in form) {
            formData.append(key, form[key]);
        }

        const res = await fetch("/api/posts", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            
            toast.success("Create Successfully!");     
            setTimeout(() => {
                router.push("/");
              }, 1000)

        } else {
            toast.error("Something went wrong!");
        }

        setForm({
            title: "",
            image: null,
            salary: "",
            location: "",
            jobtype: "",
        });
    };

    const renderField = (label, name, type = "text", placeholder = "") => (
        <div>
            <label
                htmlFor={name}
                className={`block text-sm font-medium ${isValid(name) ? "text-green-700 dark:text-green-500" : "text-gray-900 dark:text-white"
                    }`}
            >
                {label}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                value={type !== "file" ? form[name] : undefined}
                onChange={handleChange}
                placeholder={placeholder}
                className={`w-full mt-1 p-2.5 text-sm rounded-lg border ${isValid(name)
                        ? "bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    }`}
            />
            {touched[name] && isValid(name) && (
                <p className="mt-1 text-sm text-green-600 dark:text-green-500">
                    ✅ <span className="font-medium">Alright!</span> Looks good!
                </p>
            )}
        </div>
    );

    return (
        <>
            <ToastContainer position="top-right" />
            <div className="px-4 py-10 max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-center">Create New Job</h1>

                <form onSubmit={handleSubmit} className="grid gap-5">
                    {renderField("Title", "title", "text", "e.g. Product Designer")}
                    {renderField("Salary", "salary", "text", "e.g. 50k or 50,000/month")}
                    {renderField("Location", "location", "text", "e.g. New York")}
                    {renderField("Job Type", "jobtype", "text", "e.g. Full-Time")}

                   
                    <div>
                        <label
                            htmlFor="image"
                            className={`block text-sm font-medium ${isValid("image") ? "text-green-700 dark:text-green-500" : "text-gray-900 dark:text-white"
                                }`}
                        >
                            Upload File
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            onChange={handleChange}
                            className={`block w-full mt-1 text-sm rounded-lg border ${isValid("image")
                                    ? "bg-green-50 border-green-500 text-green-900 file:text-green-700 focus:outline-green-500"
                                    : "bg-gray-50 border-gray-300 text-gray-900 file:text-gray-500"
                                } cursor-pointer`}
                        />
                        <div className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                            A profile picture is useful to confirm you're logged in
                        </div>
                        {touched.image && isValid("image") && (
                            <p className="mt-1 text-sm text-green-600 dark:text-green-500">
                                ✅ <span className="font-medium">Alright!</span> File selected!
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition"
                    >
                        Create Post
                    </button>
                </form>
            </div>
        </>
    );
}
