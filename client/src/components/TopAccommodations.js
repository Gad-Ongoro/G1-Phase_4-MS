import React from 'react';
import { NavLink } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

export default function TopAccommodations({ accommodations }) {
	const responsive = {
		superLargeDesktop: {
		  	breakpoint: { max: 4000, min: 3000 },
		  	items: 5,
		  	slidesToSlide: 3
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 4,
			slidesToSlide: 2
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
			slidesToSlide: 2
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1
		}
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
					<button className='d-block border-1 border-primary rounded-pill'>Book Now</button>
				</NavLink>
			</div>
		);
	})

    return (
		<>
			<Carousel responsive={responsive}>
				{top_accommodations_cards.map((card) => <div>{card}</div>)}
			</Carousel>
		</>
 	);
};