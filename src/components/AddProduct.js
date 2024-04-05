import React, { useState } from "react";

const AddProduct = () => {

    const [ name, setName] = useState('');
    const [ price, setPrice] = useState('');
    const [ category, setCategory] =  useState('');
    const [company, setCompany] = useState('');
    
    const addProduct = async() => {
        console.log(name,price);
        const userId = JSON.parse(localStorage.getItem('user'))._id

        let result = await fetch('http://localhost:4000/product', {
            method: 'post',
            body:JSON.stringify({name,price, category, company, userId}),
            headers: {'Content-Type': 'application/json'},
        });

        result = await result.json();
        console.log(result);
        
    }
    return (
        <div className="register">
            <h1>Product</h1>
            <input className="inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Product Name"></input>
            <input className="inputBox" type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Price"></input>
            <input className="inputBox" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter Category"></input>
            <input className="inputBox" type="text" value={company} onChange={(e) => setCompany(e.target.value)}  placeholder="Enter Company"></input>
            <button onClick={addProduct} className="appbutton" type="button">Add Product</button>
        </div>
    )
};

export default AddProduct;
