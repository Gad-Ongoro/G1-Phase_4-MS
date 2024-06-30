import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import AnimatedXPage from './AnimatedXPage';
import TopAccommodations from './TopAccommodations';
import FilterHotelByLocation from './FilterHotelByLocation';
import { SafarisContext } from '../App';

export default function Accommodations({accommodations, setAccommodations}) {
	// let [new_hotel_name, setNewHotelName] = useState({})
	let {scrollToTop} = useContext(SafarisContext);

	let accommodation_cards = accommodations.map((accommodation) => {
		return(
			<div className='safari_card mt-2' key={accommodation.accommodation_id}>
				<img src={accommodation.thumbnail} className='accommodation_thumbnail' alt='NA'></img>				
				<p>{accommodation.name}</p>
				<p>{accommodation.location}</p>
				<p>From Kes: {accommodation.price}</p>
				<p>{accommodation.rating}</p>

				<img
				className='edit-btn'
				src='https://cdn-icons-png.flaticon.com/128/10336/10336582.png'
				alt='NA'
				onClick={() => {
					fetch(`https://spartans-safaris.onrender.com/accommodations/${accommodation.accommodation_id}`, {
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
					fetch(`https://spartans-safaris.onrender.com/accommodations/${accommodation.accommodation_id}`,{
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

				<NavLink
				to={`/accommodations/${accommodation.accommodation_id}`}
				style={{textDecoration: "none"}} exact 
				onClick={()=>{
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

			<div className='super_container container-fluid d-flex justify-content-center m-0'>
				<div className='track_container'>
					{<FilterHotelByLocation accommodations={accommodations} setAccommodations={setAccommodations}></FilterHotelByLocation>}
				</div>
			</div>

			<h3>Top Accommodations</h3>
			<div className='super_container container-fluid d-flex justify-content-center m-0'>
				<div className='track_container'>
					{<TopAccommodations accommodations={accommodations} setAccommodations={setAccommodations}></TopAccommodations>}
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