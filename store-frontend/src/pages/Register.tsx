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
        <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-eeire-black-200">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-left">
                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                    Create account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={ handleSubmit }>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium">Your name</label>
                        <input type="name" onChange={ handleChange } name="name" id="name" placeholder="Enter your name" className="border rounded-lg block w-full p-2.5"/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                        <input type="email" onChange={ handleChange } name="email" id="email" placeholder="Enter your email address" className="border rounded-lg block w-full p-2.5"/>
                    </div>
                    <div>
                        <label htmlFor="cpf" className="block mb-2 text-sm font-medium">Your CPF</label>
                        <input type="cpf" onChange={ handleChange } name="cpf" id="cpf" placeholder="Enter your CPF" className="border rounded-lg block w-full p-2.5"/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium">Your password</label>
                        <input type="password" onChange={ handleChange } name="password" id="password" placeholder="Enter your password" className="border rounded-lg block w-full p-2.5"/>
                    </div>
                    <button className="w-full text-white bg-saffron-200 hover:bg-saffron-400">Register</button>
                </form>
                <p className="text-sm font-light">Already registered? <Link to="/">Sign in</Link></p>    
            </div>
        </div>
    )
}

export default Register