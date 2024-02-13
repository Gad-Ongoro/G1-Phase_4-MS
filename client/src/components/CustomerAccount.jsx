// import React, {useContext} from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
// import { SafarisContext } from '../App';
import CustomerInfo from './CustomerInfo';
import AccountSettings from './AccountSettings';

function CustomerAccount() {
	// const {} = useContext(SafarisContext);
	
	return (
    	<div className='container'>
			<h3 className='mt-1'>Account</h3>
			<div className='profile_info'>
				<div>
					<NavLink to='/account/profile_details' exact className={'d-block m-4'}>Profile Details</NavLink>
					<NavLink to='/account/payment_details' exact className={'d-block m-4'}>Payment Method</NavLink>
					<NavLink to='/account/settings' exact className={'d-block m-4'}>Settings</NavLink>
					<NavLink to='/account/notifications' exact className={'d-block m-4'}>Notifications</NavLink>
				</div>

				<div>
					<Routes>
						<Route path='/' element={<CustomerInfo></CustomerInfo>}></Route>
						<Route path='/profile_details' element={<CustomerInfo></CustomerInfo>} exact></Route>
						<Route path='/payment_details' element={<h2>Payment Details</h2>} exact></Route>
						<Route path='/settings' element={<AccountSettings></AccountSettings>} exact></Route>
						<Route path='/notifications' element={<h4 className='text-warning'>Verify your email address</h4>} exact></Route>
					</Routes>
				</div>

			</div>
		</div>
  	);
};

export default CustomerAccount;