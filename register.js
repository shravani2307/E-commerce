import { useState } from "react";
import swal from "sweetalert";

const Myregister = () =>{
    let[fullname, pickName] = useState("");
    let[mobile, pickMobile] = useState("");
    let[email, pickEmail] = useState("");
    let[password, pickPassword] = useState("");

    const save = () =>{
        const url = "http://localhost:1234/account";
        let userinfo = {name:fullname, mobile:mobile, email:email, password:password};
        let postData = {
            headers:{'Content-Type':'application/json'},
            method:"POST",
            body:JSON.stringify(userinfo)
        };
        fetch(url, postData)
        .then(response=>response.json())
        .then(userData =>{
            swal("Seller , "+ fullname, " Account Created Successfully", "success");
            pickName("");
            pickMobile("");
            pickEmail("");
            pickPassword("");
        })
    }

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="card border-0 shadow-lg">
                        <div className="card-header bg-primary text-white"> Seller, Create Account</div>
                        
                        <div className="card-body">
                            <div className="mb-3">
                                <label>Seller Name</label>
                                <input type="text" className="form-control"
                                onChange={obj=>pickName(obj.target.value)}
                                value={fullname}/>
                            </div>

                            <div className="mb-3">
                                <label>Mobile No</label>
                                <input type="number" className="form-control"
                                onChange={obj=>pickMobile(obj.target.value)}
                                value={mobile}/>
                            </div>
                            <div className="mb-3">
                                <label>e-Mail Id</label>
                                <input type="email" className="form-control"
                                onChange={obj=>pickEmail(obj.target.value)}
                                value={email}/>
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <input type="password" className="form-control"
                                onChange={obj=>pickPassword(obj.target.value)}
                                value={password}/>
                            </div>
                        </div>{ /* card body end */}

                        <div className="card-footer text-center">
                            <button className="btn btn-danger" onClick={save}> Register </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default Myregister;