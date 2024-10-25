import React from 'react';
import { Routes, Route, useParams, NavLink } from 'react-router-dom';
import GridLoader from './Loaders/GridLoader';
import { useAppContext } from '../services/utils';
import Accommodation_Reviews from './Accommodation_Reviews';

function Accommodation() {
	let params = useParams();
	const { accommodationsAndHotels } = useAppContext();

	let accommodation = accommodationsAndHotels.filter((accomm) => {
		return accomm.id == params.accommodation_id
	});

	return (
		<>
			{accommodation[0] !== undefined ?
				<div className='accommodation_card mt-3 d-flex justify-content-around container-fluid'>
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
						>BOOK NOW</button>

						<div className="accommodation_crud d-flex justify-content-around">
							<NavLink to={`/accommodations/${params.id}/reviews`} exact>
								<img
									src="https://cdn-icons-png.flaticon.com/128/5910/5910103.png" alt="NA"
									className='comment-btn'
								>
								</img>
							</NavLink>

						</div>
					</div>


				</div>
				:
				<GridLoader></GridLoader>
			}

			{accommodationsAndHotels[params.accommodation_id] !== undefined &&
				<Routes>
					<Route
						path={`/reviews`}
						element={<Accommodation_Reviews></Accommodation_Reviews>}
						exact
					>
					</Route>
				</Routes>
			}
		</>
	);
}

export default Accommodation;