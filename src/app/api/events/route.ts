import { PrismaClient, Event } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(): Promise<NextResponse> {
  try {
    const events = await getAllEvents()
    return NextResponse.json(events, { status: 200 })
  } catch (error) {
    console.error('Failed to fetch events:', error)
    return NextResponse.json({ message: 'Failed to fetch events.' }, { status: 500 })
  } finally {
    await prisma.$disconnect() // PrismaClient の解放
  }
}

async function getAllEvents(): Promise<Event[]> {
  try {
    const events = await prisma.event.findMany()
    return events
  } catch (error) {
    console.error('Error fetching events from database:', error)
    throw new Error('Database query failed.')
  }
}
