function OTPEmail({ name, otp, email }) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>EventHive - Verify Your Account</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                    color: #333333;
                    line-height: 1.6;
                    padding: 20px 0;
                }

                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: #ffffff;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                }

                .header {
                    background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
                    padding: 40px 30px;
                    text-align: center;
                    position: relative;
                }

                .header::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="30" r="1.5" fill="rgba(255,255,255,0.1)"/></svg>');
                    opacity: 0.3;
                }

                .logo {
                    color: #ffffff;
                    font-size: 32px;
                    font-weight: 800;
                    letter-spacing: -1px;
                    margin-bottom: 8px;
                    position: relative;
                    z-index: 1;
                }

                .tagline {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 14px;
                    font-weight: 500;
                    position: relative;
                    z-index: 1;
                }

                .content {
                    padding: 50px 40px;
                    background: #ffffff;
                }

                .greeting {
                    font-size: 20px;
                    font-weight: 700;
                    color: #1a1a1a;
                    margin-bottom: 24px;
                }

                .message {
                    font-size: 16px;
                    color: #4a5568;
                    margin-bottom: 32px;
                    line-height: 1.7;
                }

                .otp-section {
                    text-align: center;
                    margin: 40px 0;
                }

                .otp-label {
                    font-size: 14px;
                    font-weight: 600;
                    color: #dc2626;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 16px;
                }

                .otp-code {
                    display: inline-block;
                    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                    color: #ffffff;
                    font-size: 36px;
                    font-weight: 800;
                    font-family: 'Courier New', monospace;
                    padding: 20px 40px;
                    border-radius: 12px;
                    letter-spacing: 6px;
                    margin: 0 auto;
                    border: 2px solid #dc2626;
                    box-shadow: 0 8px 32px rgba(220, 38, 38, 0.2);
                }

                .otp-validity {
                    margin-top: 16px;
                    font-size: 14px;
                    color: #dc2626;
                    font-weight: 600;
                }

                .security-notice {
                    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
                    border: 1px solid #fecaca;
                    border-radius: 12px;
                    padding: 24px;
                    margin: 32px 0;
                }

                .security-notice h3 {
                    color: #dc2626;
                    font-size: 16px;
                    font-weight: 700;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .security-notice p {
                    color: #7f1d1d;
                    font-size: 14px;
                    margin-bottom: 8px;
                    line-height: 1.6;
                }

                .footer-content {
                    padding: 32px 40px;
                    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                    color: #ffffff;
                }

                .signature {
                    font-size: 16px;
                    margin-bottom: 24px;
                }

                .signature strong {
                    color: #dc2626;
                }

                .divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent 0%, #dc2626 50%, transparent 100%);
                    margin: 24px 0;
                }

                .footer-info {
                    text-align: center;
                    font-size: 13px;
                    color: #9ca3af;
                    line-height: 1.6;
                }

                .footer-info a {
                    color: #dc2626;
                    text-decoration: none;
                    font-weight: 500;
                }

                .footer-info a:hover {
                    text-decoration: underline;
                }

                .contact-info {
                    margin: 16px 0;
                    padding: 16px;
                    background: rgba(220, 38, 38, 0.1);
                    border-radius: 8px;
                    border: 1px solid rgba(220, 38, 38, 0.2);
                }

                .copyright {
                    margin-top: 20px;
                    font-size: 12px;
                    color: #6b7280;
                }

                /* Responsive Design */
                @media only screen and (max-width: 600px) {
                    .email-container {
                        margin: 0 10px;
                        border-radius: 12px;
                    }

                    .header {
                        padding: 30px 20px;
                    }

                    .logo {
                        font-size: 28px;
                    }

                    .content {
                        padding: 30px 20px;
                    }

                    .otp-code {
                        font-size: 28px;
                        padding: 16px 24px;
                        letter-spacing: 4px;
                    }

                    .footer-content {
                        padding: 24px 20px;
                    }
                }
            </style>
        </head>

        <body>
            <div class="email-container">
                <!-- Header -->
                <div class="header">
                    <div class="logo">EventHive</div>
                    <div class="tagline">Your Events, Perfectly Managed</div>
                </div>

                <!-- Main Content -->
                <div class="content">
                    <div class="greeting">Hello ${name}!</div>
                    
                    <div class="message">
                        We received a request to verify your EventHive account. To ensure the security of your account, 
                        please use the One-Time Password (OTP) below to complete your verification.
                    </div>

                    <div class="otp-section">
                        <div class="otp-label">Verification Code</div>
                        <div class="otp-code">${otp}</div>
                        <div class="otp-validity">Valid for 5 minutes only</div>
                    </div>

                    <div class="security-notice">
                        <h3>Security Notice</h3>
                        <p><strong>Never share this code with anyone.</strong> EventHive staff will never ask for your OTP.</p>
                        <p>If you didn't request this verification, please ignore this email and ensure your account is secure.</p>
                        <p>This code will expire in 5 minutes for your security.</p>
                    </div>
                </div>

                <!-- Footer -->
                <div class="footer-content">
                    <div class="signature">
                        Thank you for choosing <strong>EventHive</strong>!<br>
                        Best regards,<br>
                        The EventHive Team
                    </div>

                    <div class="divider"></div>

                    <div class="footer-info">
                        <p>This is an automated message. Please do not reply to this email.</p>
                        
                        <div class="contact-info">
                            <p>This email was sent to <a href="mailto:${email}">${email}</a></p>
                            <p>
                                <strong>EventHive</strong> | Panjab University<br>
                                Chandigarh - 160014, India
                            </p>
                            <p>Visit us at <a href="https://eventhive.in">eventhive.in</a></p>
                        </div>

                        <div class="copyright">
                            &copy; 2025 EventHive. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
}

module.exports = { OTPEmail };