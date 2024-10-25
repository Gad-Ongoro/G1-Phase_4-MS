import React, {useContext, useRef, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../services/utils';

function FilterHotelByLocation() {
	const { accommodationsAndHotels } = useAppContext();
	let carousel_track = useRef();
	let [ searchTerm, setSearchTerm ] = useState('');

	function handleLeftBtnClick(e){
		carousel_track.current.style.cssText = `
			transform: translateX(0px);
			transition: all 0.7s;
		`
	};

	function handleRightBtnClick(e){
		carousel_track.current.style.cssText = `
			transform: translateX(-900px);
			transition: all 0.7s;
		`
	};

  // filter by location
	let filtered_results = accommodationsAndHotels.filter((accommodation)=>{
		return(
			accommodation.location.toLowerCase().includes(searchTerm.toLowerCase())
		)
	})

	let display_cards = filtered_results.map((accommodation) => {
		return(
			<div className='top_accom_card mt-2 m-2' key={accommodation.accommodation_id}>
				<img src={accommodation.thumbnail} className='accommodation_thumbnail' alt='NA'></img>
				<h4 className='m-0 text-center'>{accommodation.location}</h4>
				<p className='m-0 text-center'>{accommodation.name}</p>
				<p className='m-0 text-center'>From Kes: {accommodation.price}</p>

				<NavLink to={`/accommodations/${accommodation.id}`} style={{textDecoration: "none"}}>
					<button className='d-block border-1 border-primary rounded-pill'>Book Now</button>
				</NavLink>
			</div>
		);
	})

	return (
		<>
			{display_cards}
		</>
 	)
}

export default FilterHotelByLocation;