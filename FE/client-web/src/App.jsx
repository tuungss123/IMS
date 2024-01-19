import React from "react"
import SignIn from "./pages/sign-in"
import HomePage from "./pages/home"
import InventoryPage from "./pages/inventory"
import OrdersPage from "./pages/orders"
import SideNav from "./components/sidenav"
import "./App.css"

const App = () => {
  return (
    <div className="App">
      <SideNav/>
    </div>
  )
}

export default App;
