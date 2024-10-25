import React, { useContext, useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import GridLoader from './Loaders/GridLoader';
import { SafarisContext } from '../App';
import { useAppContext } from '../services/utils';

function CustomerInfo() {
	const { scrollToTop } = useAppContext();
	let {customer, customerProfile} = useContext(SafarisContext);
	let [details_loaded, setDetailsLoaded] = useState(false);
	console.log(customerProfile);

	useEffect(() => {
		setTimeout(() => {
			setDetailsLoaded(true);
		}, 1000)
	})

	let customer_information = customer !== undefined ? (<>
			<div className='dp_name d-flex justify-content-center align-items-center gap-3'>
				<img className='dp' src="https://i.pinimg.com/474x/21/d7/23/21d7230202a30e3f8acd8ff1d284407d.jpg" alt="NA"/>
				<div>
					<h4 className='m-0'>{customer.first_name} {customer.last_name}</h4>
					<p className='m-0 text-secondary'>{customer.user_name}</p>
				</div>
			</div>

			<div className='fields_details mt-4'>
				<div>
					<p className='m-1 text-secondary'>First Name</p>
					<h6 className='mx-3'>{customer.first_name}</h6>
				</div>
				<div>
					<p className='m-1 text-secondary'>Last Name</p>
					<h6 className='mx-3'>{customer.last_name}</h6>
				</div>
				<div>
					<p className='m-1 text-secondary'>User Name</p>
					<h6 className='mx-3'>{customer.user_name}</h6>
				</div>
				<div>
					<p className='m-1 text-secondary'>Email Address</p>
					<h6 className='mx-3'>{customer.email}</h6>
				</div>
				<div>
					<p className='m-1 text-secondary'>Backup Email</p>
					<h6 className='mx-3'>{customerProfile.backup_mail}</h6>
				</div>
				<div>
					<p className='m-1 text-secondary'>Phone Number</p>
					<h6 className='mx-3'>{customerProfile.phone_number}</h6>
				</div>
				<div>
					<p className='m-1 text-secondary'>Nationality</p>
					<h6 className='mx-3'>{customerProfile.nationality}</h6>
				</div>
				<div>
					<p className='m-1 text-secondary'>Account Type</p>
					<h6 className='mx-3'>{customerProfile.account_type}</h6>
				</div>
			</div>
	</>) : <GridLoader></GridLoader>;
	
  	return (
    	<div className='container account_details'>
			{details_loaded ? customer_information : <GridLoader></GridLoader>}
			{details_loaded && <button type='button' className=''>
				<NavLink to='/account/settings' exact className={'text-decoration-none'} onClick={scrollToTop}>Edit Details</NavLink>
			</button>}
		</div>
  	)
};

export default CustomerInfo;