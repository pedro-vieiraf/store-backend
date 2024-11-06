import { ChangeEvent, FormEvent, useContext } from "react"
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

function Login() {

    const { onLogin, email, setEmail } = useContext(Context);

    const navigate = useNavigate();

    let password = '';

    const handleChange = ({ target } : ChangeEvent<HTMLInputElement>) : void => {
        if(target.name === 'email') {
            setEmail(target.value)
        } else{
            password = target.value;
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const address = import.meta.env.VITE_BACKEND_URL;

        try {
            const response = await axios.post(`${address}/login`, {
                email,
                password
            });
            console.log("passou pra cá");
            
            const token = response.data.token.token;
            const id = response.data.user.id;
            onLogin(email, token, id);
            navigate('/products');
        } catch (err) {
            console.error('Error logging in:', err)
        }
        
    }
    // colocar uma mensagem de login inválido caso esteja errado

    return (
        <>
            <h1>Welcome!</h1>
            <form onSubmit={ handleSubmit }>
                <input type="email" onChange={ handleChange } name="email" id="email" placeholder="Enter your email address"/>
                <input type="password" onChange={ handleChange } name="password" id="password" placeholder="Enter your password"/>
                <button>Sign In</button>
                <p>New here? <Link to="/register">Sign up</Link></p>
            </form>
        </>
    )
}

export default Login