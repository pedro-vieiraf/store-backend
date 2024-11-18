import axios from "axios";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Context from "../context/Context";
import { Link, useNavigate } from "react-router-dom";

function Register() {

    const { email, setEmail, onLogin, cpf, setCPF, name, setName } = useContext(Context);
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleChange = ({ target } : ChangeEvent<HTMLInputElement>) : void => {
        if(target.name === 'email') {
            setEmail(target.value);
        } 
        if(target.name === 'password') {
            setPassword(target.value);
        }
        if(target.name === 'cpf') {
            setCPF(target.value);
        }
        if(target.name === 'name') {
            setName(target.value);
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
            const token = response.data.token.token;
            const id = response.data.user.id;
            
            onLogin(email, token, id);

            await axios.post(`${address}/customers`, {
                name,
                userId: id,
                cpf
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            setPassword('')
            navigate('/products');
        } catch (err) {
            console.error('Error registering:', err)
        }
        
    }

    return (
        <>
        <h1>Create account</h1>
        <form onSubmit={ handleSubmit }>
            <input type="name" onChange={ handleChange } name="name" id="name" placeholder="Enter your name"/>
            <input type="email" onChange={ handleChange } name="email" id="email" placeholder="Enter your email address"/>
            <input type="cpf" onChange={ handleChange } name="cpf" id="cpf" placeholder="Enter your CPF"/>
            <input type="password" onChange={ handleChange } name="password" id="password" placeholder="Enter your password"/>
            <button>Register</button>
        </form>
        <p>Already registered? <Link to="/">Sign in</Link></p>
        
    </>
    )
}

export default Register