import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const LABELS: Record<string, string> = {
  yes: "Yes, I'd love to",
  maybe: 'Maybe — let me think about it',
  no: 'No, thanks',
};

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.TO_EMAIL;
  const from = process.env.FROM_EMAIL ?? 'Date Invitation <onboarding@resend.dev>';

  if (!apiKey || !to) {
    return NextResponse.json(
      { error: 'Email is not configured on the server.' },
      { status: 500 },
    );
  }

  let body: { choice?: unknown; name?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const choice = typeof body.choice === 'string' ? body.choice : '';
  const rawName = typeof body.name === 'string' ? body.name : '';
  const name = rawName.slice(0, 80).trim();

  if (!(choice in LABELS)) {
    return NextResponse.json({ error: 'Invalid choice.' }, { status: 400 });
  }

  const label = LABELS[choice];
  const who = name || 'Someone';
  const when = new Date().toISOString();

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to,
    subject: `Date invitation RSVP: ${label} — from ${who}`,
    text: [
      `${who} responded to your invitation.`,
      '',
      `Answer: ${label}`,
      `Received: ${when}`,
    ].join('\n'),
  });

  if (result.error) {
    console.error('[rsvp] resend error', result.error);
    return NextResponse.json(
      { error: 'Failed to send email.' },
      { status: 502 },
    );
  }

  console.log('[rsvp]', { choice, name: who, when });
  return NextResponse.json({ ok: true });
}
