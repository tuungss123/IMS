import HomeIcon from '@mui/icons-material/Home';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Build from '@mui/icons-material/Build';
import Logout from '@mui/icons-material/Logout';

export const SidenavData = [
    {
        title: "Inventory",
        icon: <WidgetsIcon/>,
        link: "cafeinventory"
    },
    {
        title: "Stock Analysis",
        icon: <ReceiptIcon/>,
        link: "analysis"
    },
    {
        title: "Notifications",
        icon: <NotificationsActiveIcon/>,
        link: "notifications"
    },
    {
        title: "Transaction History",
        icon: <InventorySharpIcon/>,
        link: "transfer_history"
    },
    // {
    //     title: "Profile",
    //     icon: <AccountCircleSharpIcon/>,
    //     link: "/profile"
    // },
    // {
    //     title: "Settings",
    //     icon: <Build/>,
    //     link: "/profile"
    // },
    {
        title: "Sign Out",
        icon: <Logout/>,
        link: "/"
    },
]