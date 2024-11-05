import { useContext } from "react";
import Context from "../context/Context";
import { Product } from "../types";

function ShoppingCart() {
    const { cart } = useContext(Context);

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
                            </li>
                        ))}
                        </ul>
                        <p>Total: ${totalPrice}</p>
                    
                    </>
                    )
            }

        </div>
    )
}

export default ShoppingCart