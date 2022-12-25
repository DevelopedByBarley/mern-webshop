import '../styles/components/AccountToggle.css'

import { Link } from 'react-router-dom'
import { BsPower } from 'react-icons/bs'
import { TbTruckDelivery } from 'react-icons/tb'
import { CiSettings } from 'react-icons/ci'


export function AccountToggle({ user, setUser, setUserToggle, userToggle }) {

  const logoutUser = () => {
    localStorage.removeItem('userToken')
    setUser()
    setUserToggle(false)
  }



  return (
    <div className={`account-toggle ${userToggle ? "userToggleActive" : ""}`} >
      <div className="user-data">
        <h4 className='user-name'>Szia {user?.userName}!</h4>
        <Link to='/user/profile' className='account-link account-data'  onClick={() => setUserToggle(false)}>
          Adataim <span><CiSettings color='white' size={25} /></span>
        </Link><br />
        <Link to='/user/orders' className='account-link account-latest-deliveries' onClick={() => setUserToggle(false)}>
          Korábbi rendeléseim
          <span>< TbTruckDelivery className='account-link-icon'  color='white' size={25} /></span>
        </Link>
      </div>
      <button className='logout-user' onClick={logoutUser}>Kijelentkezés</button>
    </div>
  )
}