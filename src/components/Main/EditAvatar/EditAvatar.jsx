import { useState, useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";


export default function EditAvatar() {
  const { onUpdateAvatar } = useContext(CurrentUserContext);
  const [avatarLink, setAvatarLink] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [touched, setTouched] = useState({ link: false, });

  const isValidUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const isFormValid = isValidUrl(avatarLink.trim());

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid || isSaving) return;

    setIsSaving(true);


    try {
      await onUpdateAvatar({
        avatar: avatarLink.trim(),
      });

      console.log("Guardando avatar:", {
        avatarLink,
      });
    } catch (error) {
      console.error("Error al guardar el avatar :", error);
    } finally {
      setIsSaving(false);//pone isSaving falso sin inportas si avia un erro
    }
  };

  return (
    <form
      action=""
      id="avatarForm"
      className="avatar__form-submit"
      noValidate
      onSubmit={handleSubmit}
    >
      <label>
        <input
          type="url"
          placeholder="Image link"
          id="avatarLink"
          name="avatar"
          className="avatar__img"
          required
          value={avatarLink}
          onChange={(event) => {
            setAvatarLink(event.target.value);
            setTouched((prev) => ({ ...prev, link: true }));
          }}
        />

        <span
          className={`form__input-error ${touched.link && avatarLink.length > 0 && !isValidUrl(avatarLink.trim())
            ? "form__input-error_active"
            : ""
            }`}
        >
          {touched.link && avatarLink.length > 0 && !isValidUrl(avatarLink.trim())
            ? "Por favor, introduce una URL válida (ejemplo: https://ejemplo.com/imagen.jpg)"
            : ""}
        </span>

      </label>

      <button
        id="saveAvatar"
        type="submit"
        className={`avatar__btn-submit ${isFormValid ? "activo" : ""}`}
        disabled={!isFormValid || isSaving}
      >
        {isSaving ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}