import React, {useState, useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { SafarisContext } from '../../App';
import { useAppContext } from '../../services/utils';

export default function AuthHeader() {
	const { auth } = useState();
	let [searchTerm, setSearchTerm] = useState('');
	let [vacations, setVacations] = useState(true);

	function onSearchChange(e){
		setSearchTerm(e.target.value)
	}
	function handleSearchSubmit(e){
		e.preventDefault();
	}

	function handleVacationsClick(){
		setVacations(true)
	}

	function handleStaysClick(){
		setVacations(false)
	};

	return (
		<header className='header px-4 pt-2 text-white'>
			<div className='header-nav-container-1 container-fluid d-flex justify-content-between'>
				<h4 className='text-white'>
					<NavLink to='/' exact className='text-white home_link'>
						<span className='spartans_span'>Spartans</span> <span className='safaris_span'>Safaris</span>
					</NavLink>
				</h4>
				<div className='flex gap-3'>
					{/* <img className='language_img' src='https://t-cf.bstatic.com/design-assets/assets/v3.109.0/images-flags/Gb@3x.png' alt='NA'></img> */}
						<NavLink to='/signup' className='text-white nav_links_2' exact>Sign Up</NavLink>
						<NavLink to='/signin' className='text-white nav_links_2' exact>Sign In</NavLink>
					{/* <img className='support_img' src='https://cdn-icons-png.flaticon.com/128/10309/10309127.png' alt='NA'></img> */}
					<p>
						{/* {token_exists && <NavLink to='/my_bookings' className='text-white nav_links_2'><div className='bookings d-inline'>Manage Bookings <p className='booking_count'>{bookings}</p></div></NavLink>} */}
					</p>

					<p>
						{ auth &&
						<NavLink to='/dashboard/dashboard' className='text-white' exact>
							<img src='https://cdn-icons-png.flaticon.com/128/10307/10307911.png' alt='NA' className='profile_img'></img>
						</NavLink>
						}
					</p>
				</div>
			</div>
		</header>
	)
};