"use client";

import React, { useContext, useState } from "react";
import { $Enums, type Merch } from "@prisma/client";
import { Share_Tech } from "next/font/google";
import { CursorContext } from "@/context/cursor-context";
import sizeChart from "public/images/size_chart.jpeg";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import MerchPaymentBox from "./payment-box-merch";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

const MerchPlanCard = ({ data }: { data: Merch }) => {
  const { setIsHovered } = useContext(CursorContext);
  const [selectedSize, setSelectedSize] = useState<string>($Enums.Size.S);
  const [quantity, setQuantity] = useState("");
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <div className="xs:ml-4 relative z-0 col-span-3 ml-9 p-4 max-sm:ml-2 sm:ml-6 md:col-span-1">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border-2 border-amber-50/30 bg-black/40 backdrop-blur-sm transition-all duration-300 hover:border-amber-50/70 hover:shadow-lg hover:shadow-amber-50/20">
        {/* Card Header */}
        <div className="border-b border-amber-50/20 bg-gradient-to-r from-amber-50/10 to-transparent p-4">
          <h2 className="text-center text-2xl font-bold uppercase tracking-wider text-amber-50 sm:text-3xl md:text-4xl">
            {data.name}
          </h2>
        </div>

        {/* Card Content */}
        <div className="flex flex-grow flex-col space-y-4 p-3 sm:space-y-6 sm:p-4">
          {/* Carousel */}
          <div className="relative mx-auto w-full max-w-sm px-4 sm:px-6 md:px-10">
            <Carousel className="w-full">
              <CarouselContent className="xs:h-44 h-40 sm:h-56 md:h-64">
                {data.images.map((img, i) => (
                  <CarouselItem
                    key={i}
                    className="flex items-center justify-center"
                  >
                    <div className="flex h-full w-full items-center justify-center p-1">
                      <Image
                        src={img}
                        alt={`${data.name} image ${i + 1}`}
                        height={200}
                        width={200}
                        className="max-h-full rounded-md object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Theme-aware Carousel navigation */}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <CarouselPrevious className="xs:h-6 xs:w-6 bg-background/80 hover:bg-background border-muted-foreground/20 ml-0.5 h-5 w-5 rounded-full shadow-sm transition-all duration-300 hover:shadow-md dark:text-white sm:h-7 sm:w-7 md:h-8 md:w-8" />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <CarouselNext className="xs:h-6 xs:w-6 bg-background/80 hover:bg-background border-muted-foreground/20 mr-0.5 h-5 w-5 rounded-full shadow-sm transition-all duration-300 hover:shadow-md dark:text-white sm:h-7 sm:w-7 md:h-8 md:w-8" />
              </div>
            </Carousel>
          </div>

          {/* Price Section */}
          <div className="space-y-1 text-center">
            <div className="text-lg font-light text-neutral-500 line-through sm:text-xl">
              ₹{data.price + 500}
            </div>
            <div className="mx-auto inline-block rounded-md border border-green-500/30 bg-green-700/20 px-3 py-1.5 sm:px-4 sm:py-2">
              <span className="text-2xl font-semibold text-green-400 sm:text-3xl">
                ₹{data.price}
              </span>
            </div>
          </div>

          {/* Size and Quantity Section */}
          <div className="mt-auto flex flex-col gap-2 sm:flex-row sm:gap-3">
            <div className="flex-1 overflow-hidden rounded border border-amber-50/30">
              <div className="flex flex-col">
                <div className="flex items-center justify-between bg-amber-50/10">
                  <label
                    className={`${shareTech.className} px-2 py-1 text-center text-xs font-bold uppercase text-amber-50 sm:px-3 sm:text-sm`}
                  >
                    Size
                  </label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className={`${shareTech.className} mr-1 flex items-center space-x-1 rounded border border-amber-50/30 bg-amber-50/20 px-2 py-0.5 text-xs uppercase text-amber-50 transition-all hover:bg-amber-50/30 sm:text-sm`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <span>Size Chart</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 sm:h-4 sm:w-4"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
                          <line x1="3" y1="9" x2="21" y2="9" />
                          <line x1="9" y1="21" x2="9" y2="9" />
                        </svg>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl border-amber-50/30 bg-black/90 backdrop-blur-md">
                      <DialogTitle
                        className={`${shareTech.className} text-center text-xl font-bold uppercase tracking-wider text-amber-50 sm:text-2xl`}
                      >
                        Size Chart
                      </DialogTitle>
                      <div className="overflow-hidden rounded-lg border border-amber-50/30 bg-black/60 p-3">
                        <Image
                          src={sizeChart}
                          alt="Size Chart"
                          width={600}
                          height={400}
                          className="mx-auto rounded-md object-contain"
                        />
                      </div>
                      <DialogDescription className="text-center text-sm text-amber-50/70">
                        Please measure yourself carefully before selecting a
                        size
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                </div>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className={`${shareTech.className} w-full appearance-none bg-amber-50 px-2 py-1 text-center text-base text-neutral-800 sm:text-lg`}
                >
                  {Object.keys($Enums.Size).map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex-1 overflow-hidden rounded border border-amber-50/30">
              <div className="flex flex-col">
                <label
                  className={`${shareTech.className} bg-amber-50/10 px-2 py-1 text-center text-xs font-bold uppercase text-amber-50 sm:px-3 sm:text-sm`}
                >
                  Quantity
                </label>
                <input
                  type="text"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className={`${shareTech.className} w-full bg-amber-50 px-2 py-1 text-center text-base text-neutral-800 sm:text-lg`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="p-3 pt-0 sm:p-4">
          {isSignedIn ? (
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="w-full rounded border border-amber-50 bg-gradient-to-r from-amber-50/80 to-amber-50/70 py-1.5 text-lg font-bold uppercase text-neutral-900 transition-all duration-300 hover:from-amber-50/90 hover:to-amber-50/80 hover:shadow-md sm:py-2 sm:text-xl"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Buy Now
                </button>
              </DialogTrigger>
              <MerchPaymentBox
                price={data.price}
                merchIds={[data.id]}
                sizes={[selectedSize]}
                quantity={quantity && quantity !== "" ? parseInt(quantity) : 0}
              />
            </Dialog>
          ) : (
            <Link
              href="/sign-in"
              className="block w-full rounded border border-amber-50 bg-gradient-to-r from-amber-50/80 to-amber-50/70 py-1.5 text-center text-lg font-bold uppercase text-neutral-900 transition-all duration-300 hover:from-amber-50/90 hover:to-amber-50/80 hover:shadow-md sm:py-2 sm:text-xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Buy
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// This component would be used to display multiple MerchPlanCards in a grid
export const MerchGrid = ({ merchItems }: { merchItems: Merch[] }) => {
  return (
    <div className="container mx-auto px-2 py-6 sm:px-4 sm:py-8">
      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {merchItems.map((item) => (
          <MerchPlanCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default MerchPlanCard;
