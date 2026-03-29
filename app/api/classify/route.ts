import { NextResponse } from 'next/server';
import { askAI } from '@/lib/ai';

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ error: 'Missing text field' }, { status: 400 });
  }

  try {
    const result = await askAI(
      text,
      `You are an email classification AI. Analyze the email and respond ONLY with valid JSON in this exact format:
{
  "category": "support" | "sales" | "billing" | "spam" | "partnership" | "general",
  "priority": "high" | "medium" | "low",
  "sentiment": "positive" | "neutral" | "negative",
  "summary": "one sentence summary",
  "suggested_action": "what should be done with this email"
}
Respond ONLY with the JSON, no extra text.`
    );

    const jsonMatch = result.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Could not parse' };

    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: 'Classification failed. Please try again.' }, { status: 200 });
  }
}
