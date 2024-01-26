import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  	return (
		<footer className=''>
			<div className='container'>
				<div className='footer-div_1 d-flex justify-content-center'>
					<NavLink to='/' exact className='text-white home_link'>
						<span className='spartans_span'>Spartans</span> <span className='safaris_span'>Safaris</span>
					</NavLink>
				</div>
				<div className='footer-div_2 d-flex justify-content-between'>
					<div>
						<ul>
							<li><a href='/'>Countries</a></li>
							<li><a href='/'>Regions</a></li>
							<li><a href='/'>Cities</a></li>
							<li><a href='/'>Airports</a></li>
							<li><a href='/'>Hotels</a></li>
							<li><a href='/'>Adventures</a></li>
						</ul>
					</div>

					<div>
						<ul>
							<li><a href='/'>Homes</a></li>
							<li><a href='/'>Apartments</a></li>
							<li><a href='/'>Resorts</a></li>
							<li><a href='/'>Villas</a></li>
							<li><a href='/'>Hostels</a></li>
							<li><a href='/'>B&Bs</a></li>
							<li><a href='/'>Guest houses</a></li>
						</ul>
					</div>

					<div>
						<ul>
							<li><a href='/'>Car hire</a></li>
							<li><a href='/'>Flight finder</a></li>
							<li><a href='/'>Restaurant reservations</a></li>
							<li><a href='/'>Discover</a></li>
							<li><a href='/'>Reviews</a></li>
						</ul>
					</div>

					<div>
						<ul>
							<li><a href='/'>Manage Service</a></li>
							<li><a href='/'>List Property/Service</a></li>
							<li><a href='/'>Invest</a></li>
							<li><a href='/'>Partner</a></li>
							<li><a href='/'>Insurance Policy</a></li>
						</ul>
					</div>


					<div>
						<ul>
							<li><a href='/'>FAQs</a></li>
							<li><a href='/'>About</a></li>
							<li><a href='/'>Customer service</a></li>
							<li><a href='/'>Partnership</a></li>
							<li><a href='/'>Careers</a></li>
							<li><a href='/'>Terms & conditions</a></li>
							<li><a href='/'>Privacy & Cookie Policy</a></li>
						</ul>
					</div>					
				</div>
			</div>
			<div className='copyright d-flex justify-content-center align-items-center'>
				<p className='p-2 m-0'>Copyright 2020 © Spartans Safaris. All rights reserved.</p>
			</div>
		</footer>
  	)
}