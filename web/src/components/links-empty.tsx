import { Link as LinkIcon } from "phosphor-react"

export function LinksEmpty(){
    return (
        <div className="flex flex-col flex-1 justify-center text-center py-8 h-full">
            <div className="flex justify-center">
                <LinkIcon className='text-gray-400' size={32}/>    
            </div>
            
            <p className='text-xs text-gray-500 mt-4'>AINDA NÃO EXISTEM LINKS CADASTRADOS</p>
        </div>
    )
}