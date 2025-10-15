import { aboutSidebarNavItems, aboutUsContents } from "./AboutUs";
import { governanceContents, governanceSidebarNavItems } from "./Governance";
import { studentContents, studentSidebarNavItems } from "./Students";

export const navItems = [
    {
        id: 1,
        title: "Home",
        path: '/'
    },
    {
        id: 2,
        title: "About Us",
        path: '/about',
        contents:aboutUsContents,
        sidebarItems:aboutSidebarNavItems
    },
    {
        id: 3,
        title: "Academics",
        path: '/academics'
    },
    {
        id: 4,
        title: "Governance",
        path: '/governance',
        contents:governanceContents,
        sidebarItems:governanceSidebarNavItems
    },
    {
        id: 5,
        title: "Research",
        path: '/research'
    },
    {
        id: 6,
        title: "Student",
        path: '/student',
        contents:studentContents,
        sidebarItems:studentSidebarNavItems
    },
    {
        id: 7,
        title: "IQAC",
        path: '/iqac'
    },
    {
        id: 8,
        title: "Incubation Center",
        path: '/incubation-center'
    },
    {
        id: 9,
        title: "International Affairs Cell",
        path: '/international-affairs'
    },
    {
        id: 10,
        title: "NEP2020@SUK",
        path: '/nep'
    },
    {
        id: 11,
        title: "Disclosure",
        path: '/disclosure'
    }
]