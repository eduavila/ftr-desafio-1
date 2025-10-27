import { Spinner } from "phosphor-react";

export function LinksLoading(){

    return (
         <div className="flex flex-col flex-1 justify-center text-center py-8 h-full">
            <div className="flex justify-center">
                <Spinner className="animate-spin" size={32}/>
            </div>
            
            <p className='text-xs text-gray-500 mt-4'>CARREGANDO LINKS</p>
        </div>
    );
}