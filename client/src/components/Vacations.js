import React from 'react';

export default function Vacations({vacations}) {

	let vacay_cards = vacations.map((vacay) => {
		return(
			<div className='safari_card mt-2' key={vacay.vacation_id}>
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
    	<div className='hot_deals container'>
			<h3>Top Vacations</h3>
			<div className='card_container d-flex flex-wrap justify-content-center  gap-5'>
				{vacay_cards}
			</div>
    	</div>
  	)
}