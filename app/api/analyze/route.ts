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
      `You are a document analysis AI. Extract key information from the document and respond ONLY with valid JSON in this exact format:
{
  "document_type": "contract" | "invoice" | "report" | "letter" | "proposal" | "other",
  "key_entities": ["list of important names, companies, or organizations mentioned"],
  "key_dates": ["list of important dates mentioned"],
  "key_amounts": ["list of monetary amounts mentioned"],
  "main_topics": ["list of main topics covered"],
  "summary": "2-3 sentence summary of the document",
  "action_items": ["list of action items or next steps if any"]
}
Respond ONLY with the JSON, no extra text.`
    );

    const jsonMatch = result.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Could not parse' };

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
