import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Cookie from '@/models/Cookie';

// GET - Fetch a single cookie by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const cookie = await Cookie.findById(params.id);

    if (!cookie) {
      return NextResponse.json({ error: 'Cookie not found' }, { status: 404 });
    }

    return NextResponse.json({ cookie }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cookie:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cookie' },
      { status: 500 }
    );
  }
}

// PUT - Update a cookie
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { websiteName, websiteUrl, slug, description, email, password, otpWebpage, cookies, isPublic } = body;

    await dbConnect();

    const cookie = await Cookie.findById(params.id);

    if (!cookie) {
      return NextResponse.json({ error: 'Cookie not found' }, { status: 404 });
    }

    // Check if slug is being changed and if it conflicts with another cookie
    if (slug && slug !== cookie.slug) {
      const existingCookie = await Cookie.findOne({ slug });
      if (existingCookie) {
        return NextResponse.json(
          { error: 'A cookie with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Update fields
    if (websiteName) cookie.websiteName = websiteName;
    if (websiteUrl !== undefined) cookie.websiteUrl = websiteUrl;
    if (slug) cookie.slug = slug;
    if (description !== undefined) cookie.description = description;
    if (email !== undefined) cookie.email = email;
    if (password !== undefined) cookie.password = password;
    if (otpWebpage !== undefined) cookie.otpWebpage = otpWebpage;
    if (cookies !== undefined) cookie.cookies = cookies;
    if (isPublic !== undefined) cookie.isPublic = isPublic;

    // Validate at least one credential type exists
    if (!cookie.email && !cookie.password && !cookie.cookies) {
      return NextResponse.json(
        { error: 'At least one of email, password, or cookies must be provided' },
        { status: 400 }
      );
    }

    await cookie.save();

    return NextResponse.json({ cookie }, { status: 200 });
  } catch (error) {
    console.error('Error updating cookie:', error);
    return NextResponse.json(
      { error: 'Failed to update cookie' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a cookie
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const cookie = await Cookie.findByIdAndDelete(params.id);

    if (!cookie) {
      return NextResponse.json({ error: 'Cookie not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Cookie deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting cookie:', error);
    return NextResponse.json(
      { error: 'Failed to delete cookie' },
      { status: 500 }
    );
  }
}
