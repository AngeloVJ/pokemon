import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProtectedRoutes from './pages/ProtectedRoutes'
import Pokedex from './pages/Pokedex'
import PokeInfo from './pages/PokeInfo'
import RadarInfo from './components/PokeInfo/RadarInfo'


function App() {


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route element={<ProtectedRoutes/>}>
          <Route path='/pokedex' element={<Pokedex/>}/>
          <Route path='/pokedex/:id' element={<PokeInfo/>}/>
        </Route>


        <Route path='/radar' element={<RadarInfo/>}/>

      </Routes>

      
    </div>
  )
}

export default App
