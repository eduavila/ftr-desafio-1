import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { links } from '@/infra/db/schemas/links'

const removeLinkInput = z.object({
    id: z.string()
})

type removeLinkInput = z.input<typeof removeLinkInput>

export async function deleteLink(input: removeLinkInput): Promise<void> {
    const { id } = removeLinkInput.parse(input)

    await db.delete(schema.links).where(eq(links.id, id));
}