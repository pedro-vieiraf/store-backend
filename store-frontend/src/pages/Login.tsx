import { ChangeEvent, FormEvent, useContext, useState } from "react"
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

    const { onLogin } = useContext(Context);

    const navigate = useNavigate();
    const [email, setEmail] = useState('');

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
            const token = response.data.token;
            onLogin(email, token);
            navigate('/products');
        } catch (err) {
            console.error('Error logging in:', err)
        }
        
    }


    return (
        <>
            <h1>Welcome!</h1>
            <form onSubmit={ handleSubmit }>
                <input type="email" onChange={ handleChange } name="email" id="email" placeholder="Enter your email address"/>
                <input type="password" onChange={ handleChange } name="password" id="password" placeholder="Enter your password"/>
                <p>New here?</p>
                <button>Sign In</button>
            </form>
        </>
    )
}

export default Login