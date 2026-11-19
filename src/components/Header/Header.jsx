
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../../blocks/header.css";

function Header({ isLoggedIn, currentUser, onLogout, authPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    setIsMenuOpen(false);
    onLogout();
  }

  return (
    <header className={`header ${isMenuOpen ? "header_menu-open" : ""}`}>
      <div className="header__top">
        <div className="header__titulo">
          Around <span className="header__subtitulo">The U.S.</span>
        </div>

        {isLoggedIn ? (
          <>
            <div className="header__user">
              <span>{currentUser.email}</span>
              <button
                className="header__logout"
                type="button"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </div>

            <button
              className="header__menu-button"
              type="button"
              aria-label="Abrir menú"
              onClick={() => setIsMenuOpen(true)}
            >
              ☰
            </button>
          </>
        ) : (
          <Link
            className="header__link"
            to={authPage === "signin" ? "/signup" : "/signin"}
          >
            {authPage === "signin" ? "Regístrate" : "Inicia sesión"}
          </Link>
        )}
      </div>

      {isLoggedIn && isMenuOpen && (
        <div className="header__mobile-menu">
          <div className="header__mobile-user">
            <span>{currentUser.email}</span>
            <button
              className="header__logout"
              type="button"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>

          <hr className="header__linea" />

          <div className="header__mobile-bottom">
            <div className="header__titulo">
              Around <span className="header__subtitulo">The U.S.</span>
            </div>

            <button
              className="header__close-button"
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setIsMenuOpen(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <hr className="header__linea" />
    </header>
  );
}

export default Header;
