import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Context from "../context/Context";
import axios from "axios";
import { Product } from "../types";

function EditProduct() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const { token, setLoading, loading } = useContext(Context);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0
    });
    const navigate = useNavigate();

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
                setFormData({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    stock: data.stock
                })
            } catch (err) {
                console.log('Error fetching data:', err);
                console.error(err)
            } finally {
                setLoading(false);
            }
        }
        getProduct();
    }, [id, token, setLoading]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        try {
            const address = import.meta.env.VITE_BACKEND_URL;
            await axios.put(`${address}/products/${id}`, {
                name: formData.name,
                description: formData.description,
                price: formData.price,
                stock: formData.stock
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            navigate("/profile");
        } catch (err) {
            console.error('Error updating product:', err);
        } finally {
            setLoading(false);
        }
    };


    if(!product) {
        return <h1>Product not found</h1>
    }

    if(loading) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <h1>Edit product:</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        step="0.01"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="stock">Stock:</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button disabled={loading}>{loading ? "Editing product..." : "Save Changes"}</button>
            </form>
        </>
    )
}

export default EditProduct