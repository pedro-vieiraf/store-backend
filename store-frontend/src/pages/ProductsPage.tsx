import { useContext, useEffect } from "react";
import Context from "../context/Context";
import { Product } from "../types";
import axios from 'axios';
import { Link } from "react-router-dom";

function ProductsPage() {

    const { products, setProducts, token, loading, setLoading } = useContext(Context);

    useEffect(() => {
        async function getProducts() {
            setLoading(true);
            try {
                const address = import.meta.env.VITE_BACKEND_URL;
                console.log('rodando em', address);
                
                const response = await axios.get(`${address}/products`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
        
                const data = response.data;
                setProducts(data);
                setLoading(false);
            } catch (err) {
                console.log('Error fetching data:', err);
                console.error(err)
            }
        }
        getProducts()
    }, [setProducts, setLoading, token])
    
    if(loading) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <h1>Products Page</h1>
            <div>
                {products.map((product: Product) => (                  
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <Link to={`/products/${product.id}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ProductsPage