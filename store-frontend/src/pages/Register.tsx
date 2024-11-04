import axios from "axios";
import { ChangeEvent, FormEvent, useContext } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";

function Register() {

    const { email, setEmail, onLogin } = useContext(Context);

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
            const response = await axios.post(`${address}/register`, {
                email,
                password
            });
            const token = response.data.token;
            onLogin(email, token);
            navigate('/products');
        } catch (err) {
            console.error('Error registering:', err)
        }
        
    }

    return (
        <>
        <h1>Create account</h1>
        <form onSubmit={ handleSubmit }>
            <input type="email" onChange={ handleChange } name="email" id="email" placeholder="Enter your email address"/>
            <input type="password" onChange={ handleChange } name="password" id="password" placeholder="Enter your password"/>
            <button>Register</button>
        </form>
    </>
    )
}

export default Register