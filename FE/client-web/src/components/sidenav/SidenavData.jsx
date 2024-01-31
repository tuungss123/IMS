import HomeIcon from '@mui/icons-material/Home';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

export const SidenavData = [
    {
        title: "Home",
        icon: <HomeIcon/>,
        link: "/"
    },
    {
        title: "Inventory",
        icon: <WidgetsIcon/>,
        link: "/cafeinventory"
    },
    {
        title: "Archive",
        icon: <ReceiptIcon/>,
        link: "/archive"
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