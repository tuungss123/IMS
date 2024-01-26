import React from "react"
import SignIn from "./pages/sign-in"
import HomePage from "./pages/home"
import InventoryPage from "./pages/inventory"
import OrdersPage from "./pages/orders"
import SideNav from "./components/sidenav"
import Navbar from "./components/navbar"
import MenuPage from "./pages/menu"
import "./App.css"

const App = () => {
  return (
    <div className="App">
      <MenuPage/>
    </div>
  )
}

export default App;
