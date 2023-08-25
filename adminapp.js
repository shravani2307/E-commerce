import { HashRouter, Routes, Route } from "react-router-dom";

import Adminheader from "./adminheader";
import Mydashboard from "./dashboard";
import Mynewproduct from "./newproduct";
import Myproduct from "./allproduct";
import Myorder from "./order";

const SellerModule = () =>{
    return(
        <HashRouter>
            <Adminheader/>
            <Routes>
                <Route exact path="/" element={<Mydashboard/>} />
                <Route exact path="/addproduct" element={<Mynewproduct/>} />
                <Route exact path="/productlist" element={<Myproduct/>} />
                <Route exact path="/orderlist" element={<Myorder/>} />
            </Routes>
        </HashRouter>
    )
}
export default SellerModule;


