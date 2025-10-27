import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { z } from 'zod'
import type { InvalidUrlFormat } from './errors/invalid-url-format'
import { eq } from 'drizzle-orm'
import { ShortUrlAlreadyExists } from './errors/exist-short-regiter'

const createLinkInput = z.object({
    originalUrl: z.url(),
    shortCode: z.string(),
})

type createLinkInput = z.input<typeof createLinkInput>

export async function createLink(input: createLinkInput): Promise<Either<InvalidUrlFormat, { id: string, originalUrl: string, shortCode: string }>> {
    const { originalUrl, shortCode } = createLinkInput.parse(input)

    const shortUrlExists = await db.select({ id: schema.links.id }).from(schema.links).where(eq(schema.links.shortCode, shortCode));
    if (shortUrlExists.length) {
        return makeLeft(new ShortUrlAlreadyExists())
    }

    const [insertUrl] = await db.insert(schema.links).values({ originalUrl, shortCode }).returning({ id: schema.links.id })

    return makeRight({ id: insertUrl.id, originalUrl, shortCode })
}