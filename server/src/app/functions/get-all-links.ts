import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/infra/shared/either'
import { desc } from 'drizzle-orm'

type linkOutput = {
  id: string;
  originalUrl: string;
  shortCode: string;
  visitCount: number;
  createdAt: Date;
}

type getAllLinksOutput = linkOutput[];

export async function getAllLinks(): Promise<Either<never, getAllLinksOutput>> {

  const links = await db
      .select({
        id: schema.links.id,
        originalUrl: schema.links.originalUrl,
        shortCode: schema.links.shortCode,
        visitCount: schema.links.visitCount,
        createdAt: schema.links.createdAt
      })
      .from(schema.links)
      .orderBy(fields => {
        return desc(fields.id)
      })


  return makeRight(links)
}