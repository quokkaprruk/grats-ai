import React from "react";
import { PricingTable } from "@clerk/clerk-react";
const Plan = () => {
  return (
    <div className="max-w-2xl mx-auto z-20 my-30">
      <div className="text-center">
        <h2 className="text-primary text-[42px] font-semibold">
          Choose Your Plan
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Get started with our Free Plan, no credit card needed. Go Premium
          anytime for full access and exclusive tools.
        </p>
      </div>
      <div className="mt-14 max-sm:mx-8">
        <PricingTable />
      </div>
    </div>
  );
};

export default Plan;
