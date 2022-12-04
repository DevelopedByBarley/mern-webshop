import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import '../../styles/pages/Dashboard.css'

export function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      getProducts();
    } else {
      navigate('/')
    }
  }, [])



  const getProducts = async () => {
    const res = await axios.get('/api/products')
    setProducts(res.data.products);
    
    console.log(products);
  }



  const deleteProduct = async (id, image) => {
    const adminToken = localStorage.getItem('adminToken')
    const deleteProduct = await axios.delete(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${adminToken}` },

    })
    const productId = deleteProduct.data.id

    setProducts((prev) => {
      const next = [...prev];
      const index = prev.findIndex(i => i._id === productId)
      next.splice(index, 1)
      return next;
    })
  }







  return (
    <div>

      {products.length < 1 ? (
        <h1>Dashboard</h1>
      ) : (
        <div className="products-container">
          {products.map((product) => {
            console.log(product);
            return (

              <div key={product._id} className="product-card">
                <Link to={`/product-single/${product._id}`}>
                  <div className="product-header">
                    <img style={{height: "200px", width: "200px"}} src={`/assets/files/${product.image}`}/>
                    <h1>{product.title}</h1>
                    <h1>{product.price}</h1>
                  </div>
                </Link>
                <button className="delete-product admin-button" onClick={() => deleteProduct(product._id, product.image)}>Delete</button>
                <Link to={`/product-update/${product._id}`}><button className="update-product admin-button" >Update</button></Link>
              </div>

            )
          })}
        </div>
      )}
      <button className="admin-logout" onClick={() => { localStorage.removeItem('adminToken'); navigate('/') }}>Logout</button>
      <Link to={`/product-add`}><button className="add-product" >+</button> </Link>
    </div>
  )
}