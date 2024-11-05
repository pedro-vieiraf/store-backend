import { useContext, useEffect } from "react";
import Context from "../context/Context";
import { Product } from "../types";
import axios from 'axios';
import { Link } from "react-router-dom";

function ProductsPage() {

    const { products, setProducts, token, loading, setLoading, cart, setCart } = useContext(Context);

    // Remover um produto do estoque
    const handleCart = async (productId: number) => { 
        try{
            const address = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.get(`${address}/products/${productId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            });
            const product = response.data;
            setCart([...cart, product]);
        } catch(err) {
            console.log('Error fetching data:', err);
            console.error(err)
        }
    }

    useEffect(() => {
        async function getProducts() {
            setLoading(true);
            try {
                const address = import.meta.env.VITE_BACKEND_URL;
                
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
                        <button onClick={ () => handleCart(product.id) }>Add to cart</button>

                    </div>
                ))}
            </div>
        </>
    )
}

export default ProductsPage