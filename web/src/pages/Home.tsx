import logo from '../assets/logo.svg'

import { LinksList } from '../components/links-list'
import { LinkForm } from '../components/links-form'

function HomePage() {
  return (
    <div className='flex flex-col max-w-4xl'>
      <header className="mb-8">
        <div className="flex items-center gap-3 pl-6">
          <img src={logo} alt='Logo' className='h-[24px]'></img>
        </div>
      </header>

      <main className="flex flex-col flex-1 md:flex-row md:gap-4">
        <section className="flex-shrink-0 md:basis-2/5">
          <LinkForm />
        </section>
        <section className="flex flex-col flex-1 mt-3 md:mt-0 md:basis-3/5">
          <LinksList/>
        </section>
      </main>
    </div>
  )
}

export default HomePage
