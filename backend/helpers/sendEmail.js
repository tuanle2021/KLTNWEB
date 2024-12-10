const nodemailer = require("nodemailer");

const { MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD, MAIL_FROM_ADDRESS, MAIL_FROM_NAME } = process.env;

exports.sendEmail = async (email, name, url) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: `"${MAIL_FROM_NAME}" <${MAIL_FROM_ADDRESS}>`,
      to: email,
      subject: "UTE Ecommerce Email Verification",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    color: #333;
                }
                .email-container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #fff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .email-header {
                    background-color: #333;
                    padding: 20px;
                    text-align: center;
                    color: #fff;
                }
                .email-header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .email-body {
                    padding: 30px;
                }
                .email-body p {
                    font-size: 16px;
                    line-height: 1.5;
                    margin-bottom: 20px;
                }
                .email-body a {
                    display: inline-block;
                    padding: 12px 20px;
                    background-color: #28a745;
                    color: #fff;
                    text-decoration: none;
                    font-weight: bold;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                .email-footer {
                    background-color: #f4f4f4;
                    padding: 20px;
                    text-align: center;
                    font-size: 14px;
                    color: #777;
                }
                .email-footer a {
                    color: #333;
                    text-decoration: none;
                }
                .email-footer a:hover {
                    text-decoration: underline;
                }

                /* Media Queries for Laptop/Desktop Optimization */
                @media (min-width: 768px) {
                    body {
                        background-color: #e9ecef;
                    }
                    .email-container {
                        max-width: 800px;
                    }
                    .email-body {
                        padding: 40px;
                    }
                    .email-body a {
                        padding: 14px 28px;
                        font-size: 18px;
                    }
                    .email-footer {
                        font-size: 16px;
                    }
                }

                @media (min-width: 1024px) {
                    .email-container {
                        max-width: 900px;
                    }
                    .email-body {
                        padding: 50px;
                    }
                    .email-body a {
                        padding: 16px 32px;
                        font-size: 20px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <!-- Email Header -->
                <div class="email-header">
                    <h1>UTE Ecommerce</h1>
                </div>

                <!-- Email Body -->
                <div class="email-body">
                    <p>Hello ${name},</p>
                    <p>Thank you for registering with UTE Ecommerce. To complete your registration, please verify your email address by clicking the button below.</p>
                    <a href="${url}">Verify Your Email</a>
                    <p>If the button above doesn't work, you can copy and paste the following URL into your web browser:</p>
                    <p><a href="${url}">${url}</a></p>
                    <p>If you did not request this email, please ignore it. Your account will not be activated without your verification.</p>
                </div>

                <!-- Email Footer -->
                <div class="email-footer">
                    <p>&copy; 2024 UTE Ecommerce. All rights reserved.</p>
                    <p><a href="#">Contact Support</a> | <a href="#">Privacy Policy</a></p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    // Send email
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};