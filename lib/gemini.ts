type ComplaintInput = {
  description: string
  image_url?: string
  latitude?: number
  longitude?: number
}

type AnalysisResult = {
  category: string
  severity: number
  summary: string
  confidence: number
}

function clampSeverity(n: number) {
  if (Number.isNaN(n)) return 1
  return Math.min(5, Math.max(1, Math.round(n)))
}

function normalizeConfidence(n: number) {
  if (Number.isNaN(n)) return 0
  if (n > 1) {
    // if model returned 0-100, convert
    if (n <= 100) return n / 100
    return 1
  }
  return Math.min(1, Math.max(0, n))
}

async function parseModelJson(text: string) {
  // Try direct parse
  try {
    return JSON.parse(text)
  } catch (e) {
    // Try extract JSON substring
    const first = text.indexOf('{')
    const last = text.lastIndexOf('}')
    if (first !== -1 && last !== -1 && last > first) {
      const sub = text.substring(first, last + 1)
      try {
        return JSON.parse(sub)
      } catch (e2) {
        throw new Error('Unable to parse JSON from model output')
      }
    }
    throw new Error('No JSON found in model output')
  }
}

export async function analyzeComplaint(input: ComplaintInput): Promise<AnalysisResult> {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY
  const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash'

  if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY is not set')
  if (!model) throw new Error('GEMINI_MODEL is not set')

  const categories = [
    'waterlogging',
    'flooding',
    'pothole',
    'road_blockage',
    'garbage',
    'streetlight',
    'other',
  ]

  const prompt = `You are a civic infrastructure classification assistant for CityPulse.\n\nGiven the citizen complaint below, return a JSON object EXACTLY with keys: ` +
    '`category`, `severity`, `summary`, `confidence`' +
    `.\n- \'category\' must be one of: ${categories.join(', ')}.\n- \'severity\' must be an integer 1..5 (1 low, 5 critical).\n- \'summary\' must be a short (1-2 sentence) plain-text summary.\n- \'confidence\' must be a number between 0 and 1 indicating model confidence.\n\nComplaint:\n${JSON.stringify(input)}\n\nRespond with JSON only.`

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`
  const body = JSON.stringify({
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      responseMimeType: 'application/json',
    },
  })

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    throw new Error(`Gemini API error: ${res.status} ${res.statusText} ${errText}`)
  }

  const data = await res.json().catch(() => null)

  const candidateText =
    data?.candidates?.[0]?.content?.parts
      ?.map((part: any) => (typeof part?.text === 'string' ? part.text : ''))
      .join('') ?? ''

  if (!candidateText) {
    throw new Error('No content returned by Gemini API')
  }

  const parsed = await parseModelJson(candidateText)

  let obj: any = parsed
  if (parsed.result && typeof parsed.result === 'object') obj = parsed.result
  if (Array.isArray(parsed.candidates) && parsed.candidates.length > 0) {
    const first = parsed.candidates[0]
    if (first.output) obj = first.output
    else if (first.content) obj = first.content
  }

  const category = typeof obj.category === 'string' ? obj.category : String(obj.category || 'other')
  const severityRaw = Number(obj.severity ?? obj.severity_level ?? obj.sev ?? 1)
  const severity = clampSeverity(severityRaw)
  const summary = typeof obj.summary === 'string' ? obj.summary : String(obj.summary || obj.summary_text || '')
  const confidenceRaw = Number(obj.confidence ?? obj.conf ?? obj.score ?? 0)
  const confidence = normalizeConfidence(confidenceRaw)

  return { category, severity, summary, confidence }
}

export type { ComplaintInput, AnalysisResult }
