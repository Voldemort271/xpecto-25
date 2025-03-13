"use client";

import { api } from "@/trpc/react";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import MerchPlanCard from "@/components/merch/plan-card-merch";
import Loader from "@/components/common/loader";
import sizeChart from "public/images/size_chart.jpeg";
import merch_4 from "public/images/merch_4.jpeg";
import { Share_Tech } from "next/font/google";
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
import SizeChart from "@/components/merch/size-chart-dialog";

const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

const Page = () => {
  const { data: merch, isLoading } = api.merch.getMerch.useQuery();
  const user = useUser(); // Move useUser() to the top level

  const [selectedMerch1, setSelectedMerch1] = useState<string>("");
  const [selectedMerch2, setSelectedMerch2] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize1, setSelectedSize1] = useState<string>($Enums.Size.S);
  const [selectedSize2, setSelectedSize2] = useState<string>($Enums.Size.S);

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

  // Add this function to calculate the total price for all items
  function calculateTotalPrice() {
    // Get the total price of all merchandise
    const totalPrice =
      merch?.reduce(
        (sum, item) => sum + getDiscountedPrice(item.name, item.price - 25),
        0,
      ) ?? 0;

    // Apply quantity
    return totalPrice * quantity;
  }

  const discountedPrice1 = selectedMerch1Data
    ? getDiscountedPrice(selectedMerch1Data.name, selectedMerch1Data.price)
    : 0;
  const discountedPrice2 = selectedMerch2Data
    ? getDiscountedPrice(selectedMerch2Data.name, selectedMerch2Data.price)
    : 0;
  const netPrice = (discountedPrice1 + discountedPrice2) * quantity;

  if (isLoading || !merch) {
    return (
      <div className="flex min-h-screen w-screen items-center justify-center bg-neutral-900">
        <Loader loadingText="Loading Merchandise ..." />
      </div>
    );
  }

  return (
    <>
      <div className="relative flex min-h-screen bg-neutral-900">
        {/* Hero Section - Responsive Ribbon */}
        <div className="fixed left-0 top-0 z-10 flex h-screen w-16 flex-col items-center justify-center overflow-hidden border-2 border-amber-50 bg-neutral-900 px-4 py-8 uppercase text-amber-50 shadow-xl sm:w-24 sm:px-6 sm:py-10 md:w-32 md:px-8 md:py-12 lg:w-40 lg:px-10 lg:py-14 xl:w-48">
          <Image
            src={
              "https://res.cloudinary.com/diqdg481x/image/upload/v1739198119/images/iitmandi.jpg"
            }
            width={1920}
            height={600}
            alt={"College Pic"}
            className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-center opacity-20 transition-opacity duration-500 hover:opacity-30"
          />
          <div className="animate-fade-in-down text-lg font-bold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Merch
          </div>
          <div className="animate-fade-in-up mt-2 hidden text-xs font-light opacity-80 sm:block sm:text-sm md:text-base lg:text-lg">
            Exclusive College Gear
          </div>
        </div>

        {/* Main Content - Adjusted with left margin to make room for fixed ribbon */}
        <div className="ml-20 flex flex-1 flex-col justify-evenly overflow-y-auto px-6 py-12">
          <div className="mx-auto mt-12 flex h-full w-full max-w-4xl flex-col items-center justify-center gap-12 rounded-xl border-2 border-amber-50/50 bg-neutral-800/50 p-8 shadow-lg backdrop-blur-sm">
            <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
              {/* Original Combo Box Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex transform items-center gap-3 rounded-lg border-2 border-amber-100 bg-amber-50 p-4 px-6 font-bold text-neutral-900 shadow-md transition-all duration-300 hover:-translate-y-2 hover:bg-amber-200 hover:shadow-xl active:translate-y-0 active:bg-amber-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Combo Box{" "}
                    <span className="text-sm font-medium">
                      (50₹ off Hoodie, 25₹ off T-shirt)
                    </span>
                  </button>
                </DialogTrigger>

                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex transform items-center gap-3 rounded-lg border-2 border-amber-100 bg-amber-50 p-4 px-6 font-bold text-neutral-900 shadow-md transition-all duration-300 hover:-translate-y-2 hover:bg-amber-200 hover:shadow-xl active:translate-y-0 active:bg-amber-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Buy All{" "}
                      <span className="text-sm font-medium">
                        (75₹ off Hoodie, 50₹ off T-shirt)
                      </span>
                    </button>
                  </DialogTrigger>

                  {/* This is a separate DialogContent specific to the Buy All feature */}
                  <DialogContent className="max-h-[80vh] overflow-y-auto rounded-xl border border-amber-50/20 bg-neutral-900/95 shadow-2xl">
                    <DialogHeader>
                      <DialogTitle
                        className={`${shareTech.className} text-2xl font-bold tracking-wide text-amber-50`}
                      >
                        Buy All Items
                      </DialogTitle>
                      <DialogDescription
                        className={`${shareTech.className} text-amber-100/70`}
                      >
                        Purchase all available merchandise in one go.
                      </DialogDescription>
                    </DialogHeader>

                    {/* Size Chart Dialog - Keep this from original */}
                    <SizeChart />

                    {/* Price Summary Card */}
                    <div className="mb-6 rounded-lg border border-amber-50/10 bg-neutral-800/50 p-4 shadow-inner">
                      <div className="flex justify-between">
                        <div
                          className={`${shareTech.className} text-sm font-medium text-amber-50/80`}
                        >
                          Combo Savings:
                        </div>
                        <div
                          className={`${shareTech.className} text-sm font-medium text-green-400`}
                        >
                          {quantity > 0
                            ? `₹${merch?.reduce((sum, item) => sum + item.price, 0) * quantity - calculateTotalPrice()}`
                            : "₹0"}
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <div
                          className={`${shareTech.className} text-lg font-bold text-amber-50`}
                        >
                          Total Price:
                        </div>
                        <div
                          className={`${shareTech.className} text-xl font-bold text-green-400`}
                        >
                          ₹{calculateTotalPrice()}
                        </div>
                      </div>
                    </div>

                    {/* Size Selection */}
                    <div className="rounded-lg border border-amber-50/10 bg-neutral-800/30 p-4">
                      <h3
                        className={`${shareTech.className} mb-3 text-center text-lg font-bold uppercase tracking-wide text-amber-50`}
                      >
                        Select Size
                      </h3>

                      <select
                        value={selectedSize1}
                        onChange={(e) => handleSizeChange(e, setSelectedSize1)}
                        className={`${shareTech.className} mb-4 block w-full rounded-md bg-amber-50/90 p-2 text-center text-neutral-800 transition-all duration-200 hover:bg-amber-100 focus:ring-2 focus:ring-amber-300`}
                      >
                        <option
                          className={`${shareTech.className}`}
                          value=""
                          disabled
                        >
                          Select size for all items
                        </option>
                        {Object.keys($Enums.Size).map((size, i) => (
                          <option
                            key={i}
                            value={size}
                            className={`${shareTech.className} bg-amber-50 text-neutral-800`}
                          >
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Quantity Selector */}
                    <div className="mt-6 rounded-lg border border-amber-50/10 bg-neutral-800/30 p-4">
                      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                        <label
                          className={`${shareTech.className} text-lg font-bold uppercase tracking-wide text-amber-50`}
                        >
                          Quantity
                        </label>
                        <div className="flex w-full max-w-xs items-center rounded-lg bg-neutral-700/50 sm:w-1/2">
                          <button
                            onClick={() =>
                              setQuantity(Math.max(1, quantity - 1))
                            }
                            className={`${shareTech.className} rounded-l-lg bg-amber-50/80 px-4 py-2 text-xl font-bold text-neutral-900 transition-colors hover:bg-amber-200 active:bg-amber-300`}
                          >
                            −
                          </button>
                          <input
                            type="number"
                            value={quantity === 0 ? "" : quantity}
                            onChange={(e) =>
                              setQuantity(parseInt(e.target.value || "0"))
                            }
                            className={`${shareTech.className} w-full border-x border-amber-50/10 bg-transparent p-2 text-center text-xl text-amber-50 focus:outline-none`}
                            min="1"
                          />
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className={`${shareTech.className} rounded-r-lg bg-amber-50/80 px-4 py-2 text-xl font-bold text-neutral-900 transition-colors hover:bg-amber-200 active:bg-amber-300`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="animate-fade-in mt-6 rounded-lg border border-amber-50/20 bg-gradient-to-r from-amber-900/20 to-neutral-800/30 p-4">
                      <h3
                        className={`${shareTech.className} mb-2 text-center text-xl font-bold uppercase tracking-wide text-amber-50`}
                      >
                        Order Summary - All Items
                      </h3>
                      <div
                        className={`${shareTech.className} space-y-2 divide-y divide-amber-50/10`}
                      >
                        {merch?.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between py-1"
                          >
                            <span className="text-amber-50/80">
                              {item.name} ({selectedSize1})
                            </span>
                            <span className="text-amber-50">
                              ₹{getDiscountedPrice(item.name, item.price - 25)}
                            </span>
                          </div>
                        ))}
                        <div className="flex justify-between py-1">
                          <span className="text-amber-50/80">Quantity</span>
                          <span className="text-amber-50">x{quantity}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-lg font-bold text-amber-50">
                            Total
                          </span>
                          <span className="text-lg font-bold text-green-400">
                            ₹{calculateTotalPrice()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Buy Now Button */}
                    <DialogFooter className="mt-6">
                      {user.isSignedIn ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <button
                              className="group relative w-full overflow-hidden rounded-lg border-2 border-amber-50 bg-amber-50/90 px-6 py-3 text-2xl font-bold uppercase text-neutral-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:translate-y-0"
                              onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}
                            >
                              <span
                                className={`${shareTech.className} relative z-10`}
                              >
                                Buy All Items
                              </span>
                              <span className="absolute bottom-0 left-0 h-0 w-full bg-gradient-to-r from-amber-300 to-amber-200 transition-all duration-300 group-hover:h-full"></span>
                            </button>
                          </DialogTrigger>
                          <MerchPaymentBox
                            price={calculateTotalPrice() / quantity}
                            merchIds={merch?.map((item) => item.id) || []}
                            sizes={Array(merch?.length).fill(selectedSize1)}
                            quantity={quantity}
                          />
                        </Dialog>
                      ) : (
                        <Link
                          href={"/sign-in"}
                          className="group relative w-full overflow-hidden rounded-lg border-2 border-amber-50 bg-amber-50/90 px-6 py-3 text-2xl font-bold uppercase text-neutral-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:translate-y-0"
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
                          <div className="flex items-center justify-center">
                            <span
                              className={`${shareTech.className} relative z-10`}
                            >
                              Sign In to Buy
                            </span>
                          </div>
                          <span className="absolute bottom-0 left-0 h-0 w-full bg-gradient-to-r from-amber-300 to-amber-200 transition-all duration-300 group-hover:h-full"></span>
                        </Link>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <div className="grid gap-6 md:grid-cols-2">
                  <DialogContent className="max-h-[80vh] overflow-y-auto rounded-xl border border-amber-50/20 bg-neutral-900/95 shadow-2xl">
                    <DialogHeader>
                      <DialogTitle
                        className={`${shareTech.className} text-2xl font-bold tracking-wide text-amber-50`}
                      >
                        Customize Your Combo
                      </DialogTitle>
                      <DialogDescription
                        className={`${shareTech.className} text-amber-100/70`}
                      >
                        Pick your merch, sizes, and quantity for the best deal.
                      </DialogDescription>
                    </DialogHeader>

                    {/* Size Chart Dialog */}
                    <SizeChart />

                    {/* Price Summary Card - Visible throughout selection process */}
                    <div className="mb-6 rounded-lg border border-amber-50/10 bg-neutral-800/50 p-4 shadow-inner">
                      <div className="flex justify-between">
                        <div
                          className={`${shareTech.className} text-sm font-medium text-amber-50/80`}
                        >
                          Combo Savings:
                        </div>
                        <div
                          className={`${shareTech.className} text-sm font-medium text-green-400`}
                        >
                          {selectedMerch1Data && selectedMerch2Data
                            ? `₹${(selectedMerch1Data.price + selectedMerch2Data.price - (discountedPrice1 + discountedPrice2)) * quantity}`
                            : "₹0"}
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <div
                          className={`${shareTech.className} text-lg font-bold text-amber-50`}
                        >
                          Total Price:
                        </div>
                        <div
                          className={`${shareTech.className} text-xl font-bold text-green-400`}
                        >
                          ₹{netPrice}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      {/* First Item Selection */}
                      <div className="rounded-lg border border-amber-50/10 bg-neutral-800/30 p-4">
                        <h3
                          className={`${shareTech.className} mb-3 text-center text-lg font-bold uppercase tracking-wide text-amber-50`}
                        >
                          First Item
                        </h3>

                        <select
                          value={selectedMerch1}
                          onChange={(e) =>
                            handleMerchChange(e, setSelectedMerch1)
                          }
                          className={`${shareTech.className} mb-4 block w-full rounded-md bg-amber-50/90 p-2 text-center text-neutral-800 transition-all duration-200 hover:bg-amber-100 focus:ring-2 focus:ring-amber-300`}
                        >
                          <option value="" disabled>
                            Select merch
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

                        {selectedMerch1Data && (
                          <div className="animate-fade-in flex flex-col items-center gap-3">
                            <div className="group relative h-32 w-32 overflow-hidden rounded-lg">
                              <Image
                                src={
                                  selectedMerch1Data.images[0]?.toString() ?? ""
                                }
                                layout="fill"
                                objectFit="cover"
                                alt={`${selectedMerch1} preview`}
                                className="transform transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>

                            <div className="flex w-full items-center justify-between rounded-md bg-neutral-700/50 px-3 py-1">
                              <span
                                className={`${shareTech.className} text-sm text-amber-50/80`}
                              >
                                Original:
                              </span>
                              <span
                                className={`${shareTech.className} text-sm text-neutral-500 line-through`}
                              >
                                ₹{selectedMerch1Data.price}
                              </span>
                              <span
                                className={`${shareTech.className} text-sm font-medium text-green-400`}
                              >
                                ₹{discountedPrice1}
                              </span>
                            </div>

                            <select
                              value={selectedSize1}
                              onChange={(e) =>
                                handleSizeChange(e, setSelectedSize1)
                              }
                              className={`${shareTech.className} block w-full rounded-md bg-amber-50/90 p-2 text-center text-neutral-800 transition-all duration-200 hover:bg-amber-100 focus:ring-2 focus:ring-amber-300`}
                            >
                              <option
                                className={`${shareTech.className}`}
                                value=""
                                disabled
                              >
                                Select size
                              </option>
                              {Object.keys($Enums.Size).map((size, i) => (
                                <option
                                  key={i}
                                  value={size}
                                  className={`${shareTech.className} bg-amber-50 text-neutral-800`}
                                >
                                  {size}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>

                      {/* Second Item Selection */}
                      <div className="rounded-lg border border-amber-50/10 bg-neutral-800/30 p-4">
                        <h3
                          className={`${shareTech.className} mb-3 text-center text-lg font-bold uppercase tracking-wide text-amber-50`}
                        >
                          Second Item
                        </h3>

                        <select
                          value={selectedMerch2}
                          onChange={(e) =>
                            handleMerchChange(e, setSelectedMerch2)
                          }
                          className={`${shareTech.className} mb-4 block w-full rounded-md bg-amber-50/90 p-2 text-center text-neutral-800 transition-all duration-200 hover:bg-amber-100 focus:ring-2 focus:ring-amber-300`}
                        >
                          <option value="" disabled>
                            Select merch
                          </option>
                          {merch?.map((option, i) => (
                            <option
                              key={i}
                              value={option.name}
                              className={`${shareTech.className} bg-amber-50 text-neutral-800`}
                            >
                              {option.name}
                            </option>
                          ))}
                        </select>

                        {selectedMerch2Data && (
                          <div className="animate-fade-in flex flex-col items-center gap-3">
                            <div className="group relative h-32 w-32 overflow-hidden rounded-lg">
                              <Image
                                src={
                                  selectedMerch2Data.images[0]?.toString() ?? ""
                                }
                                layout="fill"
                                objectFit="cover"
                                alt={`${selectedMerch2} preview`}
                                className="transform transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>

                            <div className="flex w-full items-center justify-between rounded-md bg-neutral-700/50 px-3 py-1">
                              <span
                                className={`${shareTech.className} text-sm text-amber-50/80`}
                              >
                                Original:
                              </span>
                              <span
                                className={`${shareTech.className} text-sm text-neutral-500 line-through`}
                              >
                                ₹{selectedMerch2Data.price}
                              </span>
                              <span
                                className={`${shareTech.className} text-sm font-medium text-green-400`}
                              >
                                ₹{discountedPrice2}
                              </span>
                            </div>

                            <select
                              value={selectedSize2}
                              onChange={(e) =>
                                handleSizeChange(e, setSelectedSize2)
                              }
                              className={`${shareTech.className} block w-full rounded-md bg-amber-50/90 p-2 text-center text-neutral-800 transition-all duration-200 hover:bg-amber-100 focus:ring-2 focus:ring-amber-300`}
                            >
                              <option
                                className={`${shareTech.className}`}
                                value=""
                                disabled
                              >
                                Select size
                              </option>
                              {Object.keys($Enums.Size).map((size, i) => (
                                <option
                                  key={i}
                                  value={size}
                                  className={` ${shareTech.className} bg-amber-50 text-neutral-800`}
                                >
                                  {size}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="mt-6 rounded-lg border border-amber-50/10 bg-neutral-800/30 p-4">
                      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                        <label
                          className={`${shareTech.className} text-lg font-bold uppercase tracking-wide text-amber-50`}
                        >
                          Quantity
                        </label>
                        <div className="flex w-full max-w-xs items-center rounded-lg bg-neutral-700/50 sm:w-1/2">
                          <button
                            onClick={() =>
                              setQuantity(Math.max(1, quantity - 1))
                            }
                            className={`${shareTech.className} rounded-l-lg bg-amber-50/80 px-4 py-2 text-xl font-bold text-neutral-900 transition-colors hover:bg-amber-200 active:bg-amber-300`}
                          >
                            −
                          </button>
                          <input
                            type="number"
                            value={quantity === 0 ? "" : quantity}
                            onChange={(e) =>
                              setQuantity(parseInt(e.target.value || "0"))
                            }
                            className={`${shareTech.className} w-full border-x border-amber-50/10 bg-transparent p-2 text-center text-xl text-amber-50 focus:outline-none`}
                            min="1"
                          />
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className={`${shareTech.className} rounded-r-lg bg-amber-50/80 px-4 py-2 text-xl font-bold text-neutral-900 transition-colors hover:bg-amber-200 active:bg-amber-300`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* )} */}

                    {/* Order Summary */}
                    {selectedMerch1Data && selectedMerch2Data && (
                      <div className="animate-fade-in mt-6 rounded-lg border border-amber-50/20 bg-gradient-to-r from-amber-900/20 to-neutral-800/30 p-4">
                        <h3
                          className={`${shareTech.className} mb-2 text-center text-xl font-bold uppercase tracking-wide text-amber-50`}
                        >
                          Order Summary
                        </h3>
                        <div
                          className={`${shareTech.className} space-y-2 divide-y divide-amber-50/10`}
                        >
                          <div className="flex justify-between py-1">
                            <span className="text-amber-50/80">
                              {selectedMerch1} ({selectedSize1})
                            </span>
                            <span className="text-amber-50">
                              ₹{discountedPrice1}
                            </span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-amber-50/80">
                              {selectedMerch2} ({selectedSize2})
                            </span>
                            <span className="text-amber-50">
                              ₹{discountedPrice2}
                            </span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-amber-50/80">Quantity</span>
                            <span className="text-amber-50">x{quantity}</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-lg font-bold text-amber-50">
                              Total
                            </span>
                            <span className="text-lg font-bold text-green-400">
                              ₹{netPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <DialogFooter className="mt-6">
                      {user.isSignedIn &&
                      selectedMerch1Data &&
                      selectedMerch2Data ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <button
                              className="group relative w-full overflow-hidden rounded-lg border-2 border-amber-50 bg-amber-50/90 px-6 py-3 text-2xl font-bold uppercase text-neutral-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:translate-y-0"
                              onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}
                            >
                              <span
                                className={`${shareTech.className} relative z-10`}
                              >
                                Buy Now
                              </span>
                              <span className="absolute bottom-0 left-0 h-0 w-full bg-gradient-to-r from-amber-300 to-amber-200 transition-all duration-300 group-hover:h-full"></span>
                            </button>
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
                        <Link
                          href={"/sign-in"}
                          className="group relative w-full overflow-hidden rounded-lg border-2 border-amber-50 bg-amber-50/90 px-6 py-3 text-2xl font-bold uppercase text-neutral-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:translate-y-0"
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
                          <div className="flex items-center justify-center">
                            <span
                              className={`${shareTech.className} relative z-10`}
                            >
                              Buy
                            </span>
                          </div>
                          <span className="absolute bottom-0 left-0 h-0 w-full bg-gradient-to-r from-amber-300 to-amber-200 transition-all duration-300 group-hover:h-full"></span>
                        </Link>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </div>
              </Dialog>
            </div>

            {/* Combo Offer Image */}
            <div className="group relative mb-6 flex w-full items-center justify-center overflow-hidden rounded-xl">
              <Image
                src={merch_4}
                height={500}
                width={500}
                alt={`Special Combo Offer`}
                className="z-0 transform rounded-lg shadow-lg transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="mb-6 animate-pulse text-2xl font-bold tracking-wide text-amber-50">
                  BEST VALUE
                </span>
              </div>
            </div>
          </div>

          {/* Merch Cards */}
          <div className="mt-12 flex w-full flex-wrap items-center justify-evenly gap-8">
            {merch?.map((m, i) => <MerchPlanCard data={m} key={i} />)}
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        .animate-fade-in {
          animation: fadeInUp 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default Page;
