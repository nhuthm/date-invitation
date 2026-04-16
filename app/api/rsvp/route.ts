import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const TIMELINE_LABELS = [
  { time: '12:30 PM', label: 'Lunch', options: ['Fuji Kitchen', 'The B6'] },
  { time: '2:30 PM', label: 'Adventure', options: ['Đi Tô Tượng', 'Đi Vẽ Tranh'] },
  { time: '6:00 PM', label: 'Dinner', options: ['La Petite', 'Trattoria Mia'] },
  { time: '8:30 PM', label: 'Dessert', options: ['Gelato Lab', 'Cinema Paradiso'] },
];

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

  let body: { selections?: Record<string, number>; suggestions?: Record<string, string> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const selections = body.selections ?? {};
  const suggestions = body.suggestions ?? {};

  const lines = TIMELINE_LABELS.map((block, i) => {
    const key = String(i);
    if (key in selections) {
      const optionName = block.options[selections[key]] ?? 'Unknown';
      return `${block.time} — ${block.label}: ${optionName}`;
    }
    if (key in suggestions && suggestions[key].trim()) {
      return `${block.time} — ${block.label}: "${suggestions[key].trim()}" (custom suggestion)`;
    }
    return `${block.time} — ${block.label}: No selection`;
  });

  const when = new Date().toISOString();

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to,
    subject: `Date Plan Confirmed! 🎉`,
    text: [
      `Someone has confirmed the date plan!`,
      '',
      `Here are their picks:`,
      '',
      ...lines,
      '',
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

  console.log('[rsvp]', { selections, suggestions, when });
  return NextResponse.json({ ok: true });
}
