import { ChangeEvent, FormEvent, useContext, useState } from "react"
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

function Login() {

    const { onLogin, email, setEmail } = useContext(Context);
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleChange = ({ target } : ChangeEvent<HTMLInputElement>) : void => {
        if(target.name === 'email') {
            setEmail(target.value)
        } else{
            setPassword(target.value);
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
            setPassword('');
            navigate('/products');
        } catch (err) {
            console.error('Error logging in:', err)
        }
        
    }
    // colocar uma mensagem de login inválido caso esteja errado

    return (
        <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-eeire-black-200">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-left"> 
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={ handleSubmit }>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input type="email" onChange={ handleChange } name="email" id="email" placeholder="Enter your email address" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input type="password" onChange={ handleChange } name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"/>
                    </div>
                    <button className="w-full text-white bg-saffron-200 hover:bg-saffron-400">Sign In</button>
                    <p className="text-sm font-light text-gray-500">Don't have an account yet? <Link to="/register">Sign up</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login