'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type Choice = 'yes' | 'maybe' | 'no';
type Status = 'idle' | 'submitting' | 'done' | 'error';

const THANKS: Record<Choice, string> = {
  yes: "Yay — can't wait! I'll be in touch with the details.",
  maybe: "Thanks for letting me know. I'll check in with you soon.",
  no: "Thanks for the honest answer. No hard feelings!",
};

function InvitationInner() {
  const params = useSearchParams();
  const name = (params.get('to') ?? '').slice(0, 40).trim();

  const [status, setStatus] = useState<Status>('idle');
  const [choice, setChoice] = useState<Choice | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(c: Choice) {
    setStatus('submitting');
    setChoice(c);
    setError(null);
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choice: c, name }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Something went wrong.');
      }
      setStatus('done');
    } catch (e) {
      setStatus('error');
      setError(e instanceof Error ? e.message : 'Unknown error.');
    }
  }

  if (status === 'done' && choice) {
    return (
      <main>
        <h1>Got it{name ? `, ${name}` : ''}.</h1>
        <p className="thanks">{THANKS[choice]}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>{name ? `Hey ${name},` : 'Hey,'}</h1>
      <p>I&apos;d love to take you out. What do you think?</p>
      <div className="buttons">
        <button onClick={() => submit('yes')} disabled={status === 'submitting'}>
          Yes, I&apos;d love to
        </button>
        <button onClick={() => submit('maybe')} disabled={status === 'submitting'}>
          Maybe — let me think about it
        </button>
        <button onClick={() => submit('no')} disabled={status === 'submitting'}>
          No, thanks
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<main><p>Loading…</p></main>}>
      <InvitationInner />
    </Suspense>
  );
}
