import '../../styles/pages/User/Profile.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BsPersonFill } from 'react-icons/bs';
import { BackButton } from '../../components/BackButton';

export function Profile() {
	const [profile, setProfile] = useState('')

	useEffect(() => {
		const token = localStorage.getItem('userToken')
		axios.get('/api/user/getMe', {
			headers: { Authorization: `Bearer ${token}` }
			
		}).then((res) => {
			const user = res.data.user;
			setProfile(user)
		})
	}, [])

	console.log(profile)

	return (
		<div className='profile-data-container'>
			<BackButton url={'/'}/>
			{profile ?
				(
					<div className='user-profile'>
						<div className='profile-icon'>
							<BsPersonFill className='icon' size={100} />
						</div>
						<div className='profile-data-content'>
							<div className='profile-datas'>
								<h3 className='title'>Felhasználónév</h3>
								<p className='data'>{profile.userName}</p>
							</div>
							<div className='profile-datas'>
								<h3 className='title'>Email</h3>
								<p className='data'>{profile.email}</p>
							</div>
							<div className='profile-datas'>
								<h3 className='title'>Vezetéknév</h3>
								<p className='data'>{profile.firstName}</p>
							</div>
							<div className='profile-datas'>
								<h3 className='title'>Keresztnév</h3>
								<p className='data'>{profile.lastName}</p>
							</div>
							<div className='profile-datas'>
								<h3 className='title'>Telefonszám</h3>
								<p className='data'>{profile.phoneNumber}</p>
							</div>
							<div className='profile-datas'>
								<h3 className='title'>Irányítószám</h3>
								<p className='data'>{profile.postCode}</p>
							</div>
							<div className='profile-datas'>
								<h3 className='title'>Város</h3>
								<p className='data'>{profile.settlement}</p>
							</div>
							<div className='profile-datas'>
								<h3 className='title'>Utca</h3>
								<p className='data'>{profile.street}</p>
							</div>
							<div className='profile-datas'>
								<h3 className='title'>Házszám</h3>
								<p className='data'>{profile.streetNumber}</p>
							</div>
						</div>
					</div>
				)
				:
				""}
		</div>
	)
}
