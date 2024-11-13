"use client";

import React, { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";

const Daashboard = () => {
  const { user } = useUser();

  return (
    <div className="p-8">
      <div className="font-bold text-4xl">Hi, {user?.fullName}</div>
    </div>
  );
};

export default Daashboard;
