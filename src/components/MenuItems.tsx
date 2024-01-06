import { useState } from 'react';
import Dropdown2 from './Dropdown';


// eslint-disable-next-line react-refresh/only-export-components
export const menuItems = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Topics',
    url: '/topics',
    submenu: [
      {
        title: 'Entertainment',
        url: 'entertainment',
      },
      {
        title: 'Business',
        url: 'business',
      },
      {
        title: 'Technology',
        url: 'technology',
      },
      {
        title: 'Science',
        url: 'science',
      },
    ],
  },
  {
    title: 'About',
    url: '/about',
  },
  {

    title: 'Saved Articles',
    url: '/saved',
  },
  {

    title: 'Login',
    url: '/login',
  },

];

const MenuItems = ({ items }: {items: any}) => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <li className="menu-items">
      {items.submenu ? (
        <>
          <button type="button" aria-haspopup="menu" aria-expanded={dropdown ? "true" : "false"} onClick = {()=> setDropdown((prev) => !prev)}>
            {items.title}{' '}
          </button>
         <Dropdown2 submenus={items.submenu} dropdown={dropdown}/>
        </>
      ) : (
        <a href={items.url}>{items.title}</a>
      )}
    </li>
  );
};

export default MenuItems;



