import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register({ onRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onRegister({ email, password });
    }

    return (
        <div className="register">
            <h2>Regístrate</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Registrarse</button>
            </form>

            <p>
                ¿Ya eres miembro? <Link to="/signin">Inicia sesión aquí</Link>
            </p>
        </div>
    );
}

export default Register;
