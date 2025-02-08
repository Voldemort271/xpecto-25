import { Resend } from "resend";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);
const xpectoEmail = ""; //TODO: Someone write the xpecto email here after taking info fromvaibhav bhaiyya

export async function sendPaymentVerifyingEmail(email: string) {
  try {
    //TODO: someone can just enhance the html by adding the competition name in here in email. Also add logo of xpecto for pfp in email. For universal event specifically put in just xpecto. No event name
    //TODO: If possible add all the details of registeration here so that this email serves as a proof of what was sent by user to us
    const { data } = await resend.emails.send({
      from: "XPECTO <no-reply@xpecto.org>",
      to: [email],
      subject: "Payment sent for verification",
      react: (
        <div>
          <p>Thankyou for registering for xpecto 2025, IIT Mandi</p>
          <p>
            Your payment verification is in due progress and will be verified in
            about 72 hours and you will informed through email.
          </p>
          <p>In case of any queries, you can mail us back on {xpectoEmail}</p>
        </div>
      ),
    });

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
}

export async function sendRegistrationConfirmationEmail(email: string, event: string) {
  try {
    const { data } = await resend.emails.send({
      from: "XPECTO <no-reply@xpecto.org>",
      to: [email],
      subject: "Registration Successful for XPECTO 2025",
      react: (
        <div>
          <p>Thankyou for registering for xpecto 2025, IIT Mandi</p>
          <p>
            Your payment has been successfully verified and your registration {event !== 'Universal Offline Event' ? `in the event ${event}` : ""}, Xpecto 2025 was successful.
          </p>
          {event !== 'Universal Offline Event' ? <p>You can now visit the website and access the event {event}.</p> : <p>You can now visit the website and register for free in all the offline events.</p>}
          <p>In case of any queries, you can mail us back on {xpectoEmail}</p>
          <p>We look forward to seeing you at the event!</p>
        </div>
      ),
    });

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
}

export async function sendPaymentRejectionEmail(email: string, reason: string) {
  try {
    const { data } = await resend.emails.send({
      from: "XPECTO <no-reply@xpecto.org>",
      to: [email],
      subject: "Your Payment for registration in XPECTO 2025 was rejected",
      react: (
        <div>
          <p>Thankyou for trying to register for xpecto 2025, IIT Mandi. Unfortunately, your registration was unsuccessful.</p>
          <p>{reason}</p>
          <p>In case money has been debited from your account, contact us immediately on {xpectoEmail} for a refund</p>
        </div>
      ),
    });

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
}
