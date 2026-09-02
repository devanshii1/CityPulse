import { NextRequest, NextResponse } from 'next/server'
import { analyzeComplaint } from '../../../lib/gemini'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const description = body?.description
    if (!description || typeof description !== 'string') {
      return NextResponse.json({ error: 'description is required' }, { status: 400 })
    }

    const input = {
      description,
      image_url: typeof body.image_url === 'string' ? body.image_url : undefined,
      latitude: typeof body.latitude === 'number' ? body.latitude : undefined,
      longitude: typeof body.longitude === 'number' ? body.longitude : undefined,
    }

    const result = await analyzeComplaint(input)

    // Basic validation of result
    if (!result || typeof result !== 'object') {
      return NextResponse.json({ error: 'Invalid analysis result' }, { status: 502 })
    }

    const { category, severity, summary, confidence } = result as any
    if (!category || !summary || typeof confidence !== 'number' || typeof severity !== 'number') {
      return NextResponse.json({ error: 'Incomplete analysis result' }, { status: 502 })
    }

    return NextResponse.json({ category, severity, summary, confidence })
  } catch (err: any) {
    const msg = err?.message || 'Unknown error'
    return NextResponse.json({ error: `AI analysis failed: ${msg}` }, { status: 500 })
  }
}
