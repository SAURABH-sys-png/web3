"use client";

import React, { useState } from "react";
import Link from "next/link";
// We only import what we absolutely need to keep it simple
import { SignIn, SignOutButton, SignedIn, SignUp } from "@clerk/nextjs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        
        <Link href="/" className="text-2xl font-black text-blue-600 tracking-tighter">
          Sr Chat
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
          
          {/* 1. Only show "My Chats" if logged in */}
          <SignedIn>
            <Link href="/chat" className="text-gray-600 hover:text-blue-600 font-medium">My Chats</Link>
          </SignedIn>
          
          <div className="flex items-center gap-4 ml-4">
            {/* 2. If LOGGED OUT: Show Auth Buttons */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-gray-700 font-medium hover:text-blue-600">Log In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>

            {/* 3. If LOGGED IN: Show the User Avatar/Logout Menu */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
           <SignedIn>
              <UserButton afterSignOutUrl="/" />
           </SignedIn>
           <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6" : "M4 6h16M4 12h16m-7 6h7"} />
             </svg>
           </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;