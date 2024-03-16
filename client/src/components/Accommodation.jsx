import React, {useContext} from 'react';
import { Routes, Route, useParams, NavLink } from 'react-router-dom';
import { SafarisContext } from '../App';
import Accommodation_Reviews from './Accommodation_Reviews';

function Accommodation() {
	let params = useParams();
	let {accommodations, setAccommodations, setBookings, spinners} = useContext(SafarisContext);

	let accommodation = accommodations.filter((accomm) => {
		return accomm.accommodation_id == params.accommodation_id
	});


  	return (
		<>
			{accommodation[0] !== undefined ?
			<div className='accommodation_card mt-3 d-flex justify-content-around container-fluid' key={accommodations[params.accommodation_id - 1]}>
				<div className=''>
					<img src={accommodation[0].thumbnail} className='accommodation_thumbnail' alt='NA'></img>
				</div>
				<div className="accommodation_info">
					<h3>{accommodation[0].name}</h3>

					<div className='accommodation_location d-flex'>
						<h3 className='ml-5 p-0'>{accommodation[0].location}</h3>
						<img className='accommodation_location_img' src="https://cdn-icons-png.flaticon.com/128/10402/10402353.png" alt="NA" />
					</div>

					<h3>From Kes: {accommodation[0].price}</h3>
					<h3>Rating: {accommodation[0].rating}</h3>

					<button
					type='button'
					className='border-1 border-primary rounded-pill'
					onClick={()=>{setBookings(current => ++current)}}>BOOK NOW</button>
				

					<div className="accommodation_crud d-flex justify-content-around">
						<NavLink to={`/accommodations/${params.accommodation_id}/reviews`} exact>
							<img
							src="https://cdn-icons-png.flaticon.com/128/5910/5910103.png" alt="NA"
							className='comment-btn'
							>
							</img>
						</NavLink>

						<img
						className='edit-btn'
						src='https://cdn-icons-png.flaticon.com/128/10336/10336582.png'
						alt='NA'
						onClick={() => {
							fetch(`https://spartans-safaris.onrender.com/accommodations/${accommodations[params.accommodation_id].accommodation_id}`, {
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
							fetch(`https://spartans-safaris.onrender.com/accommodations/${accommodations[params.accommodation_id].accommodation_id}`,{
								method: 'DELETE'
							}
							)
							.then(res => res.json())
							.then(() => {
								let new_items = accommodations.filter((item) => {
									return(
										item.accommodation_id !== accommodations[params.accommodation_id].accommodation_id
									)
								})
								setAccommodations(new_items)
							}
							)
						}}
						src='https://cdn-icons-png.flaticon.com/128/6861/6861362.png' 
						alt='NA'>
						</img>
					</div>					
				</div>


			</div>
			:
			spinners		
			}

			{accommodations[params.accommodation_id] !== undefined &&
			<Routes>
				<Route
					path={`/reviews`}
					element = {<Accommodation_Reviews></Accommodation_Reviews>}
					exact
				>
				</Route>
			</Routes>
			}
		</>
	);
}

export default Accommodation;