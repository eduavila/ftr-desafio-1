import './App.css'
import { Toaster } from './components/ui/sonner'
import AppRoutes from './routes'

function App() {
  return (
    <div className="font-opensans w-full min-h-dvh">
      <AppRoutes />
      <Toaster/>
    </div>
  )
}

export default App
