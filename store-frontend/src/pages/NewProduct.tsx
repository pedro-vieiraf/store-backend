import { ChangeEvent, FormEvent, useContext } from "react";
import Context from "../context/Context";
import axios from "axios";

function NewProduct() {

    const { token, id } = useContext(Context);
    
    let name = '';
    let description = '';
    let price = 0;
    let stock = 0;

    const handleChange = ({ target } : ChangeEvent<HTMLInputElement>) => {
        if(target.name === 'name') {
            console.log(target.value);
            
            name = target.value;
        }
        if(target.name === 'description') {
            console.log(target.value);

            description = target.value;
        }
        if(target.name === 'price') {
            console.log(target.value);

            price = Number(target.value);
            console.log(price);
            
        }
        if(target.name === 'stock') {
            console.log(target.value);

            stock = Number(target.value);
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const address = import.meta.env.VITE_BACKEND_URL;

        try {
            const response = await axios.post(`${address}/products`, {
                customerId: id,
                name,
                price,
                stock,
                description
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            console.log(response.data);
            
        } catch (err) {
            console.error('Error adding product:', err)
        }
    }
    // adicionar imagem no banco de dados.
    return (
        <div>
            <h1>Product information:</h1>
            <form onSubmit={ handleSubmit }>
                <input type="file" onChange={ handleChange } name="image" id="image" accept="image/png, image/jpeg" /> 
                <input type="text" onChange={ handleChange } name="name" id="name" placeholder="Product name"/>
                <input type="text" onChange={ handleChange } name="description" id="description" placeholder="Product description"/>
                <input type="number" onChange={ handleChange } name="price" min="0" step="0.1" id="price" placeholder="Product price"/>
                <input type="number" onChange={ handleChange } name="stock" min="0" id="stock" placeholder="Current stock"/>
                <button>Add product</button>
            </form>
        </div>
    );
}

export default NewProduct;