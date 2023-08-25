import { useState, useEffect } from "react";
import swal from "sweetalert";

const Myhome = () =>{
    let[allproduct, updateProduct] = useState( [] );
    const getProduct = async() =>{
        let url = "http://localhost:1234/product";
        await fetch(url)
        .then(response =>response.json())
        .then(productArray=>{
            updateProduct( productArray.reverse() );
        })
    }

    useEffect(()=>{
        getProduct()
    },[1]);

    const addtocart = async(pinfo) =>{
        pinfo["qty"] = 1;
        let url = "http://localhost:1234/cart";
        let postdata = {
            headers:{'Content-Type':'application/json'},
            method:'POST',
            body:JSON.stringify(pinfo)
        }

        try {
                await fetch(url, postdata)
                .then(response=>response.json())
                .then(serverres=>{
                    swal(pinfo.name +"", " Added in your cart !..", "success");
                })
          } catch (error) {
            swal("Error", pinfo.name+" Aleary in your cart !..", "warning");
          }
    }

    return(
        <div className="container mt-5">
            <div className="row text-center">
                {
                    allproduct.map((product, index)=>{
                        return(
                            <div className="col-lg-3 mb-5" key={index}>
                                <div className="p-4 shadow-lg rounded">
                                    <h4 className="text-primary mb-3"> {product.name} </h4>
                                    <img src={product.photo} width="100%" height="200" className="rounded"/>
                                    <p className="m-2 text-danger"> <b>Rs.{product.price} </b></p>
            
                                    <button className="btn btn-danger btn-sm"
                                    onClick={addtocart.bind(this, product)}> 
                                        <i className="fa fa-plus"></i> Add to Cart 
                                    </button>

                                    <p className="m-2"> {product.details.substring(0,30)}... </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Myhome;