import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { nome, email, tipo, messaggio } = req.body;

    // Validate required fields
    if (!nome || !email || !tipo || !messaggio) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'ClaudeCodeNinja <onboarding@resend.dev>',
      to: ['gmail@alekdob.com'],
      replyTo: email,
      subject: `[ClaudeCodeNinja] Nuova richiesta: ${tipo}`,
      html: `
        <h2>Nuova richiesta di consulenza</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tipo:</strong> ${tipo}</p>
        <p><strong>Messaggio:</strong></p>
        <p>${messaggio.replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
