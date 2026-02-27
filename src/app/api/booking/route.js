import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, date, time, notes, itemName, bookingType } = body;

    if (!name || !email) {
      return Response.json({ success: false }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Sri Lanka Tours Driver" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New ${bookingType} Booking - ${itemName}`,
      html: `
        <h2>New ${bookingType} Booking</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "-"}</p>
        <p><strong>Date:</strong> ${date || "-"}</p>
        <p><strong>Time:</strong> ${time || "-"}</p>
        <p><strong>Item:</strong> ${itemName}</p>
        <p><strong>Notes:</strong> ${notes || "-"}</p>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}