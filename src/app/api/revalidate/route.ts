import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret');

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    // Revalidate all pages that display Sanity content
    revalidatePath('/');
    revalidatePath('/works');
    revalidatePath('/works/[slug]', 'page');
    revalidatePath('/about');
    revalidatePath('/contact');

    return NextResponse.json({ revalidated: true, timestamp: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    );
  }
}
