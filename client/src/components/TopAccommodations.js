import React from 'react';
import { NavLink } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { useAppContext } from '../services/utils';

export default function TopAccommodations() {
	const { accommodationsAndHotels } = useAppContext();
	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 4,
			slidesToSlide: 1,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 3,
			slidesToSlide: 1,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1
		}
	};

	let top_accommodations = accommodationsAndHotels.filter((accommodation) => {
		return(
			accommodation.rating === '★★★★★' || accommodation.rating === '★★★★'
		)
	});

	let topAccommodationsCards = top_accommodations.map((accommodation) => {
		return(
			<div className='top_accom_card mt-2' key={accommodation.id}>
				<img src={accommodation.thumbnail} className='accommodation_thumbnail h-56' alt='NA'></img>
				<div className='accommodation_location d-flex'>
					<h3 className='ml-5 p-0 text-left'>{accommodation.location}</h3>
					<img className='top_accommodation_location_img' src="https://cdn-icons-png.flaticon.com/128/10402/10402353.png" alt="NA" />
				</div>

				<NavLink to={`/accommodations/${accommodation.id}`} style={{textDecoration: "none"}}>
					<button className='d-block border-1 border-primary rounded-pill'>Book Now</button>
				</NavLink>
			</div>
		);
	})

    return (
		<>
			<Carousel
				swipeable={true}
				draggable={false}
				responsive={responsive}
				ssr={true}
				infinite={true}
				autoPlaySpeed={200}
				keyBoardControl={true}
				transitionDuration={200}
				containerClass="carousel-container"
				dotListClass="custom-dot-list-style"
				itemClass="carousel-item-padding-40-px"
				className='transition-all rounded-lg h-56 z-0'
			>
				{topAccommodationsCards.map((card) => <div>{card}</div>)}
			</Carousel>
		</>
 	);
};