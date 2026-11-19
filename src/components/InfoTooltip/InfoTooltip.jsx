import "./InfoTooltip.css";
function InfoTooltip({ isOpen, onClose, isSuccess }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="popup popup_opened">
            <div className="popup__container infotooltip__container">
                <button
                    className="popup__close"
                    type="button"
                    aria-label="Cerrar"
                    onClick={onClose}
                />

                {isSuccess ? (
                    <>
                        <div className="infotooltip__icon infotooltip__icon_success">
                            ✓
                        </div>
                        <h2 className="infotooltip__message">
                            ¡Correcto! Te has registrado.
                        </h2>
                    </>
                ) : (
                    <>
                        <div className="infotooltip__icon infotooltip__icon_error">
                            ×
                        </div>
                        <h2 className="infotooltip__message">
                            Uy, algo salió mal. Por favor, inténtalo de nuevo.
                        </h2>
                    </>
                )}
            </div>
        </div>
    );
}

export default InfoTooltip;

