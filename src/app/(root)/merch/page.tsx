"use client";

import { api } from "@/trpc/react";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import MerchPlanCard from "@/components/merch/plan-card-merch";
import Loader from "@/components/common/loader";
import sizeChart from "public/images/size_chart.jpeg";
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

const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

const Page = () => {
  const { data: merch, isLoading } = api.merch.getMerch.useQuery();
  const user = useUser(); // Move useUser() to the top level

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
      <div className="relative flex min-h-screen justify-evenly bg-neutral-900">
        {/* Hero Section */}
        <div className="relative z-0 col-span-3 flex min-h-96 flex-col items-center justify-center overflow-hidden border-2 border-amber-50 px-12 py-24 uppercase text-amber-50 shadow-xl">
          <Image
            src={
              "https://res.cloudinary.com/diqdg481x/image/upload/v1739198119/images/iitmandi.jpg"
            }
            width={1920}
            height={600}
            alt={"College Pic"}
            className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-center opacity-20 transition-opacity duration-500 hover:opacity-30"
          />
          <div className="h-16"></div>
          <div className="animate-fade-in-down text-9xl font-bold tracking-tight">
            Merch
          </div>
          <div className="animate-fade-in-up mt-4 text-2xl font-light opacity-80">
            Exclusive College Gear
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col justify-evenly overflow-y-auto px-6 py-12">
          <div className="mx-auto mt-12 flex h-full w-full max-w-2xl flex-col items-center justify-center gap-12 rounded-xl border-2 border-amber-50/50 bg-neutral-800/50 p-8 shadow-lg backdrop-blur-sm">
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
                {/* New Customize Combo Box Button */}
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
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Customize Combo Box
                  </button>
                </DialogTrigger>
                {/* Dialog Content (Shared by Both Buttons) */}
                <DialogContent className="max-h-[80vh] overflow-y-auto rounded-xl border border-amber-50/20 bg-neutral-900/95 shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className={`${shareTech.className} text-2xl font-bold tracking-wide text-amber-50`}>
                      Customize Your Combo
                    </DialogTitle>
                    <DialogDescription className={`${shareTech.className} text-amber-100/70`}>
                      Pick your merch, sizes, and quantity for the best deal.
                    </DialogDescription>
                  </DialogHeader>

                  {/* Size Chart Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className={`${shareTech.className} absolute right-12 top-6 flex items-center gap-1 rounded-md border border-amber-50/30 bg-amber-50/10 px-2 py-1 text-sm font-medium text-amber-50 transition-all duration-200 hover:bg-amber-50/20`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                          <path d="M3 9h18" />
                          <path d="M9 21V9" />
                        </svg>
                        Size Chart
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-xl border border-amber-50/20 bg-neutral-900/95 shadow-2xl">
                      <DialogHeader>
                        <DialogTitle className={`${shareTech.className} text-2xl font-bold tracking-wide text-amber-50`}>
                          Size Chart
                        </DialogTitle>
                        <DialogDescription className={`${shareTech.className} text-amber-100/70`}>
                          Find your perfect fit with our comprehensive size
                          chart.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="mt-4 overflow-hidden rounded-lg border border-amber-50/10">
                        <Image
                          src={sizeChart}
                          width={800}
                          height={600}
                          alt="Size Chart"
                          className="w-full"
                        />
                      </div>

                      <div className={` ${shareTech.className} mt-4 space-y-4 text-amber-50/80`}>
                        Please measure yourself carefully before selecting a
                        size
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Price Summary Card - Visible throughout selection process */}
                  <div className="mb-6 rounded-lg border border-amber-50/10 bg-neutral-800/50 p-4 shadow-inner">
                    <div className="flex justify-between">
                      <div className={`${shareTech.className} text-sm font-medium text-amber-50/80`}>
                        Combo Savings:
                      </div>
                      <div className="text-sm font-medium text-green-400">
                        {selectedMerch1Data && selectedMerch2Data
                          ? `₹${selectedMerch1Data.price + selectedMerch2Data.price - (discountedPrice1 + discountedPrice2)}`
                          : "₹0"}
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className={`${shareTech.className} text-lg font-bold text-amber-50`}>
                        Total Price:
                      </div>
                      <div className="text-xl font-bold text-green-400">
                        ₹{netPrice}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* First Item Selection */}
                    <div className="rounded-lg border border-amber-50/10 bg-neutral-800/30 p-4">
                      <h3 className={`${shareTech.className} mb-3 text-center text-lg font-bold uppercase tracking-wide text-amber-50`}>
                        First Item
                      </h3>

                      <select
                        value={selectedMerch1}
                        onChange={(e) =>
                          handleMerchChange(e, setSelectedMerch1)
                        }
                        className="mb-4 block w-full rounded-md bg-amber-50/90 p-2 text-center text-neutral-800 transition-all duration-200 hover:bg-amber-100 focus:ring-2 focus:ring-amber-300"
                      >
                        <option className={`${shareTech.className}`} value="" disabled>
                          Select merch
                        </option>
                        {merch?.map((option, i) => (
                          <option
                            key={i}
                            value={option.name}
                            className={` ${shareTech.className} bg-amber-50 text-neutral-800`}
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
                            <span className={`${shareTech.className} text-sm text-amber-50/80`}>
                              Original:
                            </span>
                            <span className="text-sm text-neutral-500 line-through">
                              ₹{selectedMerch1Data.price}
                            </span>
                            <span className="text-sm font-medium text-green-400">
                              ₹{discountedPrice1}
                            </span>
                          </div>

                          <select
                            value={selectedSize1}
                            onChange={(e) =>
                              handleSizeChange(e, setSelectedSize1)
                            }
                            className="block w-full rounded-md bg-amber-50/90 p-2 text-center text-neutral-800 transition-all duration-200 hover:bg-amber-100 focus:ring-2 focus:ring-amber-300"
                          >
                            <option className={`${shareTech.className}`} value="" disabled>
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
                      <h3 className={`${shareTech.className} mb-3 text-center text-lg font-bold uppercase tracking-wide text-amber-50`}>
                        Second Item
                      </h3>

                      <select
                        value={selectedMerch2}
                        onChange={(e) =>
                          handleMerchChange(e, setSelectedMerch2)
                        }
                        className="mb-4 block w-full rounded-md bg-amber-50/90 p-2 text-center text-neutral-800 transition-all duration-200 hover:bg-amber-100 focus:ring-2 focus:ring-amber-300"
                      >
                        <option className={`${shareTech.className}`} value="" disabled>
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
                            <span className={`${shareTech.className} text-sm text-amber-50/80`}>
                              Original:
                            </span>
                            <span className="text-sm text-neutral-500 line-through">
                              ₹{selectedMerch2Data.price}
                            </span>
                            <span className="text-sm font-medium text-green-400">
                              ₹{discountedPrice2}
                            </span>
                          </div>

                          <select
                            value={selectedSize2}
                            onChange={(e) =>
                              handleSizeChange(e, setSelectedSize2)
                            }
                            className="block w-full rounded-md bg-amber-50/90 p-2 text-center text-neutral-800 transition-all duration-200 hover:bg-amber-100 focus:ring-2 focus:ring-amber-300"
                          >
                            <option className={`${shareTech.className}`} value="" disabled>
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
                      <label className={` ${shareTech.className} text-lg font-bold uppercase tracking-wide text-amber-50`}>
                        Quantity
                      </label>
                      <div className="flex w-full max-w-xs items-center rounded-lg bg-neutral-700/50 sm:w-1/2">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="rounded-l-lg bg-amber-50/80 px-4 py-2 text-xl font-bold text-neutral-900 transition-colors hover:bg-amber-200 active:bg-amber-300"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={quantity === 0 ? "" : quantity}
                          onChange={(e) =>
                            setQuantity(parseInt(e.target.value || "0"))
                          }
                          className="w-full border-x border-amber-50/10 bg-transparent p-2 text-center text-xl text-amber-50 focus:outline-none"
                          min="1"
                        />
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="rounded-r-lg bg-amber-50/80 px-4 py-2 text-xl font-bold text-neutral-900 transition-colors hover:bg-amber-200 active:bg-amber-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  {selectedMerch1Data && selectedMerch2Data && (
                    <div className="animate-fade-in mt-6 rounded-lg border border-amber-50/20 bg-gradient-to-r from-amber-900/20 to-neutral-800/30 p-4">
                      <h3 className={`${shareTech.className} mb-2 text-center text-xl font-bold uppercase tracking-wide text-amber-50`}>
                        Order Summary
                      </h3>
                      <div className="space-y-2 divide-y divide-amber-50/10">
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
                            <span className={`${shareTech.className} relative z-10`}>Buy Now</span>
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
                          <span className={`${shareTech.className} relative z-10`}>Buy</span>
                        </div>
                        <span className="absolute bottom-0 left-0 h-0 w-full bg-gradient-to-r from-amber-300 to-amber-200 transition-all duration-300 group-hover:h-full"></span>
                      </Link>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Combo Offer Image */}
            <div className="group relative mb-6 flex w-full items-center justify-center overflow-hidden rounded-xl">
              <Image
                src={`https://res.cloudinary.com/diqdg481x/image/upload/v1741457501/jyhxzwti4jvlui216cnw.png`}
                height={320}
                width={320}
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
