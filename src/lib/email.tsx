import { Resend } from "resend";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);
const xpectoEmail = "info@xpecto.org";
const xpectoWebsite = "https://www.xpecto.org";

interface MailtoProps {
  email: string;
  subject?: string;
  body?: string;
  children: React.ReactNode;
}

const Mailto: React.FC<MailtoProps> = ({
  email,
  subject = "",
  body = "",
  children,
}) => {
  let params = subject || body ? "?" : "";
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

  return <a href={`mailto:${email}${params}`}>{children}</a>;
};

export async function sendPaymentVerifyingEmail(
  email: string,
  transactionID: string,
  amount: number,
) {
  try {
    const { data } = await resend.emails.send({
      from: "XPECTO <no-reply@xpecto.org>",
      to: [email],
      subject: "Payment Sent for Verification - XPECTO'25",
      react: (
        <div>
          <p>Greetings,</p>
          <p>Thankyou for registering for XPECTO’25, IIT Mandi.</p>
          <div>
            <p>These were the details we recieved from your side:</p>
            <ul>
              <li>Transaction ID: {transactionID}</li>
              <li>Amount: ₹{amount}</li>
            </ul>
          </div>
          <p>
            Your payment is currently under verification and will be processed
            within 72 hours. You will receive a confirmation email once the
            verification is complete.
          </p>
          <p>
            For any concerns, feel free to contact us at{" "}
            <Mailto email={xpectoEmail}>{xpectoEmail}</Mailto>
          </p>
          <p>
            Thank you for your patience. We look forward to seeing you at
            XPECTO’25! 🚀{" "}
          </p>
          <p>
            Best Regards, <br /> Team XPECTO
          </p>
        </div>
      ),
    });

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
}

export async function sendRegistrationConfirmationEmail(
  email: string,
  event: string,
) {
  try {
    const { data } = await resend.emails.send({
      from: "XPECTO <no-reply@xpecto.org>",
      to: [email],
      subject: "Registration Confirmed for XPECTO'25",
      react: (
        <div>
          <p>Greetings,</p>
          <p>Thankyou for registering for XPECTO’25, IIT Mandi</p>
          <p>
            Your payment has been successfully verified and your registration{" "}
            {event !== "Universal Offline Event" ? `in the event ${event}` : ""}
            for XPECTO’25 is confirmed.🎉
          </p>
          {event !== "Universal Offline Event" ? (
            <p>
              You are all set to now visit the{" "}
              <a href={xpectoWebsite}>website</a> and access the event {event}.
            </p>
          ) : (
            <p>
              Since you chose the red pill, you are all set to explore the
              Glitch in Time at our <a href={xpectoWebsite}>website</a>.
            </p>
          )}
          <p>
            For any queries, feel free to drop an email at{" "}
            <Mailto email={xpectoEmail}>{xpectoEmail}</Mailto>
          </p>
          <p>We look forward to your participation in XPECTO’25!</p>
          <p>
            Best of Luck! <br /> Team XPECTO
          </p>
        </div>
      ),
    });

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
}

export async function sendPaymentRejectionEmail(email: string, reason: string, event: string) {
  try {
    const { data } = await resend.emails.send({
      from: "XPECTO <no-reply@xpecto.org>",
      to: [email],
      subject: "Transaction Failed - XPECTO’25 Registration Not Confirmed",
      react: (
        <div>
          <p>Dear Participant,</p>
          <p>
            Thank you for attempting to register for XPECTO’25, IIT Mandi{event !== "Universal Offline Event" ? ` in the event ${event}` : ""}.
            Unfortunately, it appears that your payment faced a ‘Glitch’ due to
            which your registration remains incomplete.
          </p>
          <p>{reason}</p>
          <p>
            If the amount has been deducted from your account, please reach out
            to us for assistance.
          </p>
          <p>
            For support, contact us at{" "}
            <Mailto email={xpectoEmail}>{xpectoEmail}</Mailto>.
          </p>
          <p>Team Xpecto</p>
        </div>
      ),
    });

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
}

//for merch

export async function sendMerchPaymentVerifyingEmail(
  email: string,
  transactionID: string,
  amount: number,
) {
  try {

    const { data } = await resend.emails.send({
      from: "XPECTO <no-reply@xpecto.org>",
      to: [email],
      subject: "Payment Sent for Verification - XPECTO'25",
      react: (
        <div>
          <p>Greetings,</p>
          <p>Thankyou for purchasing for XPECTO’25 merchandise.</p>
          <div>
            <p>These were the details we recieved from your side:</p>
            <ul>
              <li>Transaction ID: {transactionID}</li>
              <li>Amount: ₹{amount}</li>
            </ul>
          </div>
          <p>
            Your payment is currently under verification and will be processed
            within 72 hours. You will receive a confirmation email once the
            verification is complete.
          </p>
          <p>
            For any concerns, feel free to contact us at{" "}
            <Mailto email={xpectoEmail}>{xpectoEmail}</Mailto>
          </p>
          <p>
            Thank you for your patience. We look forward to seeing you at
            XPECTO’25! 🚀{" "}
          </p>
          <p>
            Best Regards, <br /> Team XPECTO
          </p>
        </div>
      ),
    });

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
}

export async function sendMerchPaymentRejectionEmail(
  email: string,
  reason: string,
  merchName: string
) {
  try {
    const { data } = await resend.emails.send({
      from: "XPECTO <no-reply@xpecto.org>",
      to: [email],
      subject: "Transaction Failed - XPECTO’25 Merchandise Not Confirmed",
      react: (
        <div>
          <p>Dear Participant,</p>
          <p>
            Thank you for attempting to purchase merchandise of XPECTO’25, IIT Mandi
            Unfortunately, it appears that your payment for the merchandise {merchName} faced a ‘Glitch’ due to
            which your transaction remains incomplete.
          </p>
          <p>{reason}</p>
          <p>
            If the amount has been deducted from your account, please reach out
            to us for assistance.
          </p>
          <p>
            For support, contact us at{" "}
            <Mailto email={xpectoEmail}>{xpectoEmail}</Mailto>.
          </p>
          <p>Team Xpecto</p>
        </div>
      ),
    });

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
}

export async function sendMerchConfirmationEmail(
  email: string,
  merchName: string
) {
  try {
    const { data } = await resend.emails.send({
      from: "XPECTO <no-reply@xpecto.org>",
      to: [email],
      subject: "Merchandise Confirmed for XPECTO'25",
      react: (
        <div>
          <p>Greetings,</p>
          <p>Thank you for purchasing merchandise from XPECTO’25, IIT Mandi.</p>
          <p>Your payment has been successfully verified, and your order for the merchandise {merchName} is confirmed.🎉</p>
          (
            <p>
              Since you chose the red pill, you are all set to explore the
              Glitch in Time at our <a href={xpectoWebsite}>website</a>.
            </p>
          )
          <p>
            For any queries, feel free to drop an email at{" "}
            <Mailto email={xpectoEmail}>{xpectoEmail}</Mailto>
          </p>
          <p>We look forward to your participation in XPECTO’25!</p>
          <p>
            Best of Luck! <br /> Team XPECTO
          </p>
        </div>
      ),
    });

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
}

