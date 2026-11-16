
import { useState, useEffect } from "react";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import CurrentUserContext from "../contexts/CurrentUserContext";

import api from "../utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  //* name: "Jacques Cousteau",
  //*bio: "Explorador",

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.error("Error al obtener las tarjetas:", err);
      });
  }, []);


  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }
  function handleClosePopup() {
    setPopup(null);
  }


  useEffect(() => {
    (async () => {
      await api.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
    })();
  }, []);

  async function handleUpdateUser(data) {
    try {
      const newData = await api.editUserInfo(data);
      setCurrentUser(newData);
      handleClosePopup();
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      throw error;
    }
  }
  async function onUpdateAvatar(data) {
    try {
      const newData = await api.editAvatar(data);
      setCurrentUser(newData);
      handleClosePopup();
    } catch (error) {
      console.error("Error al actualizar el avatar :", error);
      throw error;
    }
  }

  async function handleLikeCard(cardId) {
    const card = cards.find((item) => item._id === cardId);

    if (!card) return;

    const isLiked = card.isLiked;

    try {
      const updatedCard = isLiked
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




  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, handleUpdateUser, onUpdateAvatar }}>
        <Header />
        <Main
          cards={cards}
          onCardLike={handleLikeCard}
          onCardDelete={handleCardDelete}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          popup={popup} />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
