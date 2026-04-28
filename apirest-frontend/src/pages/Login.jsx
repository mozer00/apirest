import { Button } from "../components/common/Button";
import Input from "../components/common/Input";
import Form from "../components/common/Form";
import Navbar from "../components/layout/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";


function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({email: "", password: ""});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        await api
            .post("/login", formData)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.response?.data?.message ?? "Erro ao efetuar login.");
                setIsLoading(false);
            });
    };

    return(
        <div>
            <Navbar />
            <div className="main_feed">
                <div className="feed_form">
                    <h1>Entrar</h1>
                    <p>Acesse o painel com suas credenciais.</p>

                    <Form>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Email"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value})}
                            />
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            placeholder="Senha"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value})}
                            />
                            <Button onClick={handleSubmit}>
                                {isLoading ? "Entrando..." : "Entrar"}
                            </Button>
                        </Form>    
                </div>
            </div>
        </div>
    );
}

export default Login;