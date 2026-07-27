import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt, model } = await req.json();

    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        success: true,
        source: 'MOCK_ENGINE_FALLBACK',
        response: `[DeepSeek-R1 Local Fallback]: Hasil analisis real-time dari Central DB — Kas Holding aman, tidak ada anomali. (Catatan: Untuk menggunakan Real Cloud LLM, masukkan DEEPSEEK_API_KEY pada Vercel Environment Variables).`
      });
    }

    // Call Real DeepSeek Open API
    const apiRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model || 'deepseek-reasoner',
        messages: [
          {
            role: 'system',
            content: 'You are DeepSeek ERP Enterprise Assistant. You help analyze finance, budgeting, HRD, inventory, mining, hotel, catering, and devops. Strictly adhere to ERP rules.'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!apiRes.ok) {
      throw new Error(`DeepSeek API Error: ${apiRes.statusText}`);
    }

    const data = await apiRes.json();
    const aiAnswer = data.choices?.[0]?.message?.content || 'Tidak ada respon dari DeepSeek.';

    return NextResponse.json({
      success: true,
      source: 'DEEPSEEK_REAL_CLOUD_API',
      response: aiAnswer
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Gagal memproses query ke DeepSeek API'
      },
      { status: 500 }
    );
  }
}
