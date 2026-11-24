import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute";

import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import { register, authorize, getUserInfo as getAuthUserInfo, } from "../utils/auth";
import { getToken, setToken, removeToken } from "../utils/token";


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [registrationPopup, setRegistrationPopup] = useState(null);


  const navigate = useNavigate();

  // Cargar las tarjetas
  async function loadCards() {
    const cardsData = await api.getInitialCards();
    setCards(cardsData);
  }

  // Comprobar si existe un token válido

  // Comprobar si existe un token válido
  useEffect(() => {
    async function checkToken() {
      const token = getToken();

      if (!token) {
        setIsCheckingToken(false);
        return;
      }

      try {
        const authData = await getAuthUserInfo(token);
        const profileData = await api.getUserInfo();

        setCurrentUser({
          ...profileData,
          email: authData.data.email,
        });

        setIsLoggedIn(true);

        // La carga de tarjetas es independiente de la sesión
        try {
          await loadCards();
        } catch (error) {
          console.error("Error al cargar las tarjetas:", error);
        }

      } catch (error) {
        console.error("Error al comprobar la sesión:", error);
        removeToken();
      } finally {
        setIsCheckingToken(false);
      }
    }

    checkToken();
  }, []);


  // Registro
  async function handleRegister({ email, password }) {
    try {
      await register(email, password);
      setRegistrationPopup({ isSuccess: true });
      navigate("/signin");
    } catch (error) {
      console.error("Error al registrarse:", error);
      setRegistrationPopup({ isSuccess: false });
    }
  }

  // Inicio de sesión
  async function handleLogin({ email, password }) {
    setLoginError("");
    try {
      const data = await authorize(email, password);

      if (!data.token) {
        throw new Error("No se recibió el token");
      }

      setToken(data.token);

      const authData = await getAuthUserInfo(data.token);
      const profileData = await api.getUserInfo();
      setCurrentUser({
        ...profileData,
        email: authData.data.email,
      });

      setIsLoggedIn(true);
      navigate("/");

      try {
        await loadCards();
      } catch (error) {
        console.error("Error al cargar las tarjetas:", error);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      removeToken();
      setLoginError(
        "No se pudo iniciar sesión. Comprueba tu correo y contraseña."
      );
    }
  }

  // Cerrar sesión
  function handleLogout() {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser({});
    setCards([]);
    navigate("/signin");
  }

  // Abrir ventana emergente
  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  // Cerrar ventana emergente
  function handleClosePopup() {
    setPopup(null);
  }

  // Actualizar perfil
  async function handleUpdateUser(data) {
    try {
      const newData = await api.editUserInfo(data);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        ...newData,
      }));
      handleClosePopup();
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      throw error;
    }
  }

  // Actualizar avatar
  async function onUpdateAvatar(data) {
    try {
      const newData = await api.editAvatar(data);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        ...newData,
      }));
      handleClosePopup();
    } catch (error) {
      console.error("Error al actualizar el avatar:", error);
      throw error;
    }
  }

  // Dar o quitar like
  async function handleLikeCard(cardId) {
    const card = cards.find((item) => item._id === cardId);

    if (!card) return;

    try {
      const updatedCard = card.isLiked
        ? await api.deleteLikeCard(cardId)
        : await api.likeCard(cardId);

      setCards((currentCards) =>
        currentCards.map((item) =>
          item._id === cardId ? updatedCard : item
        )
      );
    } catch (error) {
      console.error("Error al actualizar el like:", error);
    }
  }

  // Eliminar tarjeta
  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);

      setCards((currentCards) =>
        currentCards.filter(
          (currentCard) => currentCard._id !== card._id
        )
      );

      handleClosePopup();
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error);
    }
  }

  // Añadir tarjeta
  async function handleAddPlaceSubmit(placeData) {
    try {
      const newCard = await api.addCard({
        name: placeData.name,
        link: placeData.link,
      });

      setCards((currentCards) => [newCard, ...currentCards]);
      handleClosePopup();
    } catch (error) {
      console.error("Error al añadir la tarjeta:", error);
      throw error;
    }
  }

  if (isCheckingToken) {
    return null;
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          handleUpdateUser,
          onUpdateAvatar,
        }}
      >
        <Routes>
          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <>
                  <Header
                    isLoggedIn={false}
                    currentUser={currentUser}
                    authPage="signin"
                  />
                  <Login
                    onLogin={handleLogin}
                    errorMessage={loginError}
                  />
                </>
              )
            }
          />

          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (<>
                <Header
                  isLoggedIn={false}
                  currentUser={currentUser}
                  authPage="signup"
                />
                <Register onRegister={handleRegister} />
              </>
              )
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <Header
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    onLogout={handleLogout}
                  />

                  <Main
                    cards={cards}
                    onCardLike={handleLikeCard}
                    onCardDelete={handleCardDelete}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    popup={popup}
                  />

                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <InfoTooltip
          isOpen={Boolean(registrationPopup)}
          onClose={() => setRegistrationPopup(null)}
          isSuccess={registrationPopup?.isSuccess}
        />
      </CurrentUserContext.Provider>
    </div >
  );
}

export default App;
