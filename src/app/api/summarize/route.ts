import { NextRequest, NextResponse } from 'next/server';
import { generateSessionSummary } from '@/lib/bedrock';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, notes, code, mentorName, learnerName } = body;

    const summaryResult = await generateSessionSummary(
      topic || 'Peer Engineering Session',
      notes || '',
      code || '',
      mentorName || 'Campus Mentor',
      learnerName || 'Student Learner'
    );

    return NextResponse.json({
      success: true,
      data: summaryResult
    });
  } catch (error: any) {
    console.error('Summarize API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate session summary' },
      { status: 500 }
    );
  }
}
