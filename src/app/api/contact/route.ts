import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Toate câmpurile sunt obligatorii." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: `"Lionfly" <rares.crainic@gmail.com>`,
      to: "rares.crainic@gmail.com",
      subject: `Mesaj de la ${name} | LIONFLY`,
      text: message,
      html: `<p><strong>Nume:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Mesaj:</strong><br/>${message}</p>`,
    });

    return NextResponse.json({ message: "Mesajul a fost trimis cu succes!" });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "A apărut o eroare la trimiterea mesajului." },
      { status: 500 }
    );
  }
}
