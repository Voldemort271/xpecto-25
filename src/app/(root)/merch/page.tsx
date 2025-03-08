"use client";

import { api } from "@/trpc/react";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import MerchPlanCard from "@/components/merch/plan-card-merch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import MerchPaymentBox from "@/components/merch/payment-box-merch";
import { CursorContext } from "@/context/cursor-context";
import Link from "next/link";
import { $Enums } from "@prisma/client";

const Page = () => {
  const { data: merch } = api.merch.getMerch.useQuery();

  const [selectedMerch1, setSelectedMerch1] = useState<string>("");
  const [selectedMerch2, setSelectedMerch2] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize1, setSelectedSize1] = useState<string>($Enums.Size.S);
  const [selectedSize2, setSelectedSize2] = useState<string>($Enums.Size.S);
  const [price, setPrice] = useState<number>(0);

  const { setIsHovered } = useContext(CursorContext);

  const handleMerchChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setSelectedMerch: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setSelectedMerch(e.target.value);
  };

  const handleSizeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setSelectedSize: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setSelectedSize(e.target.value);
  };

  const selectedMerch1Data = merch?.find((m) => m.name === selectedMerch1);
  const selectedMerch2Data = merch?.find((m) => m.name === selectedMerch2);

  useEffect(() => {
    const calculatePrice = () => {
      let totalPrice = 0;
      if (selectedMerch1Data) {
        totalPrice += selectedMerch1Data.price;
      }
      if (selectedMerch2Data) {
        totalPrice += selectedMerch2Data.price;
      }
      setPrice(totalPrice);
    };

    calculatePrice();
  }, [selectedMerch1Data, selectedMerch2Data]);

  const getDiscountedPrice = (merchName: string, price: number) => {
    if (merchName.includes("Tee")) {
      return price - 25;
    } else if (merchName.includes("Hoodie")) {
      return price - 50;
    }
    return price;
  };

  // const handleComboOrder = () => {
  //   if (!selectedMerch1Data || !selectedMerch2Data) {
  //     alert("Select both merchs");
  //     return;
  //   }
  //   if (quantity === 0) {
  //     alert("Quantity cannot be 0");
  //     return;
  //   }
  // }

  const discountedPrice1 = selectedMerch1Data
    ? getDiscountedPrice(selectedMerch1Data.name, selectedMerch1Data.price)
    : 0;
  const discountedPrice2 = selectedMerch2Data
    ? getDiscountedPrice(selectedMerch2Data.name, selectedMerch2Data.price)
    : 0;
  const netPrice = (discountedPrice1 + discountedPrice2) * quantity;

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
                  <DialogTitle className="text-amber-50">
                    Select Combo Options
                  </DialogTitle>
                  <DialogDescription>
                    Select the first and second merch, and the quantity of
                    combos to order.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-lg font-bold uppercase text-amber-50">
                      First Merch
                    </label>
                    <select
                      value={selectedMerch1}
                      onChange={(e) => handleMerchChange(e, setSelectedMerch1)}
                      className="block w-full bg-amber-50 text-center text-2xl text-neutral-800"
                    >
                      <option value="" disabled>
                        Select a merch
                      </option>
                      {merch?.map((option, i) => (
                        <option
                          key={i}
                          value={option.name}
                          className="bg-amber-50 text-neutral-800"
                        >
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedMerch1Data && (
                    <>
                      <Image
                        src={selectedMerch1Data.images[0]?.toString() ?? ""}
                        height={100}
                        width={100}
                        alt={`merchImage1`}
                        className="rounded-lg"
                      />
                      <div className="text-amber-50">
                        Original Price: ₹{selectedMerch1Data.price} | Discounted
                        Price: ₹{discountedPrice1}
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-lg font-bold uppercase text-amber-50">
                          Size
                        </label>
                        <select
                          value={selectedSize1}
                          onChange={(e) =>
                            handleSizeChange(e, setSelectedSize1)
                          }
                          className="block w-full bg-amber-50 text-center text-2xl text-neutral-800"
                        >
                          <option value="" disabled>
                            Select a size
                          </option>
                          {Object.keys($Enums.Size).map((size, i) => (
                            <option
                              key={i}
                              value={size}
                              className="bg-amber-50 text-neutral-800"
                            >
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                  <div className="flex items-center gap-2">
                    <label className="text-lg font-bold uppercase text-amber-50">
                      Second Merch
                    </label>
                    <select
                      value={selectedMerch2}
                      onChange={(e) => handleMerchChange(e, setSelectedMerch2)}
                      className="block w-full bg-amber-50 text-center text-2xl text-neutral-800"
                    >
                      <option value="" disabled>
                        Select a merch
                      </option>
                      {merch?.map((option, i) => (
                        <option
                          key={i}
                          value={option.name}
                          className="bg-amber-50 text-neutral-800"
                        >
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedMerch2Data && (
                    <>
                      <Image
                        src={selectedMerch2Data.images[0]?.toString() ?? ""}
                        height={100}
                        width={100}
                        alt={`merchImage2`}
                        className="rounded-lg"
                      />
                      <div className="text-amber-50">
                        Original Price: ₹{selectedMerch2Data.price} | Discounted
                        Price: ₹{discountedPrice2}
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-lg font-bold uppercase text-amber-50">
                          Size
                        </label>
                        <select
                          value={selectedSize2}
                          onChange={(e) =>
                            handleSizeChange(e, setSelectedSize2)
                          }
                          className="block w-full bg-amber-50 text-center text-2xl text-neutral-800"
                        >
                          <option value="" disabled>
                            Select a size
                          </option>
                          {Object.keys($Enums.Size).map((size, i) => (
                            <option
                              key={i}
                              value={size}
                              className="bg-amber-50 text-neutral-800"
                            >
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                  <div className="flex items-center gap-2">
                    <label className="text-lg font-bold uppercase text-amber-50">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={quantity === 0 ? "" : quantity}
                      onChange={(e) =>
                        setQuantity(parseInt(e.target.value || "0"))
                      }
                      className="block w-full bg-amber-50 text-center text-2xl text-neutral-800"
                      min="1"
                    />
                  </div>
                </div>
                <div className="mt-4 text-2xl font-light uppercase text-green-400">
                  Net Price: ₹{netPrice}
                </div>
                <DialogFooter>
                  {/* <button className="rounded-lg bg-amber-50 p-2 text-neutral-900" onClick={handleComboOrder}>
                    Order Combo
                  </button> */}
                  {useUser().isSignedIn &&
                  selectedMerch1Data &&
                  selectedMerch2Data ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <div style={{ marginTop: "2rem" }}>
                          <div
                            className="justify-center self-end border-2 border-amber-50 bg-amber-50/[0.7] px-5 text-2xl uppercase text-neutral-900 hover:underline"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                          >
                            buy
                          </div>
                        </div>
                      </DialogTrigger>
                      <MerchPaymentBox
                        price={netPrice / quantity}
                        merchIds={[
                          selectedMerch1Data?.id,
                          selectedMerch2Data.id,
                        ]}
                        sizes={[selectedSize1, selectedSize2]}
                        quantity={quantity}
                      />
                    </Dialog>
                  ) : (
                    <div style={{ marginTop: "2rem" }}>
                      <Link
                        href={"/sign-in"}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="w-full justify-center self-end border-2 border-amber-50 bg-amber-50/[0.7] px-5 text-2xl uppercase text-neutral-900 hover:underline"
                      >
                        buy
                      </Link>
                    </div>
                  )}
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
