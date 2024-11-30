import { useContext } from "react";
import Context from "../context/Context";
import { CartProduct, Product } from "../types";
import axios from "axios";

function ShoppingCart() {
    const { cart, setCart, id, token } = useContext(Context);

    function groupCartItems(cart: Product[]): (Product & { quantity: number })[] {
        const groupedItems: { [key: number]: Product & { quantity: number } } = {};
    
        cart.forEach((item) => {
            if (groupedItems[item.id]) {
                groupedItems[item.id].quantity += 1;
            } else {
                groupedItems[item.id] = { ...item, quantity: 1 };
            }
        });

        return Object.values(groupedItems);
    }
    const handleCheckout = async () => {
        const address = import.meta.env.VITE_BACKEND_URL;
        const updatedCart = groupCartItems(cart);

        try {
            const salesData = updatedCart.map((product: CartProduct) => ({
                customerId: id,
                productId: product.id,
                quantity: product.quantity
            }))  
   
            await Promise.all(
                salesData.map((sale) =>
                    axios.post(`${address}/sales`, sale, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }),                   
                )
            );
            setCart([])
        } catch (err) {
            console.error('Error checking out:', err)
        }
    }
    
    const handleRemove = (index: number) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    }

    const totalPrice = cart.reduce((acc: number, product: Product) => acc += product.price, 0);

    return (
        <div>
            <h1>Shopping Cart</h1>
            { cart.length === 0 ? (
                <p>Your cart is empty.</p>
                ) : (
                    <>
                        <ul>
                        {cart.map((product: Product, index: number) => (
                            <li key={index}>
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <p>Price: ${product.price}</p>
                                <button onClick={() => handleRemove(index)}>Remove</button>
                            </li>
                        ))}
                        </ul>
                        <p>Total: ${totalPrice}</p>
                    
                    </>
                    )
            }
            <button onClick={handleCheckout}>teste</button>

        </div>
    )
}

export default ShoppingCart