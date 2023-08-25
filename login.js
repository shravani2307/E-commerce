import { useState } from "react";
import swal from "sweetalert";

const Mylogin = () =>{
    let[e, pickEmail] = useState("");
    let[p, pickPassword] = useState("");

    const login = () =>{
        if( e=="" || p=="")
        {
            swal("Error", "Empty Email or Password", "warning");
        }else{
            const url = "http://localhost:1234/account?email="+e+"&password="+p;
            fetch(url)
            .then(response=>response.json())
            .then(userinfo =>{
                if(userinfo.length==0){
                    swal("Fail", "Invalid or not exists", "error");
                }else{
                    localStorage.setItem("sellerid", userinfo[0].id );
                    localStorage.setItem("sellername", userinfo[0].name );
                    window.location.reload();
                }
            })
        } // else end
    }

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="card border-0 shadow-lg">
                        <div className="card-header bg-primary text-white"> Seller, Login</div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label>e-Mail Id</label>
                                <input type="email" className="form-control"
                                onChange={obj=>pickEmail(obj.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <input type="password" className="form-control"
                                onChange={obj=>pickPassword(obj.target.value)}/>
                            </div>
                        </div>{ /* card body end */}

                        <div className="card-footer text-center">
                            <button className="btn btn-danger" onClick={login}> Login </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default Mylogin;