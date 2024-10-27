import { z } from 'zod'

export const eventSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
})

export const eventsSchema = z.array(eventSchema)

export type Event = z.infer<typeof eventSchema>
