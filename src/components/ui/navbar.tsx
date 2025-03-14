import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 shadow-md bg-white">
      {/* Left Side: Logo */}
      <div className="flex items-center space-x-2">
        <img src="/images/icon.png" alt="Logo" className="w-8 h-8" />
        <span className="font-semibold">Bouldre</span>
      </div>

      {/* Right Side: Gallery & Profile */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost">Gallery</Button>
        <Avatar className="w-8 h-8" />
        <span className="font-semibold">User Name</span>
      </div>
    </nav>
  );
};

export default Navbar;
