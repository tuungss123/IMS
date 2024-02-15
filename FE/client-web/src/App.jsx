import React from 'react';
import {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom'

//Site Pages
import InventoryPage from "./pages/Cafe/inventory"
import RootLayout from './layouts/root-layout'
import ProfilePage from './pages/Cafe/profile'
import SignIn from './pages/sign-in'
import ArchivePage from './pages/Cafe/archive'
import CafeInventoryPage from './pages/Cafe/menu'
import "./App.css"

const App = () => {
  return (
    <Router>
      <Routes>
        {/* PATHS UNDER LOGGED IN USER */}
        <Route path="/" element={<RootLayout />}>
          <Route path="transfer_history" element={<InventoryPage />} />
          <Route path="archive" element={<ArchivePage />} />
          <Route path="cafeinventory" element={<CafeInventoryPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* LOGIN PATH */}
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </Router>
  )
}

export default App;
