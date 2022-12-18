import '../styles/components/BackButton.css'
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io'



export function BackButton({ url }) {
  return (
    <div className='back-button-container'>
      <Link to={url}><IoIosArrowRoundBack size={50} color={"white"}/></Link>
    </div>
  )
}
