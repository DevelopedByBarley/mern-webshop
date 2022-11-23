import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function AddProduct() {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem('adminToken');
  const addProduct = async (event) => {
    event.preventDefault();
    const newProduct = {
      title: event.target.elements.title.value,
      categorie: event.target.elements.categorie.value,
      manufacturer: event.target.elements.manufacturer.value,
      guarantee: event.target.elements.guarantee.value,
      isInStock: event.target.elements.isInStock.value,
      price: event.target.elements.price.value,
      discount: event.target.elements.discount.value,
      description: event.target.elements.description.value,
    }

    if (adminToken) {
      const product = await axios.post('/api/products', newProduct, {
        headers: { Authorization: `Bearer ${adminToken}` }
      })

      navigate('/dashboard')
    }
  }

  return (
    <div className="add-product-form-container">
      <h1>Add product</h1>
      <form onSubmit={addProduct}>
        <input name="title" placeholder="title" required />
        <select name="categorie" required>
          <option value="ps4">ps4</option>
        </select>
        <input name="manufacturer" placeholder="manufacturer" required />
        <input name="guarantee" placeholder="guarantee" required />
        <select name="isInStock" required>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <input type="number" name="price" placeholder="price" required />
        <input type="number" name="discount" placeholder="discount" required />
        <textarea placeholder='description' name="description" required></textarea>
        <button type="submit" >Send Product</button>
      </form>
      <button onClick={() => navigate('/dashboard')}>Close</button>
    </div>
  )
}