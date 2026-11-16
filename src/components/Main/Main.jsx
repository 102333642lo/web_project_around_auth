import avatar from "../../images/avatar.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Popup from "./Popup/Popup";
import NewCard from "./NewCard/NewCard";
import EditProfile from "./EditProfile/EditProfile";
import EditAvatar from "./EditAvatar/EditAvatar";
import Card from "./Card/Card";
import RemoveCard from "./RemoveCard/RemoveCard";


export default function Main({ cards, onCardLike, onCardDelete, onAddPlaceSubmit, onOpenPopup, onClosePopup, popup, }) {

  const { currentUser } = useContext(CurrentUserContext);


  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
    closeClassName: "submit__close",
    popupClassName: "submit",
    formClassName: "submit__form",
    titleClassName: "submit__tiulo",
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
    closeClassName: "editor__close",
    popupClassName: "editor",
    formClassName: "editor__form",
    titleClassName: "editor__tiulo",
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
    closeClassName: "avatar__close",
    popupClassName: "avatarEdit",
    formClassName: "avatar__form",
    titleClassName: "avatar__tiulo",
  };


  function handleOpenRemovePopup(card) {
    onOpenPopup({
      title: "¿Estás seguro/a?",
      children: (
        <RemoveCard
          onSubmit={() => onCardDelete(card)}
        />
      ),
      closeClassName: "delet__close",
      popupClassName: "delet",
      formClassName: "delet__card",
      titleClassName: "delet__tiulo",
    });
  }


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__imagen"
            src={currentUser.avatar || avatar}
            alt="imagen de perfil"
          />
          <button
            id="openAvatar"
            type="button"
            className="avatar__btnedit"
            onClick={() => onOpenPopup(editAvatarPopup)}
          ></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__usuario" id="usuareProfile">
            {currentUser.name || ""}
          </h1>


          <p className="profile__description" id="bioProfile">
            {currentUser.about || ""}
          </p>
          <button
            id="openEdit"
            type="button"
            className="profile__btnedit"
            onClick={() => onOpenPopup(editProfilePopup)}
          ></button>
        </div>

        <button
          id="openSutmit"
          type="button"
          className="profile__btnadd"
          onClick={() => onOpenPopup(newCardPopup)}
        ></button>
      </section>

      <section className="post">
        <ul id="cards-container" className="post__card">
          {cards.map((card) => (
            <Card key={card._id} card={card} handleOpenPopup={onOpenPopup} handleLikeCard={onCardLike}
              handleOpenRemovePopup={handleOpenRemovePopup} onCardDelete={onCardDelete}
            />))}
        </ul>
      </section>

      {popup && (
        <Popup
          onClose={onClosePopup}
          title={popup.title}
          closeClassName={popup.closeClassName}
          popupClassName={popup.popupClassName}
          formClassName={popup.formClassName}
          titleClassName={popup.titleClassName}
        >
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
