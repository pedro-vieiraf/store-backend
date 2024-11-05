import { useParams } from "react-router-dom";
import { Product } from "../types";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../context/Context";

function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const { token, setLoading, loading, setCart, cart } = useContext(Context);

    const handleCart = () => { // Remover um produto do estoque
        if(product) {
            const newCart = [...cart, product];
            setCart(newCart);

        }
    }

    useEffect(() => {
        async function getProduct() {
            setLoading(true);
            try{
                const address = import.meta.env.VITE_BACKEND_URL;

                const response = await axios.get(`${address}/products/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data;
                setProduct(data);
                setLoading(false);
            } catch(err) {
                console.log('Error fetching data:', err);
                console.error(err)
            }
        }
        getProduct();
    }, [id, token, setLoading]);

    if(!product) {
        return <h1>Product not found</h1>
    }

    if(loading) {
        return <h1>Loading...</h1>
    }

    return (
        <>
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={ handleCart }>Add to cart</button>
        </div>
        </>
    );
}

export default ProductDetails;