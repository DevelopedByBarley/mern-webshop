import '../styles/components/AccountToggle.css'

import {Link} from 'react-router-dom'
import {BsPower} from 'react-icons/bs'
import {TbTruckDelivery} from 'react-icons/tb'
import {CiSettings} from 'react-icons/ci'


export function AccountToggle({user, setUser, setUserToggle}) {

  const logoutUser = () => {
    localStorage.removeItem('userToken0')
    setUser()
    setUserToggle(false)
  }



  return (
    <div className="account-toggle">
      <div className="user-data">
      <h4 className='user-name'>Szia {user.userName}!</h4>
      <Link to='/error-page' className='account-link account-data'>Adataim <span><CiSettings color='white' size={25}/></span></Link><br/>
      <Link  to='/error-page' className='account-link account-latest-deliveries'>Korábbi rendeléseim  <span><TbTruckDelivery color='white' size={25}/></span></Link>
      </div>
      <button className='logout-user' onClick={logoutUser}>Kijelentkezés</button>
    </div>
  )
}