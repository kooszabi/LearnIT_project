import { HashRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { Layout } from './Pages/Components/Layout'
import { Landing } from './Pages/Landing'
import { Home } from './Pages/Home'
import { Lesson } from './Pages/Lesson'
import { Python } from './Pages/Python'
function App() {
  
    return (
      <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/lesson/:lessonId" element={<ProtectedRoute> <Lesson /> </ProtectedRoute>} />
          <Route element={<Layout />} >
            <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
            {/* <Route path="/lesson/:lessonId" element={<Lesson />} /> */}
            <Route path="/python" element={<ProtectedRoute> <Python /> </ProtectedRoute>} />
          </Route>
        </Routes>
      </HashRouter>
      </>
    )
}
export default App;
