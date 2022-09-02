import React from "react"
import Home from "@mui/icons-material/Home"
import FormatAlignJustify from "@mui/icons-material/FormatAlignJustify"
import AttachMoney from "@mui/icons-material/AttachMoney"
import HelpOutline from "@mui/icons-material/HelpOutline"

export const SidebarData = [
  {
    title: "Dashboard",
    path: "dashboard",
    icon: <Home/>,
  },
  {
    title: "Proposals",
    path: "proposals",
    icon: <FormatAlignJustify/>,
  },
  /*{
    title: "Grants",
    path: "grants",
    icon: <AttachMoney/>,
  },*/
  {
    title: "Help",
    path: "help",
    icon: <HelpOutline/>,
  }
];
