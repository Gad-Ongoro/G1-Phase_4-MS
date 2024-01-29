import React, {useContext, useRef} from 'react';
import { NavLink } from 'react-router-dom';
import { SafarisContext } from '../App';

function FilterHotelByLocation() {
	let carousel_track = useRef();
	let slide_btn_left = useRef();
	let slide_btn_right = useRef();

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


	let {searchTerm, accommodations} = useContext(SafarisContext);
    // filter by location
	let filtered_results = accommodations.filter((accommodation)=>{
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

				<NavLink to={`/accommodations/${accommodation.accommodation_id}`} style={{textDecoration: "none"}}>
					<button className='d-block'>Book Now</button>
				</NavLink>
			</div>
		);
	})

	return (
		<>
			<img ref={slide_btn_left} className='slide_btn_left' onClick={handleLeftBtnClick} src='https://cdn-icons-png.flaticon.com/128/5791/5791265.png' alt='NA'></img>
			<div ref={carousel_track} className='tracker d-flex gap-5'>
				{display_cards}
			</div>
			<img ref={slide_btn_right} className='slide_btn_right' onClick={handleRightBtnClick} src='https://cdn-icons-png.flaticon.com/128/5791/5791265.png' alt='NA'></img>
		</>
 	)
}

export default FilterHotelByLocation;