import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/infra/shared/either'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage';
import { stringify } from 'csv-stringify';
import { PassThrough, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

type exportLinksCSV =  {
    fileUrl: string;
}

export async function exportLinksCSV(): Promise<Either<never, exportLinksCSV>> {

    const { sql, params } = db
        .select({
            id: schema.links.id,
            originalUrl: schema.links.originalUrl,
            shortCode: schema.links.shortCode,
            visitCount: schema.links.visitCount,
            createdAt: schema.links.createdAt,
        })
        .from(schema.links)
        .toSQL()

    const cursor = pg.unsafe(sql, params as string[]).cursor(2)

    const csv = stringify({
        delimiter: ',',
        header: true,
        columns: [
            { key: 'id', header: 'ID' },
            { key: 'originalUrl', header: 'URL' },
            { key: 'shortCode', header: 'Short URL' },
            { key: 'visitCount', header: 'Count Visit Link' },
            { key: 'createdAt', header: 'Created at' },
        ],
    })

    const uploadToStorageStream = new PassThrough()

    const convertToCSVPipeline = pipeline(
        cursor,
        new Transform({
        objectMode: true,
        transform(chunks: unknown[], encoding, callback) {
            for (const chunk of chunks) {
            this.push(chunk)
            }

            callback()
        },
        }),
        csv,
        uploadToStorageStream
    )

    const uploadToStorage = uploadFileToStorage({
        contentType: 'text/csv',
        folder: 'downloads',
        fileName: `${new Date().toISOString()}-links.csv`,
        contentStream: uploadToStorageStream,
    })

    const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])
    
    return makeRight({
        fileUrl: url
    })
}