import { HashRouter, Routes, Route } from 'react-router-dom'
import { Landing } from './Pages/Landing'
import { Home } from './Pages/Home'
import { Lesson } from './Pages/Lesson'
function App() {
  
    return (
      <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/lesson/:lessonId" element={<Lesson />} />
        </Routes>
      </HashRouter>
      </>
    )
}
export default App;
