import { NextRequest, NextResponse } from 'next/server';
import { auditSolutionWithBedrock } from '@/lib/bedrock';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, description, category, solution, clarification } = body;

    if (!topic || !solution) {
      return NextResponse.json(
        { error: 'Topic and solution are required.' },
        { status: 400 }
      );
    }

    const auditResult = await auditSolutionWithBedrock({
      topic: topic || 'Campus Task',
      description: description || '',
      category: category || 'General',
      solution: solution || '',
      clarification: clarification || ''
    });

    return NextResponse.json({
      success: true,
      data: auditResult
    });
  } catch (error: any) {
    console.error('Audit Solution API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to audit solution' },
      { status: 500 }
    );
  }
}
