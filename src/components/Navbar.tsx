import { menuItems } from "./MenuItems";
import MenuItems from './MenuItems';


const NavbarView = () => {
    return (
       <nav className="navbar navbar-expand-lg navbar-dark">
         <ul className="menus">
             {menuItems.map((menu,index) => {
               return <MenuItems items={menu} key={index} />
             })}
        </ul>
       </nav>
    );
  };
  
  export default NavbarView;