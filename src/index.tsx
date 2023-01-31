import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import ReactDOM from 'react-dom/client'

//Css
import './index.css'

//App
import App from './App'

//Components
import SearchPage from './pages/searchPage'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/search' element={<SearchPage />}></Route>
    </Route>
  )
)

root.render(<RouterProvider router={router} />)
