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
      `You are a lead qualifier for a software company. ALWAYS respond in English. Respond ONLY with a JSON object, no markdown, no explanation, no backticks. Format:
{"score":85,"qualification":"hot","budget_indicator":"high","urgency":"immediate","industry":"hospitality","needs":["need1","need2"],"recommended_response":"strategy in English","next_steps":["step1","step2"]}`
    );

    return NextResponse.json(parseJSON(result));
  } catch {
    return NextResponse.json({ error: 'Qualification failed. Please try again.' }, { status: 200 });
  }
}
