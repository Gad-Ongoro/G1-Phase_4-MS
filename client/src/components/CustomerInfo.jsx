import React from 'react';

function CustomerInfo() {
  	return (
    	<div className='container account_details'>
			<div className='dp_name d-flex justify-content-center align-items-center gap-3'>
				<img className='dp' src="https://i.pinimg.com/474x/21/d7/23/21d7230202a30e3f8acd8ff1d284407d.jpg" alt="NA"/>
				<div>
					<h4 className='m-0'>Sean Newton</h4>
					<p className='m-0 text-secondary'>Nairobi, Kenya</p>
				</div>
			</div>
			<div className='fields_details mt-4'>
				<div>
					<p className='m-1 text-secondary'>First Name</p>
					<h6 className='mx-3'>Sean</h6>
				</div>
				<div>
					<p className='m-1 text-secondary'>Last Name</p>
					<h6 className='mx-3'>Newton</h6>
				</div>
				<div>
					<p className='m-1 text-secondary'>User Name</p>
					<h6 className='mx-3'>SN01</h6>
				</div>
				<div>
					<p className='m-1 text-secondary'>Email Address</p>
					<h6 className='mx-3'>seannewton@gmail.com</h6>
				</div>
				<div>
					<p className='m-1 text-secondary'>Backup Email</p>
					<h6 className='mx-3'>sn@outlook.com</h6>
				</div>
				<div>
					<p className='m-1 text-secondary'>Phone Number</p>
					<h6 className='mx-3'>+1 1111 11 1111</h6>
				</div>
				<div>
					<p className='m-1 text-secondary'>Location</p>
					<h6 className='mx-3'>Nairobi, Kenya</h6>
				</div>
				<div>
					<p className='m-1 text-secondary'>Nationality</p>
					<h6 className='mx-3'>Kenyan</h6>
				</div>
				<div>
					<p className='m-1 text-secondary'>Postal Code</p>
					<h6 className='mx-3'>00100</h6>
				</div>
				<div>
					<p className='m-1 text-secondary'>Account Type</p>
					<h6 className='mx-3'>Customer</h6>
				</div>
			</div>
		</div>
  	)
};

export default CustomerInfo;