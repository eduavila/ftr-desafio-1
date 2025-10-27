import logo404 from "../assets/logo404.svg"

function NotFoundPage() {
  
  return (
    <main className="flex justify-center items-center h-screen">
       <div className="bg-white py-16 px-6 flex flex-col items-center text-center max-w-[580px]">
          <img src={logo404} className="w-48"></img>
          <h1 className="text-xl font-bold text-gray-600 mt-6">
            Link não encontrado
          </h1>

          <p className="text-md text-gray-500 font-semibold mt-6">
            O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em <a href="/" className="text-blue-base">brev.ly</a>.
          </p>
        </div>
    </main> 
  )
}

export default NotFoundPage
