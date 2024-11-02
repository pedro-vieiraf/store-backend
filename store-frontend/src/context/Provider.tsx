import { useState } from "react";
import Context from "./Context"

type ProviderProps = {
    children : React.ReactNode
}

export type ProviderValues = {
    user: string;
    setUser: (email: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    onLogin: (email: string) => void;
    products: never[];
    setProducts: React.Dispatch<React.SetStateAction<never[]>>
}

function Provider({ children } : ProviderProps) {

    const [user, setUser] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const onLogin = (email: string) => {
        setUser(email);
    } 

    const values = {
        user,
        setUser,
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