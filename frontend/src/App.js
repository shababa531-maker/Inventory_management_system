import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  // login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // products
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  // LOGIN FUNCTION
  const login = () => {
    axios.post("http://localhost:5000/api/auth/login", {
      username,
      password
    }).then(res => {
      if (res.data.success) {
        setIsLogin(true);
        loadProducts();
      } else {
        alert("Invalid Login");
      }
    });
  };

  // LOAD PRODUCTS
  const loadProducts = () => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));
  };

  // ADD PRODUCT
  const addProduct = () => {
    axios.post("http://localhost:5000/api/products/add", {
      name,
      quantity,
      price
    }).then(() => {
      loadProducts();
      setName("");
      setQuantity("");
      setPrice("");
    });
  };

  // DELETE PRODUCT
  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => loadProducts());
  };

  // ---------------- UI ----------------
  if (!isLogin) {
    return (
      <div className="box">
        <h2>Inventory Login</h2>
        <input placeholder="Username" onChange={e=>setUsername(e.target.value)} />
        <input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Inventory Dashboard</h1>

      <div className="add-box">
        <input placeholder="Product Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Quantity" value={quantity} onChange={e=>setQuantity(e.target.value)} />
        <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
        <button onClick={addProduct}>Add Product</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.quantity}</td>
              <td>₹{p.price}</td>
              <td>
                <button className="del" onClick={()=>deleteProduct(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
