import { useState, useEffect } from "react";
import swal from "sweetalert";
import  ReactPaginate  from 'react-paginate';

const Myproduct = () =>{
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

    useEffect(()=>{
        getProduct()
    },[1]);

    // for search
    let[keyword, pickKeyword] = useState("");

    //pagination start
    const PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allproduct.length / PER_PAGE);

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-8">
                    <h3 className="text-primary text-center"> {allproduct.length} : Product List </h3>
                </div>
                <div className="col-lg-4">
                    <i>Search..</i>
                    <input type="text" className="form-control" onChange={obj=>pickKeyword(obj.target.value)}/>
                </div>
                <div className="col-lg-12 mt-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#Id</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Details</th>
                                <th>Photo</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allproduct.slice(offset, offset + PER_PAGE).map((product, index)=>{
                                        if (product.name.toLowerCase().includes(keyword.toLowerCase())) 
                                        {
                                            return(
                                                <tr key={index}>
                                                    <td> {product.id} </td>
                                                    <td> {product.name} </td>
                                                    <td> Rs.{product.price} </td>
                                                    <td> {product.details} </td>
                                                    <td> <img src={product.photo} height="50" width="70"/> </td>
                                                    <td>
                                                        <button className="btn btn-danger btn-sm">
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })
                            }
                        </tbody>
                    </table>
                    
                    <div className="mb-4 mt-4">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination  justify-content-center"}
                            pageClassName={"page-item "}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active primary"}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Myproduct;