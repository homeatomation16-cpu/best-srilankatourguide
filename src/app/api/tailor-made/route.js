import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

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
      subject: `🌴 New Tailor Made Tour Request`,
      html: `
        <h2>Tailor Made Tour Request</h2>

        <h3>Customer Details</h3>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>WhatsApp:</strong> ${body.whatsapp}</p>

        <h3>Travel Preferences</h3>
        <p><strong>Style:</strong> ${body.travelStyle}</p>
        <p><strong>Vehicle:</strong> ${body.vehicleType}</p>
        <p><strong>Transport:</strong> ${body.transportMethod}</p>

        <h3>Holiday Types</h3>
        <p>${body.holidayType?.join(", ")}</p>

        <h3>Accommodation</h3>
        <p><strong>Type:</strong> ${body.accommodation}</p>
        <p><strong>Meal Plan:</strong> ${body.mealPlan || "-"}</p>

        <h3>Travelers</h3>
        <p>Adults: ${body.adults}</p>
        <p>Children: ${body.children}</p>

        <h3>Dates</h3>
        <p>From: ${body.startDate}</p>
        <p>To: ${body.endDate}</p>
        <p>Duration: ${body.estimatedDays} days</p>

        <h3>Additional Requirements</h3>
        <p>${body.additionalRequirements || "-"}</p>
      `,
    });

    // Confirmation email to customer
    await transporter.sendMail({
      from: `"Sri Lanka Tours Driver" <${process.env.EMAIL_USER}>`,
      to: body.email,
      subject: "Your Tailor Made Tour Request Received",
      html: `
        <h2>Thank you ${body.name}!</h2>
        <p>We received your tailor-made tour request.</p>
        <p>Our team will contact you shortly via WhatsApp or Email.</p>
        <br/>
        <p>Best Regards,<br/>Sri Lanka Tours Driver</p>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}