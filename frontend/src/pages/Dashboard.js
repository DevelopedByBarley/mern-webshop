import axios from "axios";
import '../styles/pages/Dashboard.css'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([])
  
  const getProducts = async (adminToken) => {
    const res = await axios.get('/api/products', {
      headers: { Authorization: `Bearer ${adminToken}` }
    })
    
    setProducts(res.data.products)
  }

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      getProducts(adminToken);
    } else {
      navigate('/')
    }
  }, [])

  return (
    <div>
      {products.length < 1 ? (
        <h1>Dashboard</h1>
      ) : (
        <div className="products-container">
          {products.map((product) => {
            return (
              <div key={product._id} className="product-card">
                <h1>{product.title}</h1>
              </div>
            )
          })}
        </div>
      )}
      <button className="admin-logout" onClick={() => {localStorage.clear(); navigate('/admin')}}>Logout</button>
    </div>
  )
}