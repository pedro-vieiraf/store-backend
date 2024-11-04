import { useContext, useEffect } from "react";
import Context from "../context/Context";
import { Product } from "../types";
import axios from 'axios';

function ProductsPage() {

    const { products, setProducts, token } = useContext(Context);

    useEffect(() => {
        async function getProducts() {
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
                setProducts(data)
            } catch (err) {
                console.log('Error fetching data:', err);
                console.error(err)
            }
        }
        getProducts()
    }, [setProducts, token])
    
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
                    </div>
                ))}
            </div>
        </>
    )
}

export default ProductsPage