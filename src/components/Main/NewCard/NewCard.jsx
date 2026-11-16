import { useState } from "react";

export default function NewCard({ onAddPlaceSubmit }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [touched, setTouched] = useState({
    title: false,
    link: false,
  });

  const isTitleValid =
    title.trim().length >= 2 &&
    title.trim().length <= 30;


  const isValidUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };
  const isFormValid = isTitleValid && isValidUrl(link.trim());

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid || isSaving) return;

    setIsSaving(true);
    try {
      await onAddPlaceSubmit({
        name: title.trim(),
        link: link.trim(),
      });

      console.log("Tarjeta guardada correctamente");
    } catch (error) {
      console.error("Error al guardar la tarjeta:", error);
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <form
      className="submit__form-submit"
      name="card-form"
      id="updateFormS"
      noValidate
      onSubmit={handleSubmit}
    >
      <label>
        <input
          type="text"
          placeholder="Título"
          id="title"
          name="title"
          className="submit__name"
          required
          minLength="2"
          maxLength="30"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setTouched((prev) => ({ ...prev, title: true }));
          }
          }
        />


        <span
          className={`form__input-error ${touched.title > 0 && !isTitleValid
            ? "form__input-error_active"
            : ""
            }`}
        >
          {touched.title > 0 && !isTitleValid
            ? "El título debe tener entre 2 y 30 caracteres"
            : ""}
        </span>



      </label>

      <label>
        <input
          type="url"
          placeholder="Enlace a la imagen"
          id="link"
          name="link"
          className="submit__img"
          required
          value={link}
          onChange={(event) => {
            setLink(event.target.value);
            setTouched((prev) => ({ ...prev, link: true }));
          }}
        />

        <span
          className={`form__input-error ${touched.link && link.length > 0 && !isValidUrl(link.trim())
            ? "form__input-error_active"
            : ""
            }`}
        >
          {touched.link && link.length > 0 && !isValidUrl(link.trim())
            ? "Introduce un enlace válido"
            : ""}
        </span>
      </label>

      <button
        id="save"
        type="submit"
        className={`submit__btn-submit ${isFormValid ? "activo" : ""}`}
        disabled={!isFormValid || isSaving}
      >
        {isSaving ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}