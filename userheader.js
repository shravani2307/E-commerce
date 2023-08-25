import { Link } from "react-router-dom";

const Userheader = () => {
    return (
        <div className="container mt-3 mb-5">
            <div className="row">
                <div className="col-lg-4">
                    <h1 className="text-primary text-center">
                        React Shopping App
                    </h1>
                </div>
                <div className="col-lg-8 text-end">
                    <div className="btn-group">
                        <Link className="btn btn-primary" to="/"><i className="fa fa-shopping-bag"></i> Shopping</Link>
                        <Link className="btn btn-info text-white" to="/cart"><i className="fa fa-shopping-cart"></i> My Cart</Link>
                        <Link className="btn btn-success" to="/register"><i className="fa fa-user-plus"></i> Create Account</Link>
                        <Link className="btn btn-warning text-white" to="/login"><i className="fa fa-lock"></i> Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Userheader;