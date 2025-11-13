import { useLinks, type Link } from '../store/links'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { LinksLoading } from './links-loading'
import { LinksEmpty } from './links-empty'
import { useEffect } from 'react'
import { LinksListItem } from './links-list-item'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { DownloadSimple, Spinner } from "phosphor-react"
import LoadingBar from './ui/loading-bar'

export function LinksList() {
    const { links, fetchAllLinks, fetchAllLinksLoading, exportLinksCSV, exportLinksCSVLoading } = useLinks();

    useEffect(() => {
        fetchAllLinks();
    }, [fetchAllLinks])

    async function handlerExportLinksCSV() {
        try {
            const { fileUrl } = await exportLinksCSV()

            window.open(fileUrl);
        } catch (err) {
            toast.error('Ops Ocorreu erro');
        }
    }


    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full overflow-hidden">
            {fetchAllLinksLoading && <LoadingBar />}
            <div className='p-8 w-full min-w-0"'>
                <div className="flex items-start justify-between">
                    <h2 className="text-lg font-semibold text-gray-600">Meus links</h2>
                    <Button
                        size="icon"
                        className="text-xs font-semibold"
                        variant="default"
                        onClick={() => handlerExportLinksCSV()}
                        disabled={exportLinksCSVLoading}
                    >
                        {exportLinksCSVLoading
                            ? <Spinner className="animate-spin text-gray-500" size={16} />
                            : <DownloadSimple size={16} className="text-gray-500" />}

                        Baixar CSV
                    </Button>
                </div>

                {fetchAllLinksLoading && <LinksLoading></LinksLoading>}

                {links.length == 0 && !fetchAllLinksLoading && <LinksEmpty></LinksEmpty>}

                {links.length > 0 && !fetchAllLinksLoading
                    && <div className="flex min-w-0">
                        <ScrollArea.Root className="flex-1 overflow-hidden mt-5">
                            <ScrollArea.Viewport
                                className="h-[400px] w-full min-w-0 flex flex-col">
                                <div className="flex flex-col min-w-0 w-full pr-3">
                                    <ul className="divide-y divide-gray-200 border-t-1 border-gray-200 w-full">
                                        {links.map((link: Link) => {
                                            return (
                                                <LinksListItem link={link} key={link.id} />
                                            )
                                        })}
                                    </ul>
                                </div>
                            </ScrollArea.Viewport>
                          <ScrollArea.Scrollbar
                            orientation="vertical"
                            forceMount
                            className="flex p-0.5 w-2.5 bg-gray-100 hover:bg-gray-200"
                            >
                            <ScrollArea.Thumb className="flex-1 bg-blue-base rounded-full" />
                            </ScrollArea.Scrollbar>
                        </ScrollArea.Root>
                    </div>
                }
            </div>
        </div>
    )
}