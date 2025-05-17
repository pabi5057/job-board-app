import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function DeleteModal({ open, onClose, id,fetchJobs }) {
    const router = useRouter();

    const handleDelete = async (jobId) => {
        try {
            const res = await fetch('/api/posts', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: jobId }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.dismiss();
                toast.success(data.message || "Job deleted successfully", {
                    toastId: "job-delete-success"
                });
                onClose();
                router.push("/");
                fetchJobs();
            } else {
                toast.error(data.message || "Failed to delete job");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Something went wrong!");
        }
    };
    return (
        <>
            {open && (
                <>
                    <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"></div>

                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Are you sure you want to delete this blog?
                            </h2>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
