import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {

    const { loading, setLoading, token, id } = useContext(Context);
    const [profile, setProfile] = useState<null | {
        customer: {
            id: number;
            name: string;
            cpf: number;
        };
        sales: Array<{
            id: number;
            product: {
                name: string;
                description: string;
                price: number;
                quantity: number;
                finalPrice: number;
            };
        }>;
        products: Array<{
            id: number,
          name: string,
          description: string,
          price: number,
        }>;
    }>(null);

    const navigate = useNavigate();

    const handleDeleteProduct = async (id: number) => {
        try {
            const address = import.meta.env.VITE_BACKEND_URL;
            await axios.delete(`${address}/products/${id}`, {
                headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                }
            })
        } catch (err) {
            console.error('Error deleting product:', err)
        }
    };

    useEffect(() => {
        async function getProfile() {
            setLoading(true);
            try {
                const address = import.meta.env.VITE_BACKEND_URL;
                console.log("passo 1");
                
                const response = await axios.get(`${address}/customers/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data;
                setProfile(data);
            } catch (err) {
                console.log('Error fetching data:', err);
                console.error(err)
            } finally {
                setLoading(false);
            }
        }
        getProfile()
    }, [setProfile, setLoading, token, id])
    
    if(loading) {
        console.log("profile", profile);
        
        return <h1>Loading...</h1>
    }
    if (!profile) return <p>No profile data available</p>;

    return (
        <div>
            <section>
                <h2>Customer Information</h2>
                <p><strong>Name:</strong> {profile.customer.name}</p>
                <p><strong>CPF:</strong> {profile.customer.cpf}</p>
            </section>
            <section>
                <h2>Sales</h2>
                {profile.sales.length > 0 ? (
                    profile.sales.map((sale) => (
                        <div key={sale.id} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
                            <h3>{sale.product.name}</h3>
                            <p><strong>Description:</strong> {sale.product.description}</p>
                            <p><strong>Price:</strong> ${sale.product.price}</p>
                            <p><strong>Quantity:</strong> {sale.product.quantity}</p>
                            <p><strong>Final Price:</strong> ${sale.product.finalPrice}</p>
                        </div>
                    ))
                ) : (
                    <p>You haven't made any purchases yet.</p>
                )}
                <h2>Products</h2>
                <button onClick={() => navigate('/newProduct')}>Create a new product</button>
                {profile.products.length > 0 ? (
                    profile.products.map((product) => (
                        <div key={product.id} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
                            <h3>{product.name}</h3>
                            <p><strong>Description:</strong> {product.description}</p>
                            <p><strong>Price:</strong> ${product.price}</p>
                            <button onClick={() => navigate(`/editProduct/${product.id}`)}>Edit</button>
                            <button onClick={ () => handleDeleteProduct(product.id) }>Delete</button>
                        </div>
                    ))
                ) : (
                    <>
                        <p>You haven't published any product yet.</p>        
                        <button onClick={() => navigate('/newProduct')}>Create a new product</button>
                    </>
                )}
            </section>
        </div>
    );
}

export default Profile;