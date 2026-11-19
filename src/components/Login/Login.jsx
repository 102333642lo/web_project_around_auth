import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onLogin({ email, password });
    }

    return (
        <div className="login">
            <h2>Inicia sesión</h2>

            <form onSubmit={handleSubmit} >
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

                <button type="submit">Iniciar sesión</button>
            </form>

            <p>
                ¿Aún no eres miembro? <Link to="/signup">Regístrate aquí</Link>
            </p>
        </div>
    );
}

export default Login;
