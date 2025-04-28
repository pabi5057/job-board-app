"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditListingModal({ isOpen, onClose, job, onUpdate }) {
    const [form, setForm] = useState({
        title:  "",
        image: null,
        salary: "",
        location:"",
        jobtype:"",
    });

    const [touched, setTouched] = useState({});
    const router=useRouter();

    useEffect(() => {
        if (job) {
            setForm({
                title: job?.title || "",
                image:job?.image || null,
                salary:job?.salary || "",
                location:job?.location || "",
                jobtype:job?.jobtype || "",
            });
        }
    }, [job]);

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
        const value = form[name];
        if (name === "image") return value === null || value instanceof File;
        return typeof value === 'string' && value.trim().length > 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const allFieldsValid = ["title", "salary", "location", "jobtype"].every(isValid);
        if (!allFieldsValid) {
            toast.error("Please fill out all fields correctly.");
            return;
        }

        const formData = new FormData();
        for (const key in form) {
            if (form[key] !== null) {
                formData.append(key, form[key]);
            }
        }

        try {
            const res = await fetch(`/api/posts/${job._id}`, {
                method: "PUT",
                body:formData,
            });

            if (res.ok) {
                toast.success("Updated Successfully!");
                onClose();
                router.refresh();
                // setTimeout(() => {
                //     router.push("/");
                //   }, 1000)
            } else {
                toast.error("Update failed!");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred.");
        }
    };

    if (!isOpen) return null;

    const renderField = (label, name, type = "text", placeholder = "") => (
        <div>
            <label className={`block text-sm font-medium ${isValid(name) ? "text-green-700" : "text-gray-900"}`}>
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
                    ? "bg-green-50 border-green-500 text-green-900 placeholder-green-700"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                    }`}
            />
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl w-full max-w-lg p-6">
                <h2 className="text-xl font-bold mb-4">Edit Job Listing</h2>
                <form onSubmit={handleSubmit} className="grid gap-5">
                    {renderField("Title", "title", "text", "e.g. Product Designer")}
                    {renderField("Salary", "salary", "text", "e.g. 50k")}
                    {renderField("Location", "location", "text", "e.g. Remote")}
                    {renderField("Job Type", "jobtype", "text", "e.g. Full-Time")}

                    <div>
                        <label className={`block text-sm font-medium ${isValid("image") ? "text-green-700" : "text-gray-900"}`}>
                            Upload New File (optional)
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className={`block w-full mt-1 text-sm rounded-lg border ${isValid("image")
                                ? "bg-green-50 border-green-500 text-green-900"
                                : "bg-gray-50 border-gray-300 text-gray-900"
                                } cursor-pointer`}
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
