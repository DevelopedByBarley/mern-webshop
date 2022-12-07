import '../styles/components/SetShoppingCartButton.css'
import { useState } from "react"
import {MdDone} from 'react-icons/md'

export default function SetShoppingCartButton({product, getProductSingle}) {
  const [isProductAdded, setProductAdded] = useState(false)
  return (
    <button style={{ background: `${isProductAdded ? "#3a3a3a" : ""}` }} disabled={!product.isInStock} className="add-to-cart" onClick={() => {
      getProductSingle(product._id)
      setProductAdded(true)
      setTimeout(() => {
        setProductAdded(false)
      }, 2000)
    }}> {isProductAdded ? <MdDone size={15} color={`${isProductAdded ? "green" : ""}`} /> : "Kosárhoz ad"} </button>
  )
}
