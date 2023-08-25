import UserModule from "./user/userapp";
import SellerModule from "./admin/adminapp";

function App() {

  if (localStorage.getItem("sellerid") == null) {
    return (<UserModule />);
  }
  else {
    return (<SellerModule />);
  }

}

export default App;
