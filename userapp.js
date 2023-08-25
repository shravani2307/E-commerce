import { HashRouter, Routes,Route } from "react-router-dom";

import Userheader from "./userheader";
import Myregister from "./register";
import Mylogin from "./login";
import Mycart from "./cart";
import Myhome from "./home";

const UserModule = () =>{
    return(
        <HashRouter>
            <Userheader/>

            <Routes>
                <Route exact path="/" element={ <Myhome/> } />
                <Route exact path="/cart" element={ <Mycart/> } />
                <Route exact path="/login" element={ <Mylogin/> } />
                <Route exact path="/register" element={ <Myregister/> } />
            </Routes>
            
        </HashRouter>
    )
}

export default UserModule;

