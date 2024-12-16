import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  teamName: string;
  collegeName: string;
  inviteLink: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    teamName,
    collegeName,
    inviteLink,
  }) => (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      <h1 style={{ color: '#4CAF50' }}>Welcome, {firstName}! {(collegeName !== "Individual" && collegeName !== "Others") ? `from ${collegeName}` : ""}</h1>
      <p>
        You have been invited to join the team <strong>{teamName}</strong> for Xpecto25 hosted by IIT Mandi.
      </p>
      <p>
        Click the link below to accept the invitation and join the team:
      </p>
      <p>
        <a
          href={`http://localhost:3000${inviteLink}`}
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            margin: '10px 0',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#4CAF50',
            textDecoration: 'none',
            borderRadius: '5px',
          }}
        >
          Accept Invitation
        </a>
      </p>
      <p>
        If you did not expect this invitation, you can safely ignore this email.
      </p>
      <p>Best regards,<br />The Team <strong>{teamName}</strong></p>
    </div>
  );
