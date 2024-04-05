import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ProductList = () => {

    const [product, setProduct] = useState([]);

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
      
        let result = await fetch('http://localhost:4000/get', {
            method: 'get',
            headers : {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        setProduct(result);
    };

    const searchHandle = async(e) => {
        let key =  e.target.value
        if(!key){
            getProduct()
        }
        let result = await fetch(`http://localhost:4000/search/${key}`, {
            method: 'get'
        })
        result = await result.json();
        if(result){
            setProduct(result)
        }
        console.log(result);

       
    }

    const deleteProduct = async (id) => {
        console.log(id);
        let result = await fetch(`http://localhost:4000/product/${id}`, {
            method: 'delete'
        });
        result = await result.json()

        if (result) {
            getProduct()

        }
        else {
            alert("not found")

        }
    }

    return (
        <div className="product-list">
            <h3>list of the product</h3>
            <input className="search-product-box" type="text" placeholder="Search product" onChange={searchHandle}></input>
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>operation</li>
            </ul>
            {

                product.length>0 ? product.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <button > <Link to={`/update/${item._id}`}> update</Link></button>
                        </li>
                    </ul>
                ) : <h1>No Product found</h1>


            }
        </div>
    )
};

export default ProductList;