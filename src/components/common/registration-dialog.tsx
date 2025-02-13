import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MarqueeContainer from "@/components/common/marquee-container";
import PaymentBox from "./payment-box";
import { api } from "@/trpc/react";
import { useCurrentUser } from "@/lib/utils";
import { toast } from "sonner";
import CustomToast from "../root/custom-toast";
import { Handjet } from "next/font/google";

interface RegisterDialogProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  price: number;
  regPlanId: string;
  eventId: string;
}

const handjet = Handjet({ subsets: ["latin"] });

const RegisterDialog: React.FC<RegisterDialogProps> = ({
  trigger,
  content,
  price,
  regPlanId,
  eventId,
}) => {
  const [paying, setPaying] = useState(false);
  const { CurrentUser } = useCurrentUser();
  const userAddToEvent = api.event.addUserToEvent.useMutation();

  const createAFreeReg = () => {
    if (!CurrentUser) return;
    userAddToEvent.mutate(
      {
        userId: CurrentUser.id,
        regPlanId: regPlanId,
        eventId: eventId,
        paymentProof: "",
        email: CurrentUser.email,
        verified: true,
      },
      {
        onSuccess: () => {
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
          window.location.reload();
        },
        onError: () => {
          toast.custom(
            (t) => (
              <CustomToast variant={"error"} metadata={t}>
                Either you are registering again for the same event or an an
                unseen error occurred while registering you for the event.
                Please contact the organizer if you have made a legit payment.
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

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {paying ? (
        <PaymentBox regPlanId={regPlanId} eventId={eventId} price={price} setPaying={setPaying} />
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
                    createAFreeReg();
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
  );
};

export default RegisterDialog;
