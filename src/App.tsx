import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes'


function App() {
 
 
  return (
    <div className="App" data-theme="dark">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
