import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import ImagePopup from "../ImagePopup/ImagePopup"



export default function Card(props) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link, isLiked } = props.card;
  const { handleOpenPopup, handleLikeCard } = props;



  const imageComponent = {
    title: "",
    children: <ImagePopup card={props.card} />,
    closeClassName: "image__close",
    popupClassName: "image_modal ",
    formClassName: "image__container",
  };
  const { onCardDelete } = props;

  function handleDeleteClick() {
    onCardDelete(props.card);
  }

  return (
    <li className="card">
      <div className="card__content">

        <img className="card__image"
          src={link} alt={name}
          onClick={() => handleOpenPopup(imageComponent)} />
        {currentUser && (
          <>
            <button
              aria-label="Delete card"
              className="card__delet"
              type="button"
              onClick={handleDeleteClick}
            />

            <h2 className="card__footer">{name}</h2>

            <button
              aria-label="Like card"
              type="button"
              className={`card__like ${isLiked ? "card__like_active" : ""}`}
              onClick={() => handleLikeCard(props.card._id)}
            />
          </>
        )}
      </div>
    </li>
  );
}