import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Cookie from '@/models/Cookie';

// GET - Fetch all cookies (only for authenticated users)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const cookies = await Cookie.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ cookies }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cookies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cookies' },
      { status: 500 }
    );
  }
}

// POST - Create a new cookie
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { websiteName, websiteUrl, slug, description, email, password, otpWebpage, cookies, isPublic } = body;

    if (!websiteName || !slug) {
      return NextResponse.json(
        { error: 'Website name and slug are required' },
        { status: 400 }
      );
    }

    // At least one credential type must be provided
    if (!email && !password && !cookies) {
      return NextResponse.json(
        { error: 'At least one of email, password, or cookies must be provided' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if slug already exists
    const existingCookie = await Cookie.findOne({ slug });
    if (existingCookie) {
      return NextResponse.json(
        { error: 'A cookie with this slug already exists' },
        { status: 400 }
      );
    }

    const newCookie = await Cookie.create({
      websiteName,
      websiteUrl: websiteUrl || '',
      slug,
      description,
      email: email || '',
      password: password || '',
      otpWebpage: otpWebpage || '',
      cookies: cookies || '',
      isPublic: isPublic || false,
    });

    return NextResponse.json({ cookie: newCookie }, { status: 201 });
  } catch (error) {
    console.error('Error creating cookie:', error);
    return NextResponse.json(
      { error: 'Failed to create cookie' },
      { status: 500 }
    );
  }
}
