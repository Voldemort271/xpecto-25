"use client";

import React, { useContext } from "react";
import { CursorContext } from "@/context/cursor-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PrivacyPage = () => {
  const { setIsHovered } = useContext(CursorContext);
  const router = useRouter();

  return (
    <>
      <div className="flex w-full justify-end">
        <div
          className="w-fit cursor-none bg-sky-500/[0.1] px-5 py-1 text-2xl font-light uppercase text-indigo-300 backdrop-blur-2xl"
          onClick={() => router.back()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          back
        </div>
      </div>
      <div className="m-5 mt-0 flex w-full flex-col items-center border-2 border-amber-50 bg-neutral-950 px-12 py-5">
        <div className="text-4xl font-bold tracking-tighter">
          Privacy Policy
        </div>
        <div className="mb-5 text-xl font-semibold tracking-tight text-neutral-600">
          Effective date: {new Date("2-9-2025").toLocaleDateString()}
        </div>
        <div className="w-full md:w-[600px] lg:w-[1000px]">
          <div className="text-xl">1. Introduction</div>
          <p className="mb-2">
            Welcome to Xpecto 2025. Your privacy is important to us, and this
            Privacy Policy explains how we collect, use, and protect your
            information when you visit our website{" "}
            <Link
              href={"https://www.xpecto.org"}
              target={"_blank"}
              className="cursor-none underline"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              (https://www.xpecto.org)
            </Link>
          </p>
          <div className="text-xl">2. Information</div>
          <p className="mb-2">
            We Collect We may collect: Personal Information: Name, email, phone
            number (if provided voluntarily). Usage Data: IP address, browser
            type, pages visited, and time spent on our site. Cookies and
            Tracking Technologies: To enhance user experience and analytics.
          </p>
          <div className="text-xl">3. How We Use Your Information</div>
          <p className="mb-2">
            We use the collected data for: Running and improving our website.
            Managing event registrations and communication. Analyzing site
            traffic and improving user experience. Complying with legal and
            regulatory requirements.
          </p>
          <div className="text-xl">4. Data Sharing and Protection</div>
          <p className="mb-2">
            We do not sell or share your data with third parties except: When
            required by law. To integrate with third-party services (e.g.,
            Google, for login or analytics). For website functionality (e.g.,
            hosting services, payment gateways). We implement security measures
            to protect your information, but no online service is 100% secure.
          </p>
          <div className="text-xl">
            5. Google Services and Third-Party Links
          </div>
          <p className="mb-2">
            We may use Google services (e.g., Google Sign-In, Google Analytics).
            These services follow their own privacy policies. Please review{" "}
            <Link
              href={"https://policies.google.com/privacy?hl=en-US"}
              target={"_blank"}
              className="cursor-none underline"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Google’s Privacy Policy
            </Link>
          </p>
          <div className="text-xl">6. Your Choices and Rights</div>
          <p className="mb-2">
            You can: Opt out of cookies (check your browser settings). Request
            data deletion (contact us). Disable Google tracking via Google Ad
            Settings.
          </p>
          <div className="text-xl">7. Changes to This Policy</div>
          <p className="mb-2">
            We may update this policy from time to time. The latest version will
            always be available on our website.
          </p>
          <div className="text-xl">8. Contact Us</div>
          <p className="mb-2">
            For questions regarding this Privacy Policy, contact us at:{" "}
            <Link
              href={"mailto:info@xpecto.org"}
              target={"_blank"}
              className="cursor-none underline"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              info@xpecto.org
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;
