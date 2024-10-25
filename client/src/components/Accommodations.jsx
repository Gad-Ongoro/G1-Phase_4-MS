import React from 'react';
import { NavLink } from 'react-router-dom';
import AnimatedXPage from './AnimatedXPage';
import TopAccommodations from './TopAccommodations';
import FilterHotelByLocation from './FilterHotelByLocation';
import { useAppContext } from '../services/utils';

export default function Accommodations() {
	const { accommodationsAndHotels, scrollToTop } = useAppContext();

	let accommodation_cards = accommodationsAndHotels.map((accommodation) => {
		return (
			<div className='safari_card mt-2' key={accommodation.id}>
				<img src={accommodation.thumbnail} className='accommodation_thumbnail' alt='NA'></img>
				<p>{accommodation.name}</p>
				<p>{accommodation.location}</p>
				<p>From Kes: {accommodation.price}</p>
				<p>{accommodation.rating}</p>

				<NavLink
					to={`/accommodations/${accommodation.id}`}
					style={{ textDecoration: "none" }} exact
					onClick={() => {
						scrollToTop();
					}}
				>
					<button className='d-block border-1 border-primary rounded-pill'>Book Now</button>
				</NavLink>
			</div>
		);
	});

	return (
		<AnimatedXPage>
			<div className='hot_deals container'>
				<h3>Top Accommodations</h3>
				<div className='super_container container-fluid d-flex justify-content-center m-0'>
					<div className='track_container'>
						{<TopAccommodations></TopAccommodations>}
					</div>
				</div>

				<h3>Accommodations</h3>
				<div className='card_container d-flex flex-wrap justify-content-center gap-5'>
					{accommodation_cards}
				</div>
			</div>
		</AnimatedXPage>
	)
}