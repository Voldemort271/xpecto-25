import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { useCurrentUser } from "@/lib/utils";
import MarqueeContainer from "@/components/common/marquee-container";
import { Handjet, Share_Tech } from "next/font/google";
import { toast } from "sonner";
import CustomToast from "@/components/root/custom-toast";
import Image from "next/image";
import styles from "@/styles/reg-dialog.module.css";
import { Input } from "@/components/ui/input";

const handjet = Handjet({ subsets: ["latin"] });
const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

interface RegisterDialogProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  price: number;
  regPlanId: string;
  eventId: string;
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({
  trigger,
  content,
  price,
  regPlanId,
  eventId,
}) => {
  const { CurrentUser } = useCurrentUser();

  const [paying, setPaying] = useState(false);

  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [transactionID, setTransactionID] = useState("");
  const [isUploading, setIsUploading] = useState(false); //TODO: Use this to show a loading spinner while sending the image

  const uploadImage = api.user.uploadImageToFolder.useMutation();
  const userAddToEvent = api.event.addUserToEvent.useMutation();

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

  const createReg = (
    paymentProof: string,
    paymentId: string,
    verified: boolean,
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
          //TODO: Add sleep here if u think that pop up is not visible at all
          window.location.reload();
        },
        onError: () => {
          toast.custom(
            (t) => (
              <CustomToast variant={"error"} metadata={t}>
                Either you are registering again for the same event or an error
                occurred while registering you for the event. Your payment was
                successful. Please contact the organizer if you have made two
                payments.
              </CustomToast>
            ),

            {
              position: "top-center",
              duration: 6000,
            },
          );
        },
      },
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //TODO: Someone just convert all the alerts to toasts throughout the doc.
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

    setIsUploading(true);

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
            createReg(e.publicId, transactionID, false);
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
    } finally {
      setIsUploading(false);
    }
  };

  return (
    CurrentUser && (
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        {paying ? (
          <DialogContent
            className={`max-w-[800px] border-2 border-amber-50/[0.7] bg-neutral-900 p-0 text-amber-50 ${handjet.className} tracking-widest`}
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
            <div className={`p-4 ${shareTech.className} tracking-tight`}>
              <button
                onClick={() => setPaying(false)}
                className={`bg-red-400/[0.1] px-5 py-2 text-xl font-light uppercase text-red-200 ${handjet.className} tracking-wider`}
              >
                &lt;&lt; cancel payment
              </button>
              <form className="border-2 p-5">
                <div className="mb-5 flex flex-col gap-1 text-base sm:text-lg">
                  <label
                    className="font-bold uppercase text-amber-50"
                    htmlFor="image"
                  >
                    Upload image (max 1MB)
                  </label>
                  <div className={styles.inputContainer}>
                    <input
                      type="file"
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
                    Transaction ID
                  </label>
                  <Input
                    type="text"
                    id="transactionID"
                    value={transactionID}
                    onChange={handleTransactionIDChange}
                    className="block w-full rounded-none p-2 text-amber-50"
                  />
                  <div className="mt-2 text-neutral-400">
                    (You are supposed to give the main transactionID. If paying
                    via UPI, give the UPI transaction ID or the UTR.)
                  </div>
                </div>
                <div className="mb-4">
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
        ) : (
          <DialogContent
            className={`max-h-[600px] max-w-[800px] overflow-y-scroll border-2 border-amber-50/[0.7] bg-neutral-900 p-0 text-amber-50 ${handjet.className} tracking-widest`}
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
            <div className="my-4">{content}</div>
            <div className="flex flex-col items-stretch justify-between sm:flex-row">
              <div className={`px-5 py-2 text-xl font-normal uppercase`}>
                Total charges: Rs <span className="text-4xl">{price}</span>
              </div>
              <DialogFooter>
                <button
                  onClick={() => {
                    if (price !== 0) {
                      setPaying(true);
                    } else {
                      createReg("", "free", true);
                    }
                  }}
                  className="bg-amber-50/[0.7] px-5 py-2 text-2xl font-normal uppercase text-neutral-900"
                >
                  Confirm Registration
                </button>
              </DialogFooter>
            </div>
          </DialogContent>
        )}
      </Dialog>
    )
  );
};

export default RegisterDialog;
