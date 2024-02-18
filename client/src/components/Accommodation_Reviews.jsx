import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SafarisContext } from '../App';

function Accommodation_Reviews() {
	let { reviews } = useContext(SafarisContext);
	let params = useParams();

	let review_card = reviews.map((review) => {
		if (review.accommodation_id == params.accommodation_id) {
			return (
				<div key={review.review_id} className='m-0 text-center'>
					<p className='m-1'>
						<span className='text-primary'>{review.customer.first_name}:</span>
						{review.description}
					</p>
				</div>
			);
		};
	});

	return (
		<div className='text-center'>
			<button className='border-1 border-primary rounded-pill'>Add Review</button>
			{ review_card }
		</div>
	);
};

export default Accommodation_Reviews;