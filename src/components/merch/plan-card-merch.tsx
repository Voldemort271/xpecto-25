"use client";

import React, { useContext } from "react";
import { $Enums, type Merch } from "@prisma/client";
import { Share_Tech } from "next/font/google";
import { CursorContext } from "@/context/cursor-context";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
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

const pre_order = true;

const MerchPlanCard = ({ data }: { data: Merch }) => {
  const { setIsHovered } = useContext(CursorContext);
  const [selectedSize, setSelectedSize] = useState<string>($Enums.Size.S);
  const [quantity, setQuantity] = useState("");
  const [selectedCombo, setSelectedCombo] = useState<string[]>([]);


  const handleComboChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newCombo = [...selectedCombo];
    newCombo[index] = e.target.value;
    setSelectedCombo(newCombo);
  };


  return (
    <div
      className="relative z-0 col-span-3 flex flex-col items-center justify-start px-5 py-12 md:col-span-1"
    >
      <div className="text-5xl font-semibold uppercase text-amber-50 p-4">
        {data.name}
      </div>

      <Carousel>
        <CarouselContent className="flex justify-left items-center">
          {data.images.map((img, i) => (
            <CarouselItem className="flex justify-center items-center" key={i}>
              <Image
                src={img}
                alt={`merchImage`}
                height={200}
                width={200}
                className="rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {pre_order && (
        <div className="text-2xl font-light uppercase text-neutral-600 line-through">
          ₹{data.price}
        </div>
      )}
      <div className="mb-5 w-full bg-green-700/[0.1] px-5 py-2.5 text-center text-4xl font-normal uppercase text-green-400">
        ₹{data.price - (pre_order ? 100 : 0)}
      </div>
      <div className="flex w-full flex-row">
        <div className="flex w-full gap-2 border-2">
          <div className="flex w-full items-center justify-center">
            <label
              className={`block p-2 text-center align-middle text-lg font-bold uppercase text-amber-50 ${shareTech.className} px-3 tracking-tight`}
            >
              Size
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className={`block h-full w-full bg-amber-50 text-center text-2xl text-neutral-800 ${shareTech.className} tracking-tight`}
            >
              {Object.keys($Enums.Size).map((a, i) => (
                <option key={i} className="bg-amber-50 text-neutral-800">
                  {a}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-full items-center justify-center gap-2">
            <label
              className={`p-2 text-lg font-bold uppercase text-amber-50 ${shareTech.className} tracking-tight`}
            >
              Quantity
            </label>
            <input
              placeholder="0"
              id="size"
              style={{ color: "black" }}
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={`${shareTech.className} block h-full w-full bg-amber-50 text-center text-2xl tracking-tight text-neutral-800`}
            />
          </div>
        </div>
      </div>
      {useUser().isSignedIn ? (
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
            price={data.price}
            merchId={data.id}
            eventId={"universaleve"}
            size={selectedSize}
            quantity={quantity && quantity !== "" ? parseInt(quantity) : 0}
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
      {/* <div
        className={`whitespace-pre-wrap py-5 ${shareTech.className} text-lg tracking-tight w-full`}
      >
        {data.desc}
      </div> */}
    </div>
  );
};

export default MerchPlanCard;
