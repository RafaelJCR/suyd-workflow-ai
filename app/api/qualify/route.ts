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
      `You are a lead qualification AI. Analyze this potential client and respond ONLY with valid JSON:
{"score":1-100,"qualification":"hot"|"warm"|"cold","budget_indicator":"high"|"medium"|"low","urgency":"immediate"|"short-term"|"long-term","industry":"detected industry","needs":["need1","need2"],"recommended_response":"one sentence strategy","next_steps":["step1","step2"]}
JSON only, no extra text.`
    );

    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ summary: result });
    }
    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: 'Qualification failed. The AI service may be busy. Please try again.' }, { status: 200 });
  }
}
