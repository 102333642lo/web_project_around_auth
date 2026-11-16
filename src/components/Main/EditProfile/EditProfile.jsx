import { useState, useEffect, useContext } from "react";
import CurrentUserContext from '../../../contexts/CurrentUserContext';

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext); // obtiene objeto currentUser
  const [name, setName] = useState(currentUser.name || "");
  const [bio, setBio] = useState(currentUser.about || "");
  const [isSaving, setIsSaving] = useState(false);
  const [touched, setTouched] = useState({ name: false, bio: false, });

  const isNameValid =
    name.trim().length >= 2 &&
    name.trim().length <= 40;
  const isBioValid =
    bio.trim().length >= 2 &&
    bio.trim().length <= 150;


  const isFormValid = isNameValid && isBioValid;

  useEffect(() => {
    setName(currentUser.name || "");
    setBio(currentUser.about || "");
  }, [currentUser]);




  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid || isSaving) return;

    setIsSaving(true);

    try {
      await handleUpdateUser({
        name: name.trim(),
        about: bio.trim(),
      });

      console.log("Guardando perfil:", {
        name,
        bio,
      });
    } catch (error) {
      console.error("Error al guardar el perfil:", error);
    } finally {
      setIsSaving(false);//pone isSaving falso sin inportas si avia un erro
    }
  };

  return (
    <form
      className="editor__form-edit"
      name="profile"
      id="formProfile"
      noValidate
      onSubmit={handleSubmit}
    >
      <label>
        <input
          type="text"
          placeholder="Nombre"
          id="name"
          name="name"
          className="editor__text"
          maxLength="40"
          minLength="2"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setTouched((prev) => ({ ...prev, name: true }));
          }}
          required
        />

        <span
          className={`form__input-error name-error ${touched.name && !isNameValid
            ? "form__input-error_active"
            : ""
            }`}
        >
          {touched.name && !isNameValid
            ? "El nombre debe tener entre 2 y 40 caracteres."
            : ""}
        </span>

      </label>

      <label>
        <input
          type="text"
          placeholder="Acerca de mí"
          id="bio"
          name="bio"
          className="editor__text"
          maxLength="150"
          minLength="2"
          value={bio}
          onChange={(event) => {
            setBio(event.target.value);
            setTouched((prev) => ({ ...prev, bio: true }));
          }}
          required
        />

        <span
          className={`form__input-error bio-error ${touched.bio && !isBioValid
            ? "form__input-error_active"
            : ""
            }`}
        >
          {touched.bio && !isBioValid
            ? "La descripción debe tener entre 2 y 150 caracteres."
            : ""}
        </span>

      </label>

      <button
        id="save"
        type="submit"
        className={`editor__btn-submit ${isFormValid ? "activo" : ""}`}
        disabled={!isFormValid || isSaving}
      >
        {isSaving ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );

}