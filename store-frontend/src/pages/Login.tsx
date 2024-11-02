import { ChangeEvent, FormEvent, useContext, useState } from "react"
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";

function Login() {

    const { onLogin } = useContext(Context);

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [, setPassword] = useState('');

    const handleChange = ({ target } : ChangeEvent<HTMLInputElement>) : void => {
        if(target.name === 'email') {
            setEmail(target.value)
        } else{
            setPassword(target.value)
        }
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onLogin(email);
        navigate('/products');
        
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