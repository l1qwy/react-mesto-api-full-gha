import { Link } from "react-router-dom";
import Image from "../../images/logo.png";

export default function Header({ name, userData }) {
  function onSignOut() {
    localStorage.removeItem("jwt");
  }

  return (
    <header
      className={
        name === "signIn" || name === "signUp" ? "header__reg" : "header"
      }
    >
      <img
        className="header__logo header__logo_reg"
        src={Image}
        alt="Здесь должено быть лого страницы 'Места'"
      />
      {name === "signIn" || name === "signUp" ? (
        <Link
          to={name === "signUp" ? "/signin" : "/signup"}
          className="header__link"
        >
          {name === "signUp" ? "Войти" : "Регистрация"}
        </Link>
      ) : (
        <div className="header__userData">
          <p className="header__userEmail">{userData}</p>
          <Link to={"/signin"} className="header__link" onClick={onSignOut}>
            Выйти
          </Link>
        </div>
      )}
    </header>
  );
}
