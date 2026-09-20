import { NextRequest, NextResponse } from 'next/server';
import { performSemanticMatch } from '@/lib/bedrock';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, offering } = body;

    if (!query) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    const { results, source } = await performSemanticMatch(query, offering || '');

    return NextResponse.json({
      success: true,
      query,
      results,
      source
    });
  } catch (error: any) {
    console.error('Match API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
