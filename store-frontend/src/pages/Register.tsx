import axios from "axios";
import { ChangeEvent, FormEvent, useContext } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";

function Register() {

    const { email, setEmail, onLogin, cpf, setCPF, name, setName } = useContext(Context);

    const navigate = useNavigate();

    let password = '';

    const handleChange = ({ target } : ChangeEvent<HTMLInputElement>) : void => {
        if(target.name === 'email') {
            setEmail(target.value)
        } 
        if(target.name === 'password') {
            password = target.value;
        }
        if(target.name === 'cpf') {
            setCPF(target.value)
        }
        if(target.name === 'name') {
            setName(target.value)
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
            console.log('passou do register');
            
            onLogin(email, token, id);

            const customerResponse = await axios.post(`${address}/customers`, {
                name,
                userId: id,
                cpf
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('passou do customer');
            
            console.log(customerResponse.data);
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
    </>
    )
}

export default Register