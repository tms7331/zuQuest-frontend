import { NextResponse } from 'next/server';
import { validateEnv } from '@/lib/env';
import { generateTasks } from './generateTasks.js';

// Validate environment variables
validateEnv();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userInfo, cityInfo } = body;
        const csvTasks = await generateTasks(userInfo, cityInfo);
        return NextResponse.json({ tasks: csvTasks });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to generate tasks' },
            { status: 500 }
        );
    }
} 