import React from 'react';

export default function Accommodations({accommodations, setAccommodations}) {
	// let [new_hotel_name, setNewHotelName] = useState({})

	let accommodation_cards = accommodations.map((accommodation) => {
		return(
			<div className='safari_card mt-2' key={accommodation.accommodation_id}>
				<img src={accommodation.thumbnail} className='accommodation_thumbnail' alt='NA'></img>
				<p>{accommodation.name}</p>
				<p>{accommodation.location}</p>
				<p>From Kes: {accommodation.price}</p>
				<p>Rating: {accommodation.rating}</p>

				<img
				className='edit-btn'
				src='https://cdn-icons-png.flaticon.com/128/10336/10336582.png'
				alt='NA'
				onClick={() => {
					fetch(`http://127.0.0.1:5000/accommodations/${accommodation.accommodation_id}`, {
						method: "PATCH",
						headers: {
							'Content-Type' : 'application/json'
						},
						body: JSON.stringify()

					})
					.then(response => response.json())
				}}
				>
				</img>

				<img 
				className='delete-btn'
				onClick = {()=>{
					fetch(`http://127.0.0.1:5000/accommodations/${accommodation.accommodation_id}`,{
						method: 'DELETE'
					}
					)
					.then(res => res.json())
					.then(() => {
						let new_items = accommodations.filter((item) => {
							return(
								item.accommodation_id !== accommodation.accommodation_id
							)
						})
						setAccommodations(new_items)
					}
					)
				}}
				src='https://cdn-icons-png.flaticon.com/128/6861/6861362.png' 
				alt='NA'>
				</img>

				<button className='d-block'>Book Now</button>
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