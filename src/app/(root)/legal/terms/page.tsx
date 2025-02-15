"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { CursorContext } from "@/context/cursor-context";
import { useRouter } from "next/navigation";

const TermsPage = () => {
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
          Terms of service
        </div>
        <div className="mb-5 text-xl font-semibold tracking-tight text-neutral-600">
          Effective date: {new Date("2-9-2025").toLocaleDateString()}
        </div>
        {/* TODO: Change mail to info@xpecto.org */}
        <div className="w-full md:w-[600px] lg:w-[1000px]">
          <div className="text-xl">1. Acceptance of Terms</div>
          <p className="mb-2">
            By accessing and using Xpecto’s website{" "}
            <Link
              href={"https://www.xpecto.org"}
              target={"_blank"}
              className="cursor-none underline"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              (https://www.xpecto.org)
            </Link>
            , you agree to comply with these Terms of Service. If you disagree,
            please do not use the website.
          </p>
          <div className="text-xl">2. Use of the Website</div>
          <p className="mb-2">
            You may browse and register for events. You agree not to misuse the
            site (e.g., hacking, spreading malware, spamming). We may modify or
            remove content at our discretion.
          </p>
          <div className="text-xl">3. User-Generated Content</div>
          <p className="mb-2">
            If users can submit content (e.g., comments, registration details):
            You retain ownership of your content but grant us a license to use
            it for event-related purposes. You must not submit harmful, illegal,
            or offensive content.
          </p>
          <div className="text-xl">4. Google and Third-Party Services</div>
          <p className="mb-2">
            Our website may use third-party services (e.g., Google, payment
            gateways). Your use of these services is subject to their own terms
            and policies.
          </p>
          <div className="text-xl">5. Limitation of Liability</div>
          <p className="mb-2">
            We strive to provide accurate information but do not guarantee the
            site’s accuracy, availability, or security. We are not responsible
            for: Any data loss or security breaches. Third-party service
            failures. Any damages arising from your use of the website.
            Additionally, we do not take responsibility for: Payments that may
            be delayed, stuck, or not processed. Registrations that fail to
            reach us due to technical or other issues. By using this website,
            you acknowledge and accept these terms.
          </p>
          <div className="text-xl">6. Termination</div>
          <p className="mb-2">
            We may suspend or terminate your access to the website for
            violations of these terms.
          </p>
          <div className="text-xl">7. Changes to Terms</div>
          <p className="mb-2">
            We reserve the right to update these terms. Continued use of the
            site means you accept the changes.
          </p>
          <div className="text-xl">8. Contact Us</div>
          <p className="mb-2">
            For any questions, contact us at:{" "}
            <Link
              href={"mailto:technical_secretary@students.iitmandi.ac.in"}
              target={"_blank"}
              className="cursor-none underline"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              technical_secretary@students.iitmandi.ac.in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsPage;
