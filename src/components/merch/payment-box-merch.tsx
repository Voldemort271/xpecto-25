import React, { useState } from "react";
import { DialogClose, DialogContent, DialogTitle } from "../ui/dialog";
import styles from "@/styles/reg-dialog.module.css";
import { Handjet, Share_Tech } from "next/font/google";
import { api } from "@/trpc/react";
import { useCurrentUser } from "@/lib/utils";
import { toast } from "sonner";
import CustomToast from "@/components/root/custom-toast";
import { Input } from "../ui/input";
import Image from "next/image";
import MarqueeContainer from "../common/marquee-container";
import Loader from "../common/loader";
import { Size } from "@prisma/client";

const handjet = Handjet({ subsets: ["latin"] });
const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

const universalEvent = "universaleve";

//TODO: Update Bank details and QR code

interface PaymentBoxProps {
  merchId: string;
  eventId: string;
  price: number;
  size: string;
  quantity: number;
  setPaying?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MerchPaymentBox: React.FC<PaymentBoxProps> = ({
  price,
  merchId,
  size,
  quantity,
  setPaying,
}) => {
  const { CurrentUser } = useCurrentUser();
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [transactionID, setTransactionID] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = api.user.uploadImageToFolder.useMutation();
  const merchOrder = api.merchOrder.updateMerchOrder.useMutation();

  const handleTransactionIDChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTransactionID(e.target.value);
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

  const createMerch = (
    paymentProof: string,
    verified: boolean,
    merchId: string,
    paymentId: string,
  ) => {
    if (!CurrentUser) return;
    merchOrder.mutate(
      {
        paymentId: paymentId,
        userId: CurrentUser.id,
        merchId: merchId,
        paymentProof: paymentProof,
        verified: verified,
        price: quantity * price,
        quantity: parseInt(quantity),
        size: size,
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
    setLoading(true);
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

    try {
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
            createMerch(e.publicId, false, merchId, transactionID);
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
      style={{ overflow: "scroll" }}
      className={`max-h-screen w-screen max-w-[800px] overflow-y-scroll border-2 border-amber-50/[0.7] bg-neutral-900 p-0 text-amber-50 sm:left-0 sm:top-0 sm:translate-x-0 sm:translate-y-0 ${handjet.className} overflow-y-clip tracking-widest`}
    >
      <DialogTitle className="relative z-10 flex h-12 w-full cursor-none items-center overflow-clip border-b-2 border-amber-50/[0.7] bg-neutral-900 text-2xl font-normal uppercase tracking-wider text-amber-50">
        <MarqueeContainer
          text={["Buy the merch", "Its so cool", "Buy the merch"]}
        />
      </DialogTitle>
      {loading && (
        <Loader
          loadingText={`DO NOT CLOSE THIS WINDOW! The page reloads automatically after submission. PLEASE WAIT!`}
        />
      )}
      <div className={`p-4 ${shareTech.className} tracking-tight`}>
        <DialogClose asChild>
          <button
            className={`bg-red-400/[0.1] px-5 py-2 text-xl font-light uppercase text-red-200 ${handjet.className} tracking-wider`}
            onClick={() => setPaying && setPaying(false)}
          >
            &lt;&lt; cancel payment
          </button>
        </DialogClose>

        <form className="border-2 p-5">
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
          </div>
          <div className="mb-4">
            <div style={{ display: "flex" }}>
              <div className={`mr-3 py-4 text-xl font-normal uppercase`}>
                Pay: <span className="text-4xl">₹{quantity * price}</span>
              </div>
              <div className={`mr-3 py-4 text-xl font-normal uppercase`}>
                Size Selected: <span className="text-4xl">{size}</span>
              </div>
              <div className={`mr-3 py-4 text-xl font-normal uppercase`}>
                Quantity: <span className="text-4xl">{quantity}</span>
              </div>
            </div>
            <label className="mb-2 text-lg font-bold uppercase text-amber-50">
              Scan to Pay via UPI
            </label>
            <Image
              src="/images/merchant_qr.png"
              alt="QR Code"
              className="mx-auto mb-2 block h-32 w-32"
              width={100}
              height={100}
            />
            <p className="text-center text-amber-50">
              Bank Details: <br />
              Account Name: Your Account Name <br />
              Account Number: 1234567890 <br />
              IFSC Code: ABCD0123456
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

export default MerchPaymentBox;
