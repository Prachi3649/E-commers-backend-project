import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const UpdateProduct = () => {

    const [ name, setName] = useState('');
    const [ price, setPrice] = useState('');
    const [ category, setCategory] =  useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
   const navigate = useNavigate();
   
    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async() => {
        console.log(name,price,category,company);

        let result = await fetch(`http://localhost:4000/product/${params.id}`,{
            method: 'get'
        });

        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
        
    }

    const updateProduct = async () => {
        console.log(name,price,category,company);

        let result = await fetch(`http://localhost:4000/updateProduct/${params.id}`, {
            method: 'put',
            body:JSON.stringify({name,price, category, company}),
            headers: {'Content-Type': 'application/json'},  
        });
        result = await result.json();
        console.log(result);
        navigate('/home')
    }


    return (
        <div className="register">
            <h1>Update Product</h1>
            <input className="inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Product Name"></input>
            <input className="inputBox" type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Price"></input>
            <input className="inputBox" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter Category"></input>
            <input className="inputBox" type="text" value={company} onChange={(e) => setCompany(e.target.value)}  placeholder="Enter Company"></input>
            <button onClick={updateProduct} className="appbutton" type="button">Edit Product</button>
        </div>
    )
};

export default UpdateProduct;
