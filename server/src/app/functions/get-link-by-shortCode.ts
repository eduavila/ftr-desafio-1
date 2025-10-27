import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { LinkNotFound } from './errors/link-not-found'

const GetLinkByShortCodeInput = z.object({
  shortCode: z.string().optional(),
})

type GetLinkByShortCodeInput = z.input<typeof GetLinkByShortCodeInput>

type GetLinkByShortCodeOutput = {
  id: string;
  originalUrl: string;
  shortCode: string;
  visitCount: number;
  createdAt: Date;
}

export async function getLinkByShortCode(input: GetLinkByShortCodeInput): Promise<Either<LinkNotFound, GetLinkByShortCodeOutput>> {
  const { shortCode } = GetLinkByShortCodeInput.parse(input)

  const link = await db.query.links.findFirst({ where: eq(schema.links.shortCode, shortCode) })
  if (!link) {
    return makeLeft(new LinkNotFound())
  }

  const visitCount = link.visitCount + 1;

  await db
    .update(schema.links)
    .set({ visitCount: visitCount })
    .where(eq(schema.links.id, link.id))
    .returning()

  return makeRight({
    ...link,
    visitCount
  })
}