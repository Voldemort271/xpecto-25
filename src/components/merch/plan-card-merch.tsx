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
import shirt from "public/images/tshirt.jpeg";
import hoodie from "public/images/hoodie.jpeg";
const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

const MerchPlanCard = ({ data }: { data: Merch }) => {
  const { setIsHovered } = useContext(CursorContext);
  const [selectedSize, setSelectedSize] = useState<string>($Enums.Size.S);
  const [quantity, setQuantity] = useState("");

  return (
    <div
      className="relative z-0 col-span-3 flex flex-col items-center justify-start  px-5 py-12 md:col-span-1"
      style={{ width: "40rem" }}
    >
      <div className="text-7xl font-semibold uppercase text-amber-50">
        {data.name}
      </div>
      <div className="py-2">
        <Image
          src={data.name == "t-shirt" ? shirt : hoodie}
          alt={`merchImage`}
          height={500}
          width={500}
          className="rounded-lg"
        />
      </div>
      <div className="text-2xl font-light uppercase text-neutral-600 line-through">
        ₹{data.price + 500}
      </div>
      <div className="w-full bg-green-700/[0.1] px-5 py-2.5 mb-5 text-center text-4xl font-normal uppercase text-green-400">
        ₹{data.price}
      </div>
      <div className="flex flex-row w-full">
        <div className="flex gap-2 w-full border-2">
          <div className="flex items-center justify-center w-full">
            <label
              className={`p-2 text-lg font-bold uppercase block text-center align-middle text-amber-50 ${shareTech.className} tracking-tight px-3`}
            >
              Size
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className={`block w-full text-neutral-800 h-full bg-amber-50 text-2xl text-center ${shareTech.className} tracking-tight`}
            >
              {Object.keys($Enums.Size).map((a, i) => (
                <option key={i} className="bg-amber-50 text-neutral-800">{a}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-center w-full gap-2">
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
              className={`${shareTech.className} tracking-tight block w-full text-neutral-800 h-full bg-amber-50 text-2xl text-center`}
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
            className="justify-center self-end border-2 border-amber-50 bg-amber-50/[0.7] px-5 text-2xl uppercase text-neutral-900 hover:underline w-full"
          >
            buy
          </Link>
        </div>
      )}
      <div
        className={`whitespace-pre-wrap py-5 ${shareTech.className} text-lg tracking-tight w-full`}
      >
        {data.desc}
      </div>
    </div>
  );
};

export default MerchPlanCard;
