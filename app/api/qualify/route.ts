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
      `You are a lead qualification AI for a software development and AI solutions company called SUYD. Analyze the potential client message and respond ONLY with valid JSON in this exact format:
{
  "score": 1-100,
  "qualification": "hot" | "warm" | "cold",
  "budget_indicator": "high" | "medium" | "low" | "unknown",
  "urgency": "immediate" | "short-term" | "long-term" | "unknown",
  "industry": "detected industry of the lead",
  "needs": ["list of identified needs"],
  "recommended_response": "suggested response strategy",
  "next_steps": ["list of recommended next steps"]
}
Respond ONLY with the JSON, no extra text.`
    );

    const jsonMatch = result.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Could not parse' };

    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: 'Qualification failed. Please try again.' }, { status: 200 });
  }
}
