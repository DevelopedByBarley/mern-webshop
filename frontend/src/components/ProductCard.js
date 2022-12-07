import { Link } from "react-router-dom";
import '../styles/components/ProductCard.css'
import { CgClose } from 'react-icons/cg'
import {MdDone} from 'react-icons/md'
import { SiPlaystation4, SiPlaystation5, SiPlaystationvita } from 'react-icons/si'
import SetShoppingCartButton from "./SetShoppingCartButton";





export function getProductIcon(productType) {
  switch (productType) {
    case 'ps4':
      return <SiPlaystation4 size={50} />

    case 'ps5':
      return <SiPlaystation5 size={50} />

    case 'psVita':
      return <SiPlaystationvita size={60} />

    case 'xboxOne':
      return <div>Xbox One</div>
    case 'xboxSeriesX':
      return <div>Xbox Series X</div>
  }
}

export function ProductCard({ product, getProductSingle }) {

  
  return (
    <div key={product._id} className="product-card">
      <Link className="product-card-link" to={`/product-single/${product._id}`}>
        <div className="product-header" >
          {product.discount > 0 && (
            <div className="product-discount">- {product.discount} %</div>
          )}
          <input style={{ height: "210px", width: "150px", margin: ".5rem" }} type="image" img src={`/assets/files/${product.image}`} alt="photo" />
          <div className="product-content">
            <h1 className="product-title">{product.title}</h1>
            <div className="isInStock">{product.isInStock ? <MdDone color="green" /> : <CgClose color="red" />} <span style={{ color: product.isInStock ? 'green' : 'red' }}>{product.isInStock ? "Készleten" : "Nincs raktáron"}</span></div>
            <h4 className="price">Ár: {product.price} Ft</h4>
          </div>
          <div className="product-icons" >
            <div className="product-icon"> {getProductIcon(product.type)}</div>
          </div>
        </div>
      </Link>
      <SetShoppingCartButton getProductSingle={getProductSingle} product={product}/>
    </div>
  )
}


//Product