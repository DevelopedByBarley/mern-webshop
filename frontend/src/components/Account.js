import '../styles/components/Account.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AccountToggle } from './AccountToggle';
import { RiAccountCircleFill } from 'react-icons/ri';

export function Account({user, setUser}) {
  const [userToggle, setUserToggle] = useState(false);
  return (
    <div className='account-container'>
      <div className='account' >
        {!user && <Link to='/user-login'><button className='login-button'>Bejelentkezés</button></Link>}
        {user && <RiAccountCircleFill color='white' size={40} onClick={() => { setUserToggle(!userToggle) }} />}
      </div>
      <div className='account-menu'>
        <AccountToggle user={user} setUser={setUser} userToggle={userToggle} setUserToggle={setUserToggle} />
      </div>
    </div>
  )
}
