import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export function UpdateProduct({ setPopUpActive, setProducts }) {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.productId;
  const adminToken = localStorage.getItem('adminToken');
  const [imageNameForDelete, setImagNameForDelete] = useState('')
  const [product, setProduct] = useState('');

  console.log(imageNameForDelete);

  useEffect(() => {

    axios.get(`/api/products/${id}`)
      .then(res => {
        setProduct(res.data.product)
        setImagNameForDelete(res.data.product.image)
      })
    if (!adminToken) {
      navigate('/')
    }
  }, [])




  const updateProduct = async (event) => {
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
    formData.append('imageNameForDelete', imageNameForDelete);
    formData.append('coverImage', file);

    if (adminToken) {
      await axios.put(`/api/products/${id}`, formData, {
        headers: { Authorization: `Bearer ${adminToken}` }
      })
      navigate('/dashboard')
    }
  }

  return (
    <div className="add-product-form-container">
      <h1>Update product</h1>
      <form onSubmit={updateProduct}>
        <input type="text" name="title" placeholder="title" defaultValue={product.title} required />
        <input type="date" name="relaseDate" defaultValue={product.relaseDate} placeholder="2022/01" />
        <select name="categories" required>
          <option value="játékszoftver">Játék szoftver</option>
          <option value="játékkonzol">Játék konzol</option>
          <option value="hardware">Hardver</option>
          <option value="mobil">Mobil eszközök</option>
          <option value="tv">Tv</option>
          <option value="monitor">Monitor</option>
          <option value="okosóra">Okosóra</option>
          <option value="okosotthon">Okosotthon</option>
        </select>
        <select name="platform" >
          <option value="ps4">PS4</option>
          <option value="ps5">PS5</option>
          <option value="psVita">PSVita</option>
          <option value="xboxOne">Xbox One</option>
          <option value="xboxSeriesX">Xbox Series X</option>
          <option value="pc">PC</option>
          <option value="nintendo">Nintendo</option>
          <option value="okosóra">Okosóra</option>
        </select>
        <select name="softwareType" placeholder='Játékszoftver tipusa'>
          <option value="null">Szoftver tipus nélkül</option>
          <option value="akció">Akció/Kaland</option>
          <option value="gyerekeknek">Gyerekeknek</option>
          <option value="horror-thriller">Horror/Thriller</option>
          <option value="stratégia">Stratégiai</option>
          <option value="rpg">Szerepjáték/RPG</option>
          <option value="ügyességi">Ügyességi</option>
          <option value="verseny">Verseny</option>
          <option value="szimulátor">Szimulátor</option>
          <option value="verekedős">Verekedős</option>
          <option value="tánc-zene">Tánc/Zene</option>
          <option value="sport">Sport</option>
          <option value="party">Party</option>
        </select>
        <input name="company" placeholder="manufacturer" defaultValue={product.manufacturer} required />
        <input name="guarantee" placeholder="guarantee" defaultValue={product.guarantee} required />
        <select name="isInStock" required>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <input type="number" name="price" placeholder="price" min={1} defaultValue={product.price} required />
        <input type="number" name="discount" placeholder="discount" min={0} max={99} defaultValue={product.discount} required />
        <input type="file" name="imageCover" />
        <input type="text" name="video" placeholder="video src" defaultValue={product.video} required />

        <textarea placeholder='description' name="description" defaultValue={product.description} required></textarea>
        <button type="submit" >Send Product</button>
      </form>
      <button onClick={() => navigate('/dashboard')}>Close</button>
    </div>
  )
}