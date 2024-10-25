import React from 'react';
import AnimatedXPage from './AnimatedXPage';
import { useAppContext } from '../services/utils';

export default function Vacations() {
	const { vacations } = useAppContext();

	let vacay_cards = vacations.map((vacay) => {
		return(
			<div className='safari_card mt-2' key={vacay.id}>
				<img src={vacay.thumbnail} className='accommodation_thumbnail' alt='NA'></img>
				<p>{vacay.name}</p>
				<p>{vacay.location}</p>
				<p>From Kes: {vacay.price}</p>
				<p>Rating: {vacay.rating}</p>
				<button>Book Now</button>
			</div>
		)
	})

  	return (
		<AnimatedXPage>
    	<div className='hot_deals container'>
			<h3>Top Vacations</h3>
			<div className='card_container d-flex flex-wrap justify-content-center  gap-5'>
				{vacay_cards}
			</div>
    	</div>
		</AnimatedXPage>
  	)
};