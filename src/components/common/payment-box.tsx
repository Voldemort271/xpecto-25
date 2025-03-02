import React, { useState } from "react";
import { DialogClose, DialogContent, DialogTitle } from "../ui/dialog";
import MarqueeContainer from "./marquee-container";
import styles from "@/styles/reg-dialog.module.css";
import { Handjet, Share_Tech } from "next/font/google";
import { api } from "@/trpc/react";
import { useCurrentUser } from "@/lib/utils";
import { toast } from "sonner";
import CustomToast from "@/components/root/custom-toast";
import { Input } from "../ui/input";
import Image from "next/image";
import Loader from "./loader";

const handjet = Handjet({ subsets: ["latin"] });
const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

const universalEvent = "universaleve";

interface PaymentBoxProps {
  regPlanId: string;
  eventId: string;
  price: number;
  setPaying?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentBox: React.FC<PaymentBoxProps> = ({
  regPlanId,
  eventId,
  price,
  setPaying,
}) => {
  const { CurrentUser } = useCurrentUser();
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [transactionID, setTransactionID] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = api.user.uploadImageToFolder.useMutation();
  const userAddToEvent = api.event.addUserToEvent.useMutation();

  const { data: isToken } = api.ambassador.findToken.useQuery({
    token: token,
  });

  const handleTransactionIDChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTransactionID(e.target.value);
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    if (file && file.size <= 1048576) {
      // 1MB = 1048576 bytes
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert("File size should be less than 1MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result); // Show preview before uploading
      }
    };
    reader.readAsDataURL(file);
  };

  const createReg = (
    paymentProof: string,
    verified: boolean,
    paymentId?: string,
    POC?: string,
  ) => {
    if (!CurrentUser) return;
    userAddToEvent.mutate(
      {
        paymentId: paymentId,
        userId: CurrentUser.id,
        regPlanId: regPlanId,
        eventId: eventId,
        paymentProof: paymentProof,
        email: CurrentUser.email,
        verified: verified,
        POC: POC,
        price: price,
      },
      {
        onSuccess: () => {
          if (verified) {
            toast.custom(
              (t) => (
                <CustomToast variant={"success"} metadata={t}>
                  Your Registration is done.
                </CustomToast>
              ),

              {
                position: "top-center",
                duration: 1000,
              },
            );
          } else {
            toast.custom(
              (t) => (
                <CustomToast variant={"success"} metadata={t}>
                  Your Payment has been sent for verification. Please check your
                  email for confirmation.
                </CustomToast>
              ),

              {
                position: "top-center",
                duration: 1000,
              },
            );
          }
          setLoading(false);
          window.location.reload();
        },
        onError: () => {
          toast.custom(
            (t) => (
              <CustomToast variant={"error"} metadata={t}>
                Your transactionId already exists or you are registering again
                for the same event or an an unseen error occurred while
                registering you for the event. Please contact the organizer if
                you have made a legit payment.
              </CustomToast>
            ),

            {
              position: "top-center",
              duration: 6000,
            },
          );
          setLoading(false);
        },
      },
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!CurrentUser) {
      toast.custom(
        (t) => (
          <CustomToast variant={"error"} metadata={t}>
            You need to be logged in to register for the event.
          </CustomToast>
        ),
        {
          position: "top-center",
          duration: 3000,
        },
      );
      return;
    }
    if (!image || !selectedFile || !transactionID) {
      toast.custom(
        (t) => (
          <CustomToast variant={"error"} metadata={t}>
            Please fill all the fields.
          </CustomToast>
        ),
        {
          position: "top-center",
          duration: 3000,
        },
      );
      return;
    }

    if (token !== "" && eventId === universalEvent) {
      if (!isToken) {
        toast.custom(
          (t) => (
            <CustomToast variant={"error"} metadata={t}>
              Invalid token. Please check the token and try again.
            </CustomToast>
          ),
          {
            position: "top-center",
            duration: 3000,
          },
        );
        return;
      }
    }

    try {
      setLoading(true);
      uploadImage.mutate(
        { base64: image, folderName: "payments" },
        {
          onSuccess: (e) => {
            if (!e.publicId) {
              toast.custom(
                (t) => (
                  <CustomToast variant={"error"} metadata={t}>
                    Error uploading image. Please try again.
                  </CustomToast>
                ),
                {
                  position: "top-center",
                  duration: 3000,
                },
              );
              return;
            }
            toast.custom(
              (t) => (
                <CustomToast variant={"success"} metadata={t}>
                  Image uploaded successfully!
                </CustomToast>
              ),
              {
                position: "top-center",
              },
            );
            setImage(e.url ?? null); // Show the final uploaded image
            setSelectedFile(null); // Reset file selection};
            createReg(e.publicId, false, transactionID, token);
          },
          onError: (e) => {
            console.error("Error uploading image:", e);
            toast.custom(
              (t) => (
                <CustomToast variant={"error"} metadata={t}>
                  Error uploading image. Please try again, or check your console
                  for more information.
                </CustomToast>
              ),
              {
                position: "top-center",
              },
            );
            setLoading(false);
          },
        },
      );
    } catch (err) {
      const typedErr = err as
        | { errors?: { longMessage: string }[] }
        | { message: string };
      const errorMessage =
        (typedErr as { errors?: { longMessage: string }[] }).errors?.[0]
          ?.longMessage ??
        (typedErr as { message: string }).message ??
        "An error occurred";
      toast.custom(
        (t) => (
          <CustomToast variant={"error"} metadata={t}>
            {errorMessage}
          </CustomToast>
        ),
        {
          position: "top-center",
        },
      );
      setLoading(false);
    }
  };

  return (
    <DialogContent
      className={`left-0 top-0 z-50 h-screen max-h-[800px] w-screen max-w-screen-sm -translate-x-0 -translate-y-0 overflow-y-scroll bg-neutral-900 px-0 text-amber-50 ${handjet.className}`}
    >
      <DialogTitle className="relative z-10 flex h-12 w-full cursor-none items-center overflow-clip border-b-2 border-amber-50/[0.7] bg-neutral-900 text-2xl font-normal uppercase tracking-wider text-amber-50">
        <MarqueeContainer
          text={[
            "register for event",
            "register for event",
            "register for event",
          ]}
        />
      </DialogTitle>
      {loading && (
        <div className="fixed z-50 h-full w-full bg-black">
          <Loader
            loadingText={`DO NOT CLOSE THIS WINDOW! The page reloads automatically after submission. PLEASE WAIT!`}
          />
        </div>
      )}
      <div className={`sm:p-4 ${shareTech.className} tracking-tight`}>
        <DialogClose asChild>
          <button
            className={`bg-red-400/[0.1] px-5 py-2 text-xl font-light uppercase text-red-200 ${handjet.className} tracking-wider`}
            onClick={() => setPaying && setPaying(false)}
          >
            &lt;&lt; cancel payment
          </button>
        </DialogClose>

        <form className="border-amber-50 p-2 sm:border-2 md:p-5">
          <div className="mb-5 flex flex-col gap-1 text-base sm:text-lg">
            <label
              className="font-bold uppercase text-amber-50"
              htmlFor="image"
            >
              Upload image (max 1MB) of payment*
            </label>
            <div className={styles.inputContainer}>
              <input
                type="file"
                className={styles.input}
                accept="image/*"
                id="image"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="mb-1 block text-lg font-bold uppercase text-amber-50"
              htmlFor="transactionID"
            >
              Transaction ID*
            </label>
            <Input
              type="text"
              id="transactionID"
              value={transactionID}
              onChange={handleTransactionIDChange}
              className="block w-full rounded-none p-2 text-amber-50"
            />
            <div className="mt-2 text-neutral-400">
              (You are supposed to give the main transactionID. If paying via
              UPI, give the UPI transaction ID or the UTR.)
            </div>
            {eventId === universalEvent && (
              <>
                <label
                  className="mb-1 mt-2 block text-lg font-bold uppercase text-amber-50"
                  htmlFor="transactionID"
                >
                  Ambassador token (Optional)
                </label>
                <Input
                  type="text"
                  id="token"
                  value={token}
                  onChange={handleTokenChange}
                  className="block w-full rounded-none p-2 text-amber-50"
                />
                <div className="mt-2 text-neutral-400">
                  (You are supposed to give the token of the ambassador you have
                  been referred from. (for the sake of special goodies))
                </div>
              </>
            )}
          </div>
          <div className="mb-4">
            <div className={`py-4 text-xl font-normal uppercase`}>
              Pay: <span className="text-4xl">₹{price}</span>
            </div>
            <label className="mb-2 text-lg font-bold uppercase text-amber-50">
              Scan to Pay via UPI
            </label>
            <Image
              src="/images/bank_qr.jpg"
              alt="QR Code"
              className="mx-auto mb-2 block h-32 w-32"
              width={200}
              height={200}
            />
            <p className="text-center text-amber-50">
              UPI ID : 8628963924m@pnb <br />
              Bank Details: <br />
              Account Name: Space Technology and Astronomy Club <br />
              Account Number: 7315000100034536 <br />
              IFSC Code: PUNB0731500 <br />
              Branch Name: IIT Kamand, Tehsil Sadar, Mandi Himachal Pradesh
            </p>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className={`bg-green-400/[0.1] px-5 py-2 text-xl font-light uppercase text-emerald-200 ${handjet.className} tracking-wider`}
          >
            &lt;&lt; Submit &gt;&gt;
          </button>
        </form>
      </div>
    </DialogContent>
  );
};

export default PaymentBox;
