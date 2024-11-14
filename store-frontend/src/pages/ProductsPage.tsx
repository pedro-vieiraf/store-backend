import { useContext, useEffect } from "react";
import Context from "../context/Context";
import { Product } from "../types";
import axios from 'axios';
import { Link } from "react-router-dom";

function ProductsPage() {

    const { products, setProducts, token, loading, setLoading, cart, setCart } = useContext(Context);

    const handleCart = async (productId: number) => { 
        try {
            const productIndex = products.findIndex(product => product.id === productId);
            if (productIndex === -1 || products[productIndex].stock <= 0) {
                console.log('Produto fora de estoque');
                return;
            }
    
            const updatedProduct = { ...products[productIndex], stock: products[productIndex].stock - 1 };
            
            const updatedProducts = [...products];
            updatedProducts[productIndex] = updatedProduct;
            setProducts(updatedProducts);
            
            setCart([...cart, updatedProduct]);
    
        } catch (err) {
            console.log('Erro ao adicionar produto ao carrinho:', err);
            console.error(err);
        }
    };

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

                const cartCountMap: { [id: number]: number } = {};
                cart.forEach((item) => {
                    cartCountMap[item.id] = (cartCountMap[item.id] || 0) + 1;
                });
    
                const updatedData = data.map((product: Product) => {
                    const cartQuantity = cartCountMap[product.id] || 0;
                    return { ...product, stock: product.stock - cartQuantity };
                });
    
                setProducts(updatedData);

            } catch (err) {
                console.log('Error fetching data:', err);
                console.error(err)
            } finally {
                setLoading(false);
            }
        }
        getProducts()
    }, [setProducts, setLoading, token, cart])
    
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