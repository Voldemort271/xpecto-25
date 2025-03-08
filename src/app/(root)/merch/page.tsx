"use client";

import { useCurrentUser } from "@/lib/utils";
import { api } from "@/trpc/react";
import React, { useState } from "react";
import Image from "next/image";
import MerchPlanCard from "@/components/merch/plan-card-merch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Page = () => {
  const { data: merch } = api.merch.getMerch.useQuery();

  const [selectedMerch1, setSelectedMerch1] = useState<string>("");
  const [selectedMerch2, setSelectedMerch2] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const handleMerchChange = (e: React.ChangeEvent<HTMLSelectElement>, setSelectedMerch: React.Dispatch<React.SetStateAction<string>>) => {
    setSelectedMerch(e.target.value);
  };

  const selectedMerch1Data = merch?.find((m) => m.name === selectedMerch1);
  const selectedMerch2Data = merch?.find((m) => m.name === selectedMerch2);

  const handleComboOrder = () => {
    if (!selectedMerch1Data || !selectedMerch2Data) {
      alert("Select both merchs");
      return;
    }
    if (quantity === 0) {
      alert("Quantity cannot be 0");
      return;
    }
    
  }

  return (
    <>
      <div className="relative flex justify-evenly bg-neutral-900">
        <div className="relative z-0 col-span-3 flex min-h-96 flex-col items-center justify-center border-2 border-amber-50 px-12 py-24 uppercase text-amber-50">
          <Image
            src={
              "https://res.cloudinary.com/diqdg481x/image/upload/v1739198119/images/iitmandi.jpg"
            }
            width={1920}
            height={600}
            alt={"College Pic"}
            className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-center opacity-20"
          />
          <div className="h-16"></div>
          <div className="text-9xl font-bold">Merch</div>
          <div className="text-2xl font-normal"></div>
        </div>
        <div className="flex flex-col justify-evenly overflow-y-scroll">
          <div className="mx-20 mt-20 flex h-full w-full flex-col items-center justify-center gap-10 border-2 p-6">
          <Dialog>
              <DialogTrigger asChild>
                <button className="rounded-lg bg-amber-50 p-2 text-neutral-900">
                  combo box (50 rs off per hoodie and 25 rs off per tshirt)
                </button>
              </DialogTrigger>
              <DialogContent className="bg-neutral-900">
                <DialogHeader>
                  <DialogTitle className="text-amber-50">Select Combo Options</DialogTitle>
                  <DialogDescription>
                    Select the first and second merch, and the quantity of combos to order.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-lg font-bold uppercase text-amber-50">First Merch</label>
                    <select
                      value={selectedMerch1}
                      onChange={(e) => handleMerchChange(e, setSelectedMerch1)}
                      className="block w-full bg-amber-50 text-center text-2xl text-neutral-800"
                    >
                      <option value="" disabled>Select a merch</option>
                      {merch?.map((option, i) => (
                        <option key={i} value={option.name} className="bg-amber-50 text-neutral-800">
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedMerch1Data && (
                    <Image
                      src={selectedMerch1Data.images[0]?.toString() ?? ""}
                      height={200}
                      width={200}
                      alt={`merchImage1`}
                      className="rounded-lg"
                    />
                  )}
                  <div className="flex items-center gap-2">
                    <label className="text-lg font-bold uppercase text-amber-50">Second Merch</label>
                    <select
                      value={selectedMerch2}
                      onChange={(e) => handleMerchChange(e, setSelectedMerch2)}
                      className="block w-full bg-amber-50 text-center text-2xl text-neutral-800"
                    >
                      <option value="" disabled>Select a merch</option>
                      {merch?.map((option, i) => (
                        <option key={i} value={option.name} className="bg-amber-50 text-neutral-800">
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedMerch2Data && (
                    <Image
                      src={selectedMerch2Data.images[0]?.toString() ?? ""}
                      height={200}
                      width={200}
                      alt={`merchImage2`}
                      className="rounded-lg"
                    />
                  )}
                  <div className="flex items-center gap-2">
                    <label className="text-lg font-bold uppercase text-amber-50">Quantity</label>
                    <input
                      type="number"
                      value={quantity === 0 ? "" : quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value || "0"))}
                      className="block w-full bg-amber-50 text-center text-2xl text-neutral-800"
                      min="1"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <button className="rounded-lg bg-amber-50 p-2 text-neutral-900" onClick={handleComboOrder}>
                    Order Combo
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Image
              src={`https://res.cloudinary.com/diqdg481x/image/upload/v1741430780/lzhkhwp4ehawu8h4f12v.png`}
              height={200}
              width={200}
              alt={`comboIMG`}
            />
          </div>
          <div className="flex w-full flex-wrap items-center justify-evenly">
            {merch?.map((m, i) => <MerchPlanCard data={m} key={i} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
