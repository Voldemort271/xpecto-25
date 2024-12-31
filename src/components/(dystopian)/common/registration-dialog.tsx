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

// import Razorpay from "razorpay";

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
            alert("Registration successful!");
            window.location.reload();
          },
          onError: () => {
            alert(
              "Either you are registering again for the same event or an error occurred while registering you for the event. Your payment was successful. Please contact the organizer if it you have made two payments.",
            );
          },
        },
      );
    }
  };

  const handlePay = async () => {
    if (!CurrentUser) {
      return;
    }

    // I should check if user has already registered for the event
    if (plan) {
      alert("You have already registered for this event.");
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
        <DialogContent className="p-6">
          <DialogTitle>Event Registration</DialogTitle>
          <div className="mb-4">{content}</div>
          <div className="text-lg font-bold">Price: ${price}</div>
          <DialogFooter>
            <button
              onClick={handlePay}
              className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
            >
              Confirm Registration
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
};

export default RegisterDialog;
