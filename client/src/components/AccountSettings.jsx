import React, { useContext, useEffect, useState} from 'react';
import GridLoader from './Loaders/GridLoader';
import { SafarisContext } from '../App';

function AccountSettings() {
	let {customer, scrollToTop, token_exists, updateCustomerProfile} = useContext(SafarisContext);
	let [details_loaded, setDetailsLoaded] = useState(false);
	let [inputs, setInputs] = useState({});

	useEffect(() => {
		setTimeout(() => {
			setDetailsLoaded(true);
		}, 1000)
	});

	// Handle Input Change
	function onInputChange(e){
		let name = e.target.name;
		let value = e.target.value;

		if (e.target.type === 'select-one'){
			value = e.target.options[e.target.selectedIndex].value;
		}
		setInputs(current => ({...current, [name]:value}));
	};

	// Handle Form Submit
	function handleSubmit(e){
		e.preventDefault();
		updateCustomerProfile(inputs);
	};

	let customer_information = customer !== undefined ? (<>
		{/* SignUp Data */}
		<form onSubmit={handleSubmit}>
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
			</div>
			<button type="submit">Update</button>
		</form>
		
		{/* Profile Data */}
		<form onSubmit={handleSubmit}>
			<div className='fields_details mt-4'>
				<div>
					<p className='m-1 text-secondary'>Backup Email</p>
					<input type='email' className='mx-3' name='backup_mail' onChange={onInputChange}></input>
				</div>
				<div>
					<p className='m-1 text-secondary'>Phone Number</p>
					<input type='tel' className='mx-3' name='phone_number' onChange={onInputChange}></input>
				</div>
				<div>
					<p className='m-1 text-secondary'>Nationality</p>
					<input type='text' className='mx-3' name='nationality' onChange={onInputChange}></input>
				</div>
				<div>
					<p className='m-1 text-secondary'>Account Type</p>
					<select name="account_type" onChange={onInputChange}>
						<option value="Customer">Customer</option>
						<option value="Owner">Owner</option>
						<option value="Admin">Admin</option>
					</select>
				</div>
			</div>
			<button type="submit">Update</button>
		</form>
	</>) : <GridLoader></GridLoader>;

	return (
		<div>
			{details_loaded ? customer_information : <GridLoader></GridLoader>}
		</div>
	);
};

export default AccountSettings;