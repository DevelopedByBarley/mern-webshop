import '../styles/components/MenuToggler.css'
import { GiHamburgerMenu } from 'react-icons/gi'

export function MenuToggler({ setMenuToggle, isMenuToggle }) {
  return (
    <div className='menu-toggle' onClick={() => { setMenuToggle(!isMenuToggle); console.log(isMenuToggle) }}><GiHamburgerMenu color='white' size={30}/></div>
  )
}
