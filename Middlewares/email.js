import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const generateRandomCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const randomCode = generateRandomCode();

export const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.USERPASS,
    },
});

export const mail_option = {
    from: {
        name: "SEF Academy",
        address: process.env.USER,
    }, // sender address
    to: ["mahmoudabdelrahem74@gmail.com"], // list of receivers
    subject: "Reset Your Password", // Subject line
    text: "Reset Your Password", // plain text body
    html : `
        <!DOCTYPE html>
<html>

<head>
    <style>
        /* Use inline styles as much as possible for email compatibility */
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
        }

        .email-header {
            background-color: #007BFF;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }

        .email-body {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }

        .email-footer {
            background-color: #f4f4f4;
            color: #666666;
            text-align: center;
            padding: 10px;
            font-size: 14px;
        }

        .button {
            display: inline-block;
            background-color: #007BFF;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin: 0 auto ;
            margin-top: 20px;
        }
        .order , .code{
            font-size: 2.5rem ;
            color: #000000;
            text-transform: capitalize;
            font-weight: 900 ;
            display: block;
            width: 250px;
            text-align: center;

        }
        
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Welcome to Our Service</h1>
        </div>
        <div class="email-body">
            <p>Dear Customer,</p>
            <p>Thank you for signing up for our service. We're thrilled to have you on board!</p>
            <p>Your Verify Code For Reset Password is </p>
            <a href="https://example.com" class="button code">${randomCode}</a>

            

            <p>If you have any questions or need assistance, feel free to contact us at any time.</p>

            <a href="https://example.com" class="button">Visit Our Website</a>
        </div>
        <div class="email-footer">
            <p>&copy; 2025 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
    `
};

export const sendMail = async (transporter, mail_option) => {
    try {
        await transporter.sendMail(mail_option);
        console.log("Email has been Sent !");
    } catch (error) {
        console.error(error);
    }
};

// sendMail(transporter,mail_option)
