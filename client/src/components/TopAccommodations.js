import React, {useRef} from 'react';
import { NavLink } from 'react-router-dom';

export default function TopAccommodations({accommodations, setAccommodations}) {
	// let [display_cards, setDisplay_cards] = useState();
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

	let top_accommodations = accommodations.filter((accommodation) => {
		return(
			accommodation.rating > 7
		)
	});

	let top_accommodations_cards = top_accommodations.map((accommodation) => {
		return(
			<div className='top_accom_card mt-2 m-2' key={accommodation.accommodation_id}>
				<img src={accommodation.thumbnail} className='accommodation_thumbnail' alt='NA'></img>
				{/* <p>{accommodation.name}</p>
				<p>{accommodation.location}</p>
				<p>From Kes: {accommodation.price}</p> */}
				<div className='accommodation_location d-flex'>
					<h3 className='ml-5 p-0 text-left'>{accommodation.location}</h3>
					<img className='top_accommodation_location_img' src="https://cdn-icons-png.flaticon.com/128/10402/10402353.png" alt="NA" />
				</div>

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
				{top_accommodations_cards}
			</div>
			<img ref={slide_btn_right} className='slide_btn_right' onClick={handleRightBtnClick} src='https://cdn-icons-png.flaticon.com/128/5791/5791265.png' alt='NA'></img>
		</>
 	)
};