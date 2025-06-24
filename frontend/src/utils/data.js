import { LuLayoutDashboard, LuHandCoins, LuWalletMinimal, LuHistory, LuBot, LuLogOut } from 'react-icons/lu'


export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: 'Dashboard',
        icon: LuLayoutDashboard,
        path: '/dashboard',
    },
    {
        id: "02",
        label: 'Income',
        icon: LuWalletMinimal,
        path: '/income',
    },
    {
        id: "03",
        label: 'Expense',
        icon: LuHandCoins,
        path: '/expense',
    },
    {
        id: "04",
        label: 'All Transactions',
        icon: LuHistory,
        path: '/all-transactions',
    },
    {
        id: "05",
        label: 'Budget Manager',
        icon: LuBot,
        path: '/budget',
    },
    {
        id: "06",
        label: 'AI Advisor',
        icon: LuBot,
        path: '/ai-advisor',
    },
    // {
    //     id: "07",
    //     label: 'Logout',
    //     icon: LuLogOut  ,
    //     path: '/login',
    // },
    
]