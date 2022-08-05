import React from 'react'
import * as Icons from '@mui/icons-material'

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <Icons.Home/>,
  },
  {
    title: 'Proposals',
    path: '/proposals',
    icon: <Icons.FormatAlignJustify/>,
  },
  {
    title: 'Grants',
    path: '/grants',
    icon: <Icons.AttachMoney/>,
  },
  {
    title: 'Help',
    path: '/help',
    icon: <Icons.HelpOutline/>,
  }
];
