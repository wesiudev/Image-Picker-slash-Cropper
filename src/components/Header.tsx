import uservector from "../images/uservector.png";

function Header() {
  return (
    <>
      <div className="header">
        <div className="header__wrapper">
          <h1>Paznokietki</h1>
          <div className="header__wrapper__user">
            <img src={uservector} alt="" />
            <h4>Mój profil</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
