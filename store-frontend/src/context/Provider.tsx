import { useState } from "react";
import Context from "./Context"

type ProviderProps = {
    children : React.ReactNode
}

export type ProviderValues = {
    user: string;
    setUser: (email: string) => void;
    setToken: React.Dispatch<React.SetStateAction<string>>
    token: string;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    onLogin: (email: string, token: string) => void;
    products: never[];
    setProducts: React.Dispatch<React.SetStateAction<never[]>>
}

function Provider({ children } : ProviderProps) {

    const [user, setUser] = useState("");
    const [token, setToken] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const onLogin = (email: string, token: string) => {
        setUser(email);
        setToken(token);
    } 

    const values = {
        user,
        setUser,
        token,
        setToken,
        products,
        setProducts,
        loading,
        setLoading,
        onLogin
    }

    return(
    <Context.Provider value={values}>
        {children}
    </Context.Provider>)
}

export default Provider;