import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';

// This endpoint is for initial setup only - should be removed in production
export async function POST() {
  try {
    await dbConnect();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL || 'admin@cookievault.com',
    });

    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin already exists' },
        { status: 400 }
      );
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || 'admin123',
      10
    );

    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL || 'admin@cookievault.com',
      passwordHash: hashedPassword,
      role: 'admin',
    });

    return NextResponse.json(
      {
        message: 'Admin created successfully',
        admin: { email: admin.email, role: admin.role },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error seeding admin:', error);
    return NextResponse.json(
      { error: 'Failed to create admin' },
      { status: 500 }
    );
  }
}
