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
    const { links, fetchAllLinks, fetchAllLinksLoading, exportLinksCSV, exportLinksCSVLoading} = useLinks();

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
            <div className='p-8'>
                <div className="flex items-start justify-between">
                    <h2 className="text-lg font-semibold text-gray-600">Meus links</h2>
                    <Button
                        size="icon"
                        className="text-xs font-semibold"
                        variant="default"
                        onClick={() => handlerExportLinksCSV()}
                        disabled={exportLinksCSVLoading}
                    >
                        { exportLinksCSVLoading 
                            ? <Spinner className="animate-spin text-gray-500" size={16}/>
                            : <DownloadSimple size={16} className="text-gray-500"/>  }
                        
                        Baixar CSV
                    </Button>
                </div>

                {fetchAllLinksLoading && <LinksLoading></LinksLoading>}

                {links.length == 0 && !fetchAllLinksLoading && <LinksEmpty></LinksEmpty>}

                {links.length > 0 && !fetchAllLinksLoading 
                    && <ScrollArea.Root type="scroll" className="overflow-hidden">
                        <ScrollArea.Viewport
                            className="h-[400px]">
                            <ul className="divide-y divide-gray-200 border-t-1 mt-5 border-gray-200">
                                {links.map((link: Link) => {
                                    return (
                                        <LinksListItem link={link} key={link.id} />
                                    )
                                })}
                            </ul>
                        </ScrollArea.Viewport>
                        <ScrollArea.Scrollbar
                            className="flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                            orientation="vertical"
                        >
                            <ScrollArea.Thumb className="relative flex-1 bg-blue-base before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
                        </ScrollArea.Scrollbar>
                    </ScrollArea.Root>
                }
            </div>
        </div>
    )
}