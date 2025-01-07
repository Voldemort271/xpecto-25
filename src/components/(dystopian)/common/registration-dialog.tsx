import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { api } from "@/trpc/react";
import { useCurrentUser } from "@/lib/utils";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import { Handjet, Share_Tech } from "next/font/google";
import { toast } from "sonner";

// import Razorpay from "razorpay";

const handjet = Handjet({ subsets: ["latin"] });
const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

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

  const { data: plan } = api.event.checkUserRegisteration.useQuery(
    {
      userId: CurrentUser?.id ?? "",
      eventId: eventId,
    },
    { enabled: !!CurrentUser && !!eventId },
  );

  // const createOrder = api.event.createOrder.useMutation();
  // const verifyPayment = api.event.verifyPayment.useMutation();
  const userAddToEvent = api.event.addUserToEvent.useMutation();


  const handleSuccess = (paymentId?: string) => {
    if (!paymentId) {
      paymentId = "free";
    }
    if (CurrentUser) {
      userAddToEvent.mutate(
        {
          paymentId: paymentId,
          userId: CurrentUser.id,
          regPlanId: regPlanId,
          eventId: eventId,
        },
        {
          onSuccess: () => {
            toast.success("Registration successful!");
            window.location.reload();
          },
          onError: () => {
            toast.error(
              "Either you are registering again for the same event or an error occurred while registering you for the event. Your payment was successful. Please contact the organizer if you have made two payments.", {duration: 5500,}
            );
          },
        },
      );
    }
    console.log("CurrentUser :", CurrentUser );
    console.log("Mutation Inputs:", {
      paymentId: "free",
      userId: CurrentUser ?.id,
      regPlanId,
      eventId,
    });
  };

  const handlePay = async () => {
    if (!CurrentUser) {
      return;
    }

    // I should check if user has already registered for the event
    if (plan) {
      toast.error("You have already registered for this event.");
      return;
    }

    if (price === 0) {
      handleSuccess();
      return;
    }
    handleSuccess(); // Delete after testing done
    // try {
    //   // Create a Razorpay order
    //   const { orderId } = await createOrder.mutateAsync({
    //     amount: price,
    //   });

    //   const options = {
    //     key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    //     amount: price * 100,
    //     currency: "INR",
    //     name: "Your Event Name",
    //     description: "Event Registration Fee",
    //     order_id: orderId,
    //     handler: async (response: any) => {
    //       // Verify the payment
    //       const verificationResponse = await verifyPayment.mutateAsync({
    //         razorpayPaymentId: response.payment_id,
    //         razorpayOrderId: response.order_id,
    //         razorpaySignature: response.signature,
    //       });

    //       if (verificationResponse.success) {
    //         handleSuccess(payment_id);
    //       } else {
    //         alert("Payment verification failed.");
    //       }
    //     },
    //     prefill: {
    //       name: "John Doe",
    //       email: "john.doe@example.com",
    //       contact: "9876543210",
    //     },
    //     theme: {
    //       color: "#3399cc",
    //     },
    //   };

    //   const razorpay = new (window as any).Razorpay(options);
    //   razorpay.open();
    // } catch (error) {
    //   console.error("Payment error:", error);
    //   alert("An error occurred during the payment process.");
    // }
  };

  return (
    CurrentUser && (
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
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
          <div className="my-4">{content}</div>
          <div className="flex flex-col items-stretch justify-between sm:flex-row">
            <div className={`px-5 py-2 text-xl font-normal uppercase`}>
              Total charges: Rs <span className="text-4xl">{price}</span>
            </div>
            <DialogFooter>
              <button
                onClick={handlePay}
                className="bg-amber-50/[0.7] px-5 py-2 text-2xl font-normal uppercase text-neutral-900"
              >
                Confirm Registration
              </button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    )
  );
};

export default RegisterDialog;
