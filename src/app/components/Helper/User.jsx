"use client"


import { signOut } from "next-auth/react";

function User({session}) {
    return ( 
        <>
           <div onClick={()=>{
            signOut({callbackUrl:"http://localhost:3000/signup"})
           }} className="cursor-pointer">
               <img src={`${session?.user?.image}`} alt="user" className="w-[50px] h-[50]px rounded-full"/>
           </div>
        </>
     );
}

export default User;