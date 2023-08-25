import { Link } from "react-router-dom";

const Adminheader = () =>{
    return(
         <div className="container mt-3 mb-5">
            <div className="row">
                <div className="col-lg-4">
                    <h1 className="text-primary text-center">
                        React Shopping App
                    </h1>
                </div>
                <div className="col-lg-8 text-end">
                    <div className="btn-group">
                        <Link className="btn btn-primary" to="/"><i className="fa fa-home"></i> Dashboard</Link>
                        <Link className="btn btn-info text-white" to="/addproduct"><i className="fa fa-plus"></i> New Inventory</Link>
                        <Link className="btn btn-success" to="/productlist"><i className="fa fa-table"></i> My Inventory</Link>
                        <Link className="btn btn-warning text-white" to="/orderlist"><i className="fa fa-headset"></i> Order List</Link>
                        <button className="btn btn-danger" onClick={logout}>Welcome - {localStorage.getItem("sellername")} - Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Adminheader;

const logout = () =>{
    localStorage.clear();
    window.location.reload();
}