import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

export const SidenavData = [
    {
        title: "Home",
        icon: <HomeIcon/>,
        link: "/home"
    },
    {
        title: "Menu",
        icon: <WidgetsIcon/>,
        link: "/menu"
    },
    {
        title: "Order",
        icon: <ReceiptIcon/>,
        link: "/order"
    },
    {
        title: "Inventory",
        icon: <InventorySharpIcon/>,
        link: "/inventory"
    },
    {
        title: "Profile",
        icon: <AccountCircleSharpIcon/>,
        link: "/profile"
    },
]