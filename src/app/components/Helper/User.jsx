"use client"


import { signOut } from "next-auth/react";

function User({ session }) {
    return (
        <>
            <div onClick={() => {
                signOut({ callbackUrl: "/" })
            }} className="cursor-pointer">
                {
                    session?.user?.image
                        ? <img src={`${session?.user?.image}`} alt="user" className="w-[50px] h-[50]px rounded-full" />
                        : <div className="w-[50px] h-[50px] rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-[20px]">{session?.user?.name?.slice(0, 1)}</div>
                }

            </div>
        </>
    );
}

export default User;