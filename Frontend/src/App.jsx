import { HashRouter, Routes, Route } from 'react-router-dom'
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
          <Route path="/lesson/:lessonId" element={<Lesson />} />
          <Route element={<Layout />} >
            <Route path="/home" element={<Home />} />
            {/* <Route path="/lesson/:lessonId" element={<Lesson />} /> */}
            <Route path="/python" element={<Python />} />
          </Route>
        </Routes>
      </HashRouter>
      </>
    )
}
export default App;
