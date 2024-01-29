import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';
import { SafarisContext } from '../App';

function Accommodation() {
	let params = useParams();
	let {accommodations, setAccommodations, bookings, setBookings} = useContext(SafarisContext)

	console.log(params);
  	return (
    	<div className='accommodation_card mt-3 d-flex justify-content-around container-fluid' key={accommodations[params.id - 1]}>
			<div className=''>
				<img src={accommodations[params.id - 1].thumbnail} className='accommodation_thumbnail' alt='NA'></img>
			</div>
			<div className="accommodation_info">
				<h3>{accommodations[params.id - 1].name}</h3>

				<div className='accommodation_location d-flex'>
					<h3 className='ml-5 p-0'>{accommodations[params.id - 1].location}</h3>
					<img className='accommodation_location_img' src="https://cdn-icons-png.flaticon.com/128/10402/10402353.png" alt="NA" />
				</div>

				<h3>From Kes: {accommodations[params.id - 1].price}</h3>
				<h3>Rating: {accommodations[params.id - 1].rating}</h3>

				<button type='button' onClick={()=>{
					setBookings(current => ++current)
				}}>BOOK NOW</button>
			

				<div className="accommodation_crud d-flex justify-content-around">
					<img
					className='edit-btn'
					src='https://cdn-icons-png.flaticon.com/128/10336/10336582.png'
					alt='NA'
					onClick={() => {
						fetch(`http://127.0.0.1:5000/accommodations/${accommodations[params.id].accommodation_id}`, {
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
						fetch(`http://127.0.0.1:5000/accommodations/${accommodations[params.id].accommodation_id}`,{
							method: 'DELETE'
						}
						)
						.then(res => res.json())
						.then(() => {
							let new_items = accommodations.filter((item) => {
								return(
									item.accommodation_id !== accommodations[params.id].accommodation_id
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
	);
}

export default Accommodation;