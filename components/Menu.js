import React from 'react';

import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

export const menu = [
  [
    {
      name: 'Home',
      link: '/',
      role: 'user',
      icon: <HomeIcon />
    }
  ],
  [
    {
      name: 'DA',
      link: '/Reports/DA',
      role: 'user',
      icon: <StoreIcon />
    },
    {
      name: 'Commandes',
      link: '/Reports/Orders',
      role: 'user',
      icon: <ShoppingBasketIcon />
    },
    {
      name: 'Expedition',
      link: '/Reports/Shipping',
      role: 'user',
      icon: <LocalShippingIcon />
    }
  ],
  [
    {
      name: 'Activités Achats',
      link: '/Reports/DA',
      role: 'siege',
      icon: <DescriptionIcon />
    },
    {
      name: 'Activités Logistiques',
      link: '/Reports/Orders',
      role: 'siege',
      icon: <DescriptionIcon />
    },
    {
      name: 'Activités Service',
      link: '/Reports/Shipping',
      role: 'siege',
      icon: <DescriptionIcon />
    }
  ],
  [
    {
      name: 'Utilisateurs',
      link: '/Users',
      role: 'admin',
      icon: <DescriptionIcon />
    }
  ]
];

export function getFilteredMenu(user) {
  if (!user) return [];
  const filtered = [];
  for (const submenu of menu) {
    const subfiltered = [];
    for (const item of submenu) {
      const possible = [item.role];
      if (item.role === 'user') {
        possible.push('siege');
        possible.push('admin');
      } else if (item.role === 'siege') {
        possible.push('admin');
      }
      if (possible.includes(user.role)) {
        subfiltered.push(item);
      }
    }
    if (subfiltered.length > 0) {
      filtered.push(subfiltered);
    }
  }
  return filtered;
}
