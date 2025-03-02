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
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(0);

  return (
    <div
      className="relative z-0 col-span-3 flex flex-col items-center justify-start border-x border-amber-50 px-5 py-12 md:col-span-1"
      style={{ width: "40rem" }}
    >
      <div className="text-7xl font-semibold uppercase text-amber-300">
        {data.name}
      </div>
      <div>
        <Image
          src={data.name == "t-shirt" ? shirt : hoodie}
          alt={`merchImage`}
          height={400}
          width={400}
        />
      </div>
      <div className="text-2xl font-light uppercase text-neutral-600 line-through">
        ₹{data.price + 500}
      </div>
      <div className="w-full bg-green-700/[0.1] px-5 py-2.5 text-center text-4xl font-normal uppercase text-green-400">
        ₹{data.price}
      </div>
      <div
        className={`whitespace-pre-wrap py-5 ${shareTech.className} pb-20 text-lg tracking-tight`}
      >
        {data.desc}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div>
          <div>
            <span
              className={`whitespace-pre-wrap py-5 ${shareTech.className} mr-10 pb-20 text-lg tracking-tight`}
            >
              Size
            </span>
            <select
              style={{ color: "black" }}
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {Object.keys($Enums.Size).map((a, i) => (
                <option key={i}>{a}</option>
              ))}
            </select>
          </div>
          <span>
            <span
              className={`whitespace-pre-wrap py-5 ${shareTech.className} mr-2.5 pb-20 text-lg tracking-tight`}
            >
              Quantity
            </span>
            <input
              placeholder="0"
              id="size"
              style={{ color: "black" }}
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </span>
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
            quantity={quantity}
          />
        </Dialog>
      ) : (
        <div style={{ marginTop: "2rem" }}>
          <Link
            href={"/sign-in"}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="justify-center self-end border-2 border-amber-50 bg-amber-50/[0.7] px-5 text-2xl uppercase text-neutral-900 hover:underline"
          >
            buy
          </Link>
        </div>
      )}
    </div>
  );
};

export default MerchPlanCard;
