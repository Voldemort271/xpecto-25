"use client";
import React, { useContext, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";
import CustomToast from "@/components/root/custom-toast";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Share_Tech } from "next/font/google";
import { CursorContext } from "@/context/cursor-context";
import Link from "next/link";
import Loader from "@/components/common/loader";
import { $Enums } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import sizeChart from "public/images/size_chart.jpeg";
import { Select } from "@/components/ui/select";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const Page = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  const { setIsHovered } = useContext(CursorContext);

  const { CurrentUser, setCurrentUser } = useCurrentUser();

  const { data: ambassador, isLoading } = api.ambassador.getAmbassador.useQuery(
    {
      userId: CurrentUser?.id ?? "",
    },
  );

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(
    CurrentUser?.contact?.replace(/\D/g, "") ?? "",
  );
  const [collegeName, setCollegeName] = useState(
    CurrentUser?.college_name ?? "",
  );
  const [selectedSize, setSelectedSize] = useState(
    CurrentUser?.size ?? $Enums.Size.M,
  );

  const { mutate: updateUser, isPending: isUpdating } =
    api.user.updateUser.useMutation({
      onSuccess: (updatedUser) => {
        if (setCurrentUser) {
          setCurrentUser(updatedUser);
        }
        setIsEditingProfile(false);
        toast.custom(
          (t) => (
            <CustomToast variant={"success"} metadata={t}>
              Profile updated successfully!
            </CustomToast>
          ),
          {
            position: "top-center",
          },
        );
      },
      onError: (error) => {
        toast.custom(
          (t) => (
            <CustomToast variant={"error"} metadata={t}>
              Error updating profile: {error.message}
            </CustomToast>
          ),
          {
            position: "top-center",
          },
        );
      },
    });

  const handleSignOut = async () => {
    try {
      if (!CurrentUser) {
        toast.custom(
          (t) => (
            <CustomToast variant={"error"} metadata={t}>
              No user data found
            </CustomToast>
          ),
          {
            position: "top-center",
          },
        );

        router.push("/sign-in");
      }
      if (!setCurrentUser) {
        toast.custom(
          (t) => (
            <CustomToast variant={"error"} metadata={t}>
              No setter function found
            </CustomToast>
          ),
          {
            position: "top-center",
          },
        );

        router.push("/");
        return;
      }
      await signOut();
      // Reset the shared context to its default state

      setCurrentUser({
        name: "",
        email: "",
        college_name: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        id: "",
        role: "",
        POCId: null,
        accomodation: false,
        contact: "",
        size: $Enums.Size.M,
      });
      toast.custom(
        (t) => (
          <CustomToast variant={"info"} metadata={t}>
            Signed Out Successfully
          </CustomToast>
        ),
        {
          position: "top-center",
        },
      );
    } catch (error) {
      toast.custom(
        (t) => (
          <CustomToast variant={"error"} metadata={t}>
            Error signing out
          </CustomToast>
        ),
        {
          position: "top-center",
        },
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!CurrentUser?.id) {
      toast.custom(
        (t) => (
          <CustomToast variant={"error"} metadata={t}>
            User not found
          </CustomToast>
        ),
        {
          position: "top-center",
        },
      );
      return;
    }
    if (collegeName === "Indian Institute of Technology, Mandi") {
      toast.custom(
        (t) => (
          <CustomToast variant={"error"} metadata={t}>
            IIT Mandi peeps, login through college ID to avail benefits
          </CustomToast>
        ),
        {
          position: "top-center",
        },
      );
      return;
    }

    updateUser({
      userId: CurrentUser.id,
      contact: phoneNumber,
      college_name: collegeName,
    });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(e.target.value as $Enums.Size);
    updateUser({
      userId: CurrentUser?.id ?? "",
      size: e.target.value as $Enums.Size,
    });
  };

  return (
    <div>
      {isLoading ? (
        <div className="absolute left-0 top-0">
          <Loader loadingText="Loading Profile ..." />
        </div>
      ) : (
        <>
          <div
            className="w-fit cursor-none bg-red-500/[0.1] px-5 py-2 text-xl font-light uppercase text-red-300 backdrop-blur-2xl"
            onClick={() => router.back()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            &lt;&lt; go back
          </div>
          <div className="border-2 border-amber-50/[0.5] bg-neutral-950 p-12 md:min-w-[600px] lg:min-w-[1000px]">
            {CurrentUser && CurrentUser.id !== "" && (
              <div>
                {(!CurrentUser.contact || !CurrentUser.college_name) &&
                  !isEditingProfile && (
                    <button
                      className="mb-4 w-fit cursor-none bg-amber-500/10 px-5 py-2 text-xl font-normal uppercase text-amber-300"
                      onClick={() => setIsEditingProfile(true)}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      Update Profile Information
                    </button>
                  )}

                {isEditingProfile && (
                  <form onSubmit={handleSubmit} className="mb-5 space-y-4">
                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-amber-50"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /\D/g,
                            "",
                          );
                          setPhoneNumber(numericValue.slice(0, 10));
                        }}
                        pattern="[0-9]*"
                        maxLength={10}
                        placeholder="Enter phone number"
                        className="mt-1 w-full rounded-md border border-amber-50/50 bg-neutral-900 px-3 py-2 text-amber-50 placeholder:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                        title="Please enter only numbers (0-9)"
                      />
                    </div>
                    {!CurrentUser.college_name && (
                      <div>
                        <label
                          htmlFor="collegeName"
                          className="block text-sm font-medium text-amber-50"
                        >
                          College Name
                        </label>
                        <input
                          type="text"
                          id="collegeName"
                          value={collegeName}
                          onChange={(e) => setCollegeName(e.target.value)}
                          placeholder="Enter college name"
                          className="mt-1 w-full rounded-md border border-amber-50/50 bg-neutral-900 px-3 py-2 text-amber-50 placeholder:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={isUpdating}
                        className="w-fit cursor-none bg-amber-500/10 px-5 py-2 text-xl font-normal uppercase text-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        {isUpdating ? "Updating..." : "Save Changes"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="w-fit cursor-none bg-red-500/10 px-5 py-2 text-xl font-normal uppercase text-red-300"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2.5">
                  <div className="text-4xl font-medium uppercase sm:text-6xl">
                    {CurrentUser.name}
                  </div>
                  <div
                    className={`mb-2.5 w-fit text-lg sm:mb-0 ${sharetech.className} rounded-full bg-neutral-600 px-5 uppercase tracking-tight`}
                  >
                    {CurrentUser.role}
                  </div>
                </div>
                <div className={`${sharetech.className} mb-5 tracking-tight`}>
                  <div className="mb-2 text-sm text-neutral-600">
                    Account created on{" "}
                    {CurrentUser.createdAt.toLocaleDateString()}
                  </div>
                  <div className="mb-1 text-lg font-medium sm:text-xl">
                    Institution: {CurrentUser.college_name || "Not provided"}
                  </div>
                  <div className="mb-1 text-lg font-medium sm:text-xl">
                    Phone: {CurrentUser.contact || "Not provided"}
                  </div>
                  <div className="mb-1 text-lg font-medium sm:text-xl">
                    Email:{" "}
                    <Link
                      href={`mailto:${CurrentUser.email}`}
                      target={"_blank"}
                      className="cursor-none underline"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      {CurrentUser.email}
                    </Link>
                  </div>
                  <div className="flex items-center gap-4 py-4">
                    <div className="flex">
                      <div className="flex items-center mb-1 text-lg font-medium sm:text-xl w-full">Tee-Size:{" "}</div>
                      <select
                        value={selectedSize}
                        defaultValue={CurrentUser.size}
                        onChange={(e) => handleSizeChange(e)}
                        className={`${sharetech.className} block w-full rounded-md bg-amber-50/90 p-2 text-center text-neutral-800 transition-all duration-200 hover:bg-amber-100 focus:ring-2 focus:ring-amber-300`}
                      >
                        <option
                          className={`${sharetech.className}`}
                          value=""
                          disabled
                        >
                          Select size
                        </option>
                        {Object.keys($Enums.Size).map((size, i) => (
                          <option
                            key={i}
                            value={size}
                            className={` ${sharetech.className} bg-amber-50 text-neutral-800`}
                          >
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          className={`${sharetech.className} flex items-center space-x-1 rounded border border-amber-50/30 bg-amber-50/20 px-2 py-0.5 text-xs uppercase text-amber-50 transition-all hover:bg-amber-50/30 sm:text-sm`}
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
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
                            <rect
                              width="18"
                              height="18"
                              x="3"
                              y="3"
                              rx="2"
                              ry="2"
                            />
                            <line x1="3" y1="9" x2="21" y2="9" />
                            <line x1="9" y1="21" x2="9" y2="9" />
                            <path d="M3 9h18" />
                            <path d="M9 21V9" />
                          </svg>
                          Size Chart
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-xl border border-amber-50/20 bg-neutral-900/95 shadow-2xl">
                        <DialogHeader>
                          <DialogTitle
                            className={`${sharetech.className} text-2xl font-bold tracking-wide text-amber-50`}
                          >
                            Size Chart
                          </DialogTitle>
                          <DialogDescription
                            className={`${sharetech.className} text-amber-100/70`}
                          >
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

                        <div
                          className={` ${sharetech.className} mt-4 space-y-4 text-amber-50/80`}
                        >
                          Please measure yourself carefully before selecting a
                          size
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {CurrentUser.role === "ambassador" ? (
                  <div className="flex flex-col items-start gap-2 sm:flex-row sm:gap-5">
                    <div className="space-y-1">
                      <div className="bg-emerald-500/[0.1] px-5 py-2 text-xl font-normal uppercase text-green-300 sm:text-2xl">
                        Ambassador Token: {ambassador?.token ?? "none"}
                      </div>
                      <div
                        className={`text-lg ${sharetech.className} text-2xl font-normal tracking-tight text-amber-200`}
                      >
                        Current score: {ambassador?.contingents.length}
                      </div>
                    </div>
                    <button
                      className="w-fit cursor-none bg-emerald-500/[0.1] px-5 py-2 text-2xl font-normal uppercase text-green-300"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={() => router.push("/team/leaderboard")}
                    >
                      Leaderboard
                    </button>
                  </div>
                ) : (
                  <button
                    className="w-fit cursor-none bg-emerald-500/[0.1] px-5 py-2 text-2xl font-normal uppercase text-green-300"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => router.push("/ambassador")}
                  >
                    Register as campus ambassador
                  </button>
                )}
                <button
                  disabled={CurrentUser?.id === ""}
                  onClick={handleSignOut}
                  className="mt-4 w-fit cursor-none bg-red-500/[0.1] px-5 py-2 text-xl font-normal uppercase text-red-300 sm:text-2xl"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
          <div
            className={`flex w-full justify-end gap-2.5 ${sharetech.className} tracking-tight`}
          >
            <div
              className="w-fit cursor-none bg-sky-500/[0.1] px-5 py-1 text-base font-light uppercase text-indigo-300 backdrop-blur-2xl"
              onClick={() => router.push("/legal/terms")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              terms of service
            </div>
            <div
              className="w-fit cursor-none bg-sky-500/[0.1] px-5 py-1 text-base font-light uppercase text-indigo-300 backdrop-blur-2xl"
              onClick={() => router.push("/legal/privacy")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              privacy policy
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
