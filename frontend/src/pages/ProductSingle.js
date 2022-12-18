import '../styles/pages/ProductSingle.css'
import axios from 'axios';
import moment, { } from 'moment'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import PuffLoader from "react-spinners/PuffLoader";
import SetShoppingCartButton from '../components/SetShoppingCartButton';
import { TbTruckDelivery } from 'react-icons/tb';
import { BsArrowRepeat } from 'react-icons/bs'
import { IoCloudDone } from 'react-icons/io5'
import { ProductCard } from '../components/ProductCard';
import { Comments } from '../components/Comments';
import { BackButton } from '../components/BackButton';


export function ProductSingle({ getProductSingle, user }) {
  const params = useParams();
  const id = params.productId;
  const [isPending, setPending] = useState(true);
  const [product, setProduct] = useState('');
  const [comments, setComments] = useState([]);
  const [sameProducts, setSameProducts] = useState([]);
  const isInStockStyle = { color: `${product.isInStock ? "green" : "red"}` }




  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {

      axios.get(`/api/products/${id}`)
        .then((res) => {
          setProduct(res.data.product);
          setComments(res.data.product.comments)
          axios.post(`/api/products/sameProducts`, {
            id: id,
            categories: res.data.product.categories,
            softwareType: res.data.product.softwareType,
            platform: res.data.product.platform
          })
            .then((res) => { setSameProducts(res.data.sameProducts) })
        })
        .finally(() => { setPending(false) })
    }, 1200)

  }, [id])

  return (
    <>
      {isPending ? (
        <Spinner color={"#9b3b40"} size={100} SpinnerName={PuffLoader} isFullPage={true} />
      ) : (
        <div className='single-product-container'>
          <div className='single-product-header'>
            <div className='single-product-image'>
              <img src={`/assets/files/${product.image}`} />
            </div>
            <div className='single-product-header-content'>
              <h1 className='title'>{product.title}</h1>
              <h1 className='isInStock' style={isInStockStyle}>{product.isInStock ? "Raktáron, Szállitással 1-5 munkanap" : "Nincs raktáron"}</h1>
              {product.discount > 0 && <h1 className='discount'>-{product.discount}%</h1>}
              <SetShoppingCartButton product={product} getProductSingle={getProductSingle} />
            </div>
          </div>
          <div className='single-product-body'>
            <div className='single-product-properties'>
              <div className='product-property'>
                <h2 className='property-name'>Platform: </h2>
                <div className='property-value'>{product.platform}</div>
              </div>
              <div className='product-property'>
                <h2 className='property-name'>Kategória: </h2>
                <div className='property-value'>{product.categories}</div>
              </div>
              <div className='product-property'>
                <h2 className='property-name'>Megjelenés: </h2>
                <div className='property-value'>  {moment(product.relaseDate).format('LL')}</div>
              </div>
            </div>
            <div className='single-product-body-content'>
              <div className='description'>
                <h1 className='description-title'>Termékleirás</h1>
                <br />
                <p>{product.description}</p>
              </div>

              <div className='single-product-video'>
                <iframe className='product-video' src={product.video} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </div>
          </div>
          <div className='same-products-container'>
            <h1 className='same-products-title'>További termékek neked!</h1>
            <div className='same-products'>
              {sameProducts.map((product) => {
                return <ProductCard key={product._id} product={product} getProductSingle={getProductSingle} />
              })}
            </div>
          </div>
          <div className='single-product-footer'>
            <div className='icon-container'>
              <TbTruckDelivery className='icon' size={60} color="hsla(194, 100%, 64%, 1)" />
              <p className='icon-title'>Ingyenes kiszállitás</p>
            </div>
            <div className='icon-container' >
              <BsArrowRepeat className='icon' size={60} color="hsla(194, 100%, 64%, 1)" />
              <p className='icon-title'>30 Napos csere</p>
            </div>
            <div className='icon-container'>
              <IoCloudDone className='icon' size={60} color="hsla(194, 100%, 64%, 1)" />
              <p className='icon-title'>2 év garancia</p>
            </div>
          </div>
          <Comments comments={comments} setComments={setComments} product={product} user={user} />
          <BackButton url={"/"} />
        </div>
      )}
    </>
  )
}
