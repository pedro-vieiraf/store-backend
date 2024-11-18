import { FormEvent, useContext, useState } from "react";
import Context from "../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewProduct() {

    const { token, id, isSubmitting, setIsSubmitting } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        if (!formData.name || !formData.description || formData.price <= 0 || formData.stock < 0) {
            alert("Please fill in all fields correctly.");
            return;
        }
        
        const address = import.meta.env.VITE_BACKEND_URL;

        try {
            await axios.post(`${address}/products`, {
                customerId: id,
                name: formData.name,
                description: formData.description,
                price: formData.price,
                stock: formData.stock
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            setIsSubmitting(false);
            navigate("/profile");

            
        } catch (err) {
            console.error('Error adding product:', err)
        }
    }
    // adicionar imagem no banco de dados.
    return (
        <div>
            <h1>Product information:</h1>
            <form onSubmit={ handleSubmit }>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input type="file" onChange={ handleChange } name="image" id="image" accept="image/png, image/jpeg" /> 
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" onChange={ handleChange } name="name" id="name" placeholder="Product name"/>
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" onChange={ handleChange } name="description" id="description" placeholder="Product description"/>
                </div>
                <div>
                    <label htmlFor="price">Price: R$</label>
                    <input type="number" onChange={ handleChange } name="price" min="0" step="0.01" id="price" placeholder="Product price"/>
                </div>
                <div>
                    <label htmlFor="stock">Stock:</label>
                    <input type="number" onChange={ handleChange } name="stock" min="0" id="stock" placeholder="Current stock"/>
                </div>
                <button disabled={isSubmitting}>{isSubmitting ? "Adding product..." : "Add product"}</button>
            </form>
        </div>
    );
}

export default NewProduct;