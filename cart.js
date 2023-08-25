import { useState, useEffect } from "react";
import swal from "sweetalert";

const Mycart = () =>{
    let[allproduct, updateProduct] = useState( [] );
    const getProduct = async() =>{
        let url = "http://localhost:1234/cart";
        await fetch(url)
        .then(response =>response.json())
        .then(productArray=>{
            updateProduct( productArray.reverse() );
        })
    }

    useEffect(()=>{
        getProduct()
    },[1]);

    const delCart = async(id, name) =>{
        let url = "http://localhost:1234/cart/"+id;
        let postData = {method:"delete"};
        await fetch(url, postData)
        .then(response =>response.json())
        .then(emptyres =>{
            swal(name+"", " Deleted From Cart !", "success");
            getProduct(); // to reload the list after delete
        })
    }

    const myqty = async(pinfo, type) =>{
        if(type==1){
            pinfo["qty"] = pinfo["qty"]+1;
        }else{
            pinfo["qty"] = pinfo["qty"]-1;
        }

        if(pinfo.qty <= 0 ){
            delCart(pinfo.id, pinfo.name);
        }else{
            let url = "http://localhost:1234/cart/"+pinfo.id;
            let postdata = {
                headers:{'Content-Type':'application/json'},
                method:'PUT',
                body:JSON.stringify(pinfo)
            }
            try {
                await fetch(url, postdata)
                .then(response=>response.json())
                .then(serverres=>{
                    swal(pinfo.name +"", "Quantity updated in your cart !..", "success");
                    getProduct();
                })
          } catch (error) {
            swal("Error", " While Updating !..", "warning");
          }
        } // else end here
    }

    let[fullname, pickName] = useState("");
    let[mobileno, pickMobile] = useState("");
    let[fulladdress, pickAddress] = useState("");

    const placeorder = () =>{
        let orderdata = { customername:fullname, mobile:mobileno, address:fulladdress, item:allproduct };
        let url = "http://localhost:1234/order";
        let postdata = {
            headers:{'Content-Type':'application/json'},
            method:'POST',
            body:JSON.stringify(orderdata)
        }
        fetch(url, postdata)
        .then(response=>response.json())
        .then(serverRes=>{
            swal("Order Received", "Your Order id -: "+serverRes.id+"","success");
        })
    }

    let total = 0;

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-4">
                    <div className="p-5 shadow-lg rounded">
                        <h3 className="text-center text-primary"> Enter Customer Details </h3>
                        <div className="mb-3">
                            <label>Customer Name</label>
                            <input type="text" className="form-control"
                            onChange={obj=>pickName(obj.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label>Mobile No</label>
                            <input type="number" className="form-control"
                            onChange={obj=>pickMobile(obj.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label>Delivery Address</label>
                            <textarea className="form-control"
                            onChange={obj=>pickAddress(obj.target.value)}></textarea>
                        </div>
                        <div className="text-center">
                            <hr/>
                            <button className="btn btn-danger btn-lg" onClick={placeorder}>Place Order</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <h3 className="text-center text-primary"> 
                       <i className="fa fa-shopping-cart"></i> Item in Cart : {allproduct.length} 
                    </h3>
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Photo</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allproduct.map((product, index)=>{
                                    total = total + (product.qty * product.price);
                                    return(
                                        <tr key={index}>
                                            <td> {product.name} </td>
                                            <td> <img src={product.photo} height="30" width="50"/> </td>
                                            <td> Rs.{product.price} </td>
                                            <td>
                                                <button onClick={myqty.bind(this, product, 1)}>+</button>
                                                    <input type="text" value={product.qty}/>
                                                <button onClick={myqty.bind(this, product, 0)}>-</button>
                                            </td>
                                            <td>Rs.{product.qty * product.price}</td>
                                            <td> 
                                                <button className="btn btn-danger btn-sm"
                                                 onClick={delCart.bind(this, product.id, product.name)}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td colSpan="5" className="text-end">
                                    <b> Grand Total : Rs.{total} </b>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Mycart;