import { ChangeEvent, FormEvent, useState } from "react"

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = ({ target } : ChangeEvent<HTMLInputElement>) : void => {
        console.log(target);
        console.log(target.value);
        
        
        if(target.name === 'email') {
            setEmail(target.value)
        } else{
            setPassword(target.value)
        }
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(email, password);
        
    }


    return (
        <>
            <h1>Welcome!</h1>
            <form onSubmit={ handleSubmit }>
                <input type="email" onChange={ handleChange } name="email" id="email" placeholder="Enter your email address"/>
                <input type="password" onChange={ handleChange } name="password" id="password" placeholder="Enter your password"/>
                <p>New here?</p>
                <button>Login</button>
            </form>
        </>
    )
}

export default Login