import { useState, useEffect } from "react";

const Mydashboard = () =>{
    let[allproduct, updateProduct] = useState( [] );
    const getProduct = async() =>{
        let sellerid = localStorage.getItem("sellerid");
        let url = "http://localhost:1234/product?sellerid="+sellerid;
        await fetch(url)
        .then(response =>response.json())
        .then(productArray=>{
            updateProduct( productArray.reverse() );
        })
    }


    let[orderlist, updateOrder] = useState( [] );
    const getorder = () =>{
        let url = "http://localhost:1234/order";
        fetch(url)
        .then(response=>response.json())
        .then(orderArray=>{
            updateOrder( orderArray.reverse() );
        })
    }


    useEffect(()=>{
        getProduct();
        getorder();
    },[1]);


    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h1 className="text-info"> My Dashboard </h1>
                </div>

                <div className="col-lg-4 mt-4 text-center">
                    <i className="fa fa-suitcase fa-3x text-warning mb-3"></i>
                    <h3> Total Product <br/> {allproduct.length} </h3>
                    <p> Available in inventory </p>
                </div>

                <div className="col-lg-4 mt-4 text-center">
                    <i className="fa fa-headset fa-3x text-primary mb-3"></i>
                    <h3> Total Orders <br/> {orderlist.length} </h3>
                    <p> Rceived from Customers </p>
                </div>
                
            </div>
        </div>
    )
}

export default Mydashboard;