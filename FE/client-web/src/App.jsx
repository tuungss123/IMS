import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

//pages
import HomePage from "./pages/home"
import InventoryPage from "./pages/inventory"
import RootLayout from './layouts/root-layout'
import "./App.css"
import ProfilePage from './pages/profile'
import SignIn from './pages/sign-in'
import ArchivePage from './pages/archive'
import CafeInventoryPage from './pages/menu'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<HomePage/>} />
      <Route path='inventory' element={<InventoryPage/>} />
      <Route path='archive' element={<ArchivePage/>} />
      <Route path='cafeinventory' element={<CafeInventoryPage/>} />
      <Route path='profile' element={<ProfilePage/>} />
      <Route path='signin' element={<SignIn/>} />
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;
