"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/utils";
import { api } from "@/trpc/react";
import SectionHeader from "@/components/common/section-header";
import { toast } from "sonner";
import CustomToast from "@/components/root/custom-toast";
import { CursorContext } from "@/context/cursor-context";
import { Share_Tech } from "next/font/google";
import StaggeredText from "@/components/home/staggered-text";
import Image from "next/image";
import Footer from "@/components/home/footer";
import Loader from "@/components/common/loader";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const CAPage = () => {
  const { CurrentUser, isLoading } = useCurrentUser();
  const router = useRouter();
  const { setIsHovered } = useContext(CursorContext);

  const createAmbassador = api.ambassador.acceptAmbassadorInvite.useMutation();

  const handleSubmit = () => {
    if (!(CurrentUser && CurrentUser.id !== "")) {
      toast.custom(
        (t) => (
          <CustomToast variant={"error"} metadata={t}>
            You need to have an account to become a campus ambassador.
          </CustomToast>
        ),
        { position: "top-center" },
      );
      router.push("/sign-in");
      return;
    }
    if (CurrentUser.role === "ambassador") {
      router.push("/profile");
      return;
    }
    const token =
      CurrentUser?.name.slice(0, 4) +
      CurrentUser?.id.slice(-4) +
      Math.floor(parseFloat(Math.random().toPrecision(3)) * 1000);
    createAmbassador.mutate(
      { userId: CurrentUser?.id ?? "", token: token },
      {
        onSuccess: () => {
          router.push("/profile");
        },
      },
    );
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <SectionHeader title={"Campus Ambassador"}>
        promote our fest and get exciting perks
      </SectionHeader>
      <div className="p-12">
        {CurrentUser && CurrentUser.role !== "ambassador" ? (
          <button
            className="w-full cursor-none bg-green-400/[0.1] px-12 py-5 text-center text-xl font-normal uppercase text-emerald-300 transition-all hover:bg-green-400/[0.3]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleSubmit}
          >
            Click here to become a campus ambassador
          </button>
        ) : (
          <div className="w-full bg-green-400/[0.1] px-12 py-5 text-center text-xl font-normal uppercase text-emerald-300">
            You are already a campus ambassador.
          </div>
        )}
      </div>
      <div className={`mx-auto flex max-w-screen-2xl flex-row gap-5 p-12`}>
        <div>
          <StaggeredText>About the program</StaggeredText>
          <div className={` ${sharetech.className} text-lg tracking-tight`}>
            The Campus Ambassador (CA) Program is a unique opportunity for
            students to represent and promote IIT Mandi’s biggest tech fest,
            Xpecto, in their colleges. As a CA, you will be the bridge between
            Xpecto and your campus, ensuring maximum participation while
            building leadership skills, connecting with tech enthusiasts, and
            gaining event coordination experience. Plus, you get amazing perks
            and exclusive access to premium events!
            <br /> <br />
            Campus Ambassadors facilitating student participation from their
            college will receive exclusive benefits based on the number of
            participants they bring. Additionally, all ambassadors will be
            awarded a Certificate of Participation, which can be showcased on
            their resume.
          </div>
        </div>
        <Image
          src={
            "https://res.cloudinary.com/diqdg481x/image/upload/v1739198961/images/iitmandi_negative.jpg"
          }
          width={600}
          height={600}
          alt={"Campus ambassador pic"}
          className="aspect-square w-[400px] shrink-0 object-cover"
        />
      </div>
      <div className="grid w-full grid-cols-3">
        <div className="flex flex-col items-center border border-amber-50 bg-neutral-950 p-5 py-12">
          <div className="text-6xl font-semibold uppercase">premium</div>
          <div className="text-2xl font-normal uppercase text-neutral-500">
            16 - 23 invited
          </div>
          <ul
            className={`list-decimal pt-5 ${sharetech.className} text-lg tracking-tight`}
          >
            <li>3-Day Food Pass</li>
            <li>
              Hospitality Kit (includes a travel brochure, campus map, and
              wristband)
            </li>
            <li>Exciting Merchandise & Special Pronites Access</li>
            <li>Upgrade for ₹299: Get an Exclusive Xpecto T-Shirt</li>
          </ul>
        </div>
        <div className="flex flex-col items-center border border-amber-50 bg-neutral-950 p-5 py-12">
          <div className="text-6xl font-semibold uppercase">silver</div>
          <div className="text-2xl font-normal uppercase text-neutral-500">
            24 - 31 invited
          </div>
          <ul
            className={`list-decimal pt-5 ${sharetech.className} text-lg tracking-tight`}
          >
            Includes all Premium Membership benefits plus:
            <li>Official Xpecto T-Shirt</li>
            <li>1 Exclusive Workshop from our curated catalog</li>
            <li>IIT Mandi Goodies & Fest Merchandise</li>
          </ul>
        </div>
        <div className="flex flex-col items-center border border-amber-50 bg-neutral-950 p-5 py-12">
          <div className="text-6xl font-semibold uppercase">gold</div>
          <div className="text-2xl font-normal uppercase text-neutral-500">
            32+ invited
          </div>
          <ul
            className={`list-decimal pt-5 ${sharetech.className} text-lg tracking-tight`}
          >
            Includes all Silver Membership benefits plus:
            <li>2 Exclusive Workshops for deeper learning</li>
            <li>IIT Mandi&apos;s Exclusive Merchandise & Goodies</li>
            <li>Networking Session with IIT Mandi final-year students</li>
          </ul>
        </div>
      </div>
      <Footer onClick={handleSubmit} />
    </div>
  );
};

export default CAPage;
