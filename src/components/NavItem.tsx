interface Item {
  image: any;
  itemName: string;
}

const NavItem = ({ image, itemName }: Item) => {
  return (
    <li className={itemName === "Profil" ? "noBorder liCurrent" : ""}>
      <img src={image} alt="" /> {itemName}
    </li>
  );
};

export default NavItem;
