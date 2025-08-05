
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {


  return (
    <>
  <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Any layout like header/sidebar can go here */}
      <Outlet />
    </div>
    </>
  )
}

export default App
