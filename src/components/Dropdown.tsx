
const Dropdown2 = ({ submenus, dropdown }: {submenus: any , dropdown: any}) => {
  return (

    <ul className={`dropdown ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu: any, index: number) => (
        <li key={index} >
          <a href={submenu.url}>{submenu.title}</a>
        </li>
      ))}
    </ul>

  );
};

export default Dropdown2;