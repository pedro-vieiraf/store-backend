import { useContext, useEffect } from "react";
import Context from "../context/Context";
import { Product } from "../types";


function ProductsPage() {

    const { products, setProducts } = useContext(Context);

    useEffect(() => {
        async function getProducts() {
            try {
                const address = 'http://backend'
                const response = await fetch(`${address}/products`)
                const data = await response.json();
                setProducts(data);
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
            <h2>Não tem backend ainda</h2>
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