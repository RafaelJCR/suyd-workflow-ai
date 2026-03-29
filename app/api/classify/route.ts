import { NextResponse } from 'next/server';
import { askAI, parseJSON } from '@/lib/ai';

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ error: 'Missing text field' }, { status: 400 });
  }

  try {
    const result = await askAI(
      text,
      `You are an email classifier. ALWAYS respond in English. Respond ONLY with a JSON object, no markdown, no explanation, no backticks. Format:
{"category":"support","priority":"high","sentiment":"negative","summary":"brief summary in English","suggested_action":"action in English"}`
    );

    return NextResponse.json(parseJSON(result));
  } catch {
    return NextResponse.json({ error: 'Classification failed. Please try again.' }, { status: 200 });
  }
}
