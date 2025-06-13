
"use client";
import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import SideNav from './_components/SideNav';
import DashboardHeader from './_components/DashboardHeader';
import { useRouter } from "next/navigation";

function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchBudgets(user.primaryEmailAddress.emailAddress);
    }
  }, [user]);

  async function fetchBudgets(email) {
    try {
      const res = await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!data || data.length === 0) {
        // Redirect client if no budgets
        router.replace("/dashboard/budgets");
      } else {
        // console.log(data);
      }
    } catch (error) {
      console.error("Failed to fetch budgets", error);
    }
  }

    return (
    <div>
      <div className='fixed md:w-64 hidden md:block border shadow-sm'>
        <SideNav />
      </div>
      <div className='md:ml-64'>
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;

