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
      `You are a document analyzer. ALWAYS respond in English. Respond ONLY with a JSON object, no markdown, no explanation, no backticks. Format:
{"document_type":"contract","key_entities":["name1","name2"],"key_dates":["date1"],"key_amounts":["$100"],"main_topics":["topic1"],"summary":"brief summary in English","action_items":["item1"]}`
    );

    return NextResponse.json(parseJSON(result));
  } catch {
    return NextResponse.json({ error: 'Analysis failed. Please try again.' }, { status: 200 });
  }
}
