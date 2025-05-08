
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { openai } from '@/lib/openai';
import { image_gen } from '@/lib/image_gen';
import fetch from 'node-fetch';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { name, email, age, country } = req.body;

  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: `Based on this user profile:\n- Name: ${name}\n- Age: ${age}\n- Country: ${country}\nGenerate a poetic, romantic-style soulmate description (within 150 words).`
        }
      ]
    });
    const description = chat.choices[0].message.content;

    const image = await image_gen.text2im({
      prompt: `Pencil sketch of soulmate. Indian features, subtle smile, romantic expression, soft eyes.`,
      size: '512x512'
    });
    const imageUrl = image.data[0].url;

    const sketchImageBytes = await fetch(imageUrl).then(r => r.arrayBuffer());
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([600, 800]);
    const sketchImage = await pdf.embedJpg(sketchImageBytes);
    const font = await pdf.embedFont(StandardFonts.Helvetica);

    page.drawImage(sketchImage, { x: 80, y: 400, width: 440, height: 320 });
    page.drawText(description, {
      x: 50,
      y: 380,
      font,
      size: 12,
      color: rgb(0.1, 0.1, 0.1),
      lineHeight: 16,
      maxWidth: 500,
    });

    const pdfBytes = await pdf.save();
    const upload = await uploadToCloudinary(pdfBytes, `${name}-soulmate.pdf`, 'application/pdf');

    await resend.emails.send({
      from: 'Soulmate Sketch <no-reply@soulmate-sketch.com>',
      to: email,
      subject: 'Your Soulmate Sketch is Ready ✨',
      html: `<p>Hi ${name},</p>
             <p>Your soulmate sketch and reading are now ready!</p>
             <p><a href="${imageUrl}">View Sketch</a></p>
             <p><a href="${upload.secure_url}">Download PDF</a></p>
             <p>Thank you for trusting the magic 💫</p>`
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error generating sketch/email:', err);
    res.status(500).json({ error: 'Failed to generate sketch' });
  }
}
