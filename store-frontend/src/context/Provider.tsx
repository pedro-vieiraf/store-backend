import { useState } from "react";
import Context from "./Context"
import { Product } from "../types";

type ProviderProps = {
    children : React.ReactNode
}

export type ProviderValues = {
    user: string;
    setUser: (email: string) => void;
    setToken: React.Dispatch<React.SetStateAction<string>>
    token: string;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    onLogin: (email: string, token: string) => void;
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    cart: Product[];
    setCart: React.Dispatch<React.SetStateAction<Product[]>>
}

function Provider({ children } : ProviderProps) {

    const [user, setUser] = useState("");
    const [token, setToken] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [cart, setCart] = useState<Product[]>([]);

    const onLogin = (email: string, token: string) => {
        setUser(email);
        setToken(token);
    } 

    const values = {
        user,
        setUser,
        token,
        setToken,
        email,
        setEmail,
        products,
        setProducts,
        cart,
        setCart,
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