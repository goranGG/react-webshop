import { Route, Routes } from "react-router-dom";
import "./index.scss";
import Home from "./components/routes/home/home.component";
import Navigation from "./components/routes/navigation/navigation.component";
import { Shop } from "./components/shop/shop.component";
import Auth from "./components/routes/auth/auth.component";
import Checkout from "./components/routes/checkout/checkout.component";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="sign-in" element={<Auth />} />
          <Route path="checkout" element={<Checkout />} />
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
