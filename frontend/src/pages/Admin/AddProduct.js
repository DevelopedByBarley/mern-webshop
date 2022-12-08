import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function AddProduct() {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem('adminToken');
  const addProduct = async (event) => {
    event.preventDefault();
    const product = {
      title: event.target.elements.title.value,
      relaseDate: event.target.elements.relaseDate.value,
      platform: event.target.elements.platform.value,
      categories: event.target.elements.categories.value,
      softwareType: event.target.elements.softwareType.value,
      company: event.target.elements.company.value,
      guarantee: event.target.elements.guarantee.value,
      isInStock: event.target.elements.isInStock.value,
      price: event.target.elements.price.value,
      discount: event.target.elements.discount.value,
      description: event.target.elements.description.value,
      video: event.target.elements.video.value,
    }

    const file = event.target.elements.imageCover.files[0]

    const formData = new FormData();
    formData.append('product', JSON.stringify(product))
    formData.append('coverImage', file);


    if (adminToken) {
      await axios({
        method: "POST",
        url: "/api/products",
        data: formData,
        headers: { Authorization: `Bearer ${adminToken}` }
      })
      navigate('/dashboard')
    }
  }

  return (
    <div className="add-product-form-container">
      <h1>Add product</h1>
      <form onSubmit={addProduct}>
        <input type="text" name="title" placeholder="title" required />
        <input type="text" name="relaseDate" placeholder="2022/01"  />
        <select name="categories" defaultValue="nothing" required>
          <option value="gaming-software">Játék szoftver</option>
          <option value="gaming-console">Játék konzol</option>
          <option value="hardware">Hardver</option>
          <option value="mobile">Mobil eszközök</option>
          <option value="tv">Tv</option>
          <option value="monitor">Monitor</option>
          <option value="smart-watch">Okosóra</option>
          <option value="smart-home">Okosotthon</option>
        </select>
        <select name="platform">
          <option value="null">Platform nélkül</option>
          <option value="ps4">PS4</option>
          <option value="ps5">PS5</option>
          <option value="psVita">PSVita</option>
          <option value="xboxOne">Xbox One</option>
          <option value="xboxSeriesX">Xbox Series X</option>
          <option value="pc">PC</option>
        </select>
        <select name="softwareType" placeholder='Játékszoftver tipusa'>
          <option value="null">Szoftver tipus nélkül</option>
          <option value="action">Akció/Kaland</option>
          <option value="for-kids">Gyerekeknek</option>
          <option value="horror-thriller">Horror/Thriller</option>
          <option value="strategy">Stratégiai</option>
          <option value="rpg">Szerepjáték/RPG</option>
          <option value="skillful">Ügyességi</option>
          <option value="racing">Verseny</option>
          <option value="simulator">Szimulátor</option>
          <option value="fighting">Verekedős</option>
          <option value="dance-music">Tánc/Zene</option>
          <option value="sport">Sport</option>
          <option value="party">Party</option>
        </select>


        <input name="company" placeholder="company" required />
        <input name="guarantee" placeholder="guarantee" required />
        <select name="isInStock" required>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <input type="number" name="price" placeholder="price" min={1} required />
        <input type="number" name="discount" placeholder="discount" min={0} max={99} required />
        <input type="file" name="imageCover" required />
        <input type="text" name="video" placeholder="video src" required />
        <textarea placeholder='description' name="description" required></textarea>
        <button type="submit" >Send Product</button>
      </form>
      <button onClick={() => navigate('/dashboard')}>Close</button>
    </div>
  )
}