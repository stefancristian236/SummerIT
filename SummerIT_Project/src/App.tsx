import './App.css'
import { RouterProvider } from 'react-router-dom'
import { Allroutes } from "./Routes/AllRoutes"

function App() {
  return (
    <>
      <RouterProvider router = {Allroutes} />
    </>
  )
}

export default App