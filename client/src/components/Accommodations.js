import React from 'react';

export default function Accommodations({accommodations}) {
	console.log(accommodations)

	let accommodation_cards = accommodations.map((accommodation) => {
		return(
			<div className='safari_card mt-2' key={accommodation.accommodation_id}>
				<img src={accommodation.thumbnail} alt='NA'></img>
				<p>{accommodation.name}</p>
				<p>{accommodation.location}</p>
				<p>From Kes: {accommodation.price}</p>
				<p>Rating: {accommodation.rating}</p>
				<button>Book Now</button>
			</div>
		);
	}
	);


  	return (
    	<div className='hot_deals container'>
			<h3>Accommodations</h3>
			<div className='card_container d-flex flex-wrap justify-content-center gap-5'>
				{accommodation_cards}
			</div>
    	</div>
  	)
}