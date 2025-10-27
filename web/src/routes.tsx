import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import RedirectPage from './pages/Redirect'
import NotFoundPage from './pages/NotFound'


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:shortCode" element={<RedirectPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}