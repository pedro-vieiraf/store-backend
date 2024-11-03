import { useContext, useEffect } from "react";
import Context from "../context/Context";
import { Product } from "../types";
import axios from 'axios';


function ProductsPage() {

    const { products, setProducts } = useContext(Context);

    useEffect(() => {
        async function getProducts() {
            try {
                const address = 'http://172.18.0.2:3333';
                const token = 'oat_MQ.NEs2cEFuVnMwdGQ3aG9iVTlCeXVkenFOZDMtbXhwMUFyUWZFNG1ObTI3MDIzMTk4NDQ'; // Substitua pelo seu token real
        
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
    }, [setProducts])
    
    return (
        <>
            <h1>Products Page</h1>
            <h2>Não tem backend</h2>
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