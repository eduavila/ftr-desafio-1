import { pgTable, text, timestamp,integer } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const links = pgTable('links', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  originalUrl: text('originalUrl').notNull(),
  shortCode: text('shortCode').notNull(),
  visitCount: integer('visitCount').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})