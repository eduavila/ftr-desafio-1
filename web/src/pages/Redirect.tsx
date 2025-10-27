import { useNavigate, useParams } from "react-router-dom"
import logoIcon from "../assets/logoIcon.svg"
import { useEffect, useRef } from "react"
import { useLinks } from "../store/links"

function RedirectPage() {
  const navigate = useNavigate();
  const { shortCode } = useParams<{ shortCode: string }>();
  const { getLinkByShortCode } = useLinks();
  
  //Evitar duplicacao chamada.
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return; // evita segunda execução
    calledRef.current = true;

    async function redirect() {
      try {
        const link = await getLinkByShortCode(shortCode as string);

        if (!link) {
          navigate('/not-found')
          return
        }

        setTimeout(() => {
          window.location.href = link?.originalUrl as string;
        }, 500);

      } catch (err) {
        navigate('/not-found')
      }
    }

    redirect();

  }, [shortCode, getLinkByShortCode, navigate])

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="bg-white py-16 px-6 flex flex-col items-center text-center ">
        <img src={logoIcon} className="w-11"></img>
        <h1 className="text-lx font-semibold text-gray-600 mt-6">Redirecionando...</h1>

        <p className="text-md text-gray-500 mt-6">O link será aberto automaticamente em alguns instantes. </p>
        <p className="text-md text-gray-500">Não foi redirecionado? <a href="/" className="text-blue-base" >Acesse aqui</a></p>
      </div>
    </main>
  )
}

export default RedirectPage
