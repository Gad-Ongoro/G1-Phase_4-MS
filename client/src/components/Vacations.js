import React from 'react';

export default function Vacations() {
  	return (
    	<div className='hot_deals container'>
			<h3>Top Vacations</h3>
			<div className='card_container d-flex gap-5'>
				<div className='safari_card mt-2'>
					<img src='https://viutravel-cms-bucket.s3.eu-west-1.amazonaws.com/11582/conversions/WhatsApp-Image-2023-06-06-at-10.47.22-AM-thumbnail.webp' alt='NA'></img>
					<p>Location</p>
					<p>Rating</p>
					<p>Price</p>
					<button>Book Now</button>
				</div>

				<div className='safari_card mt-2'>
					<img src='https://viutravel-cms-bucket.s3.eu-west-1.amazonaws.com/4025/conversions/Maasai-Mara-Thumbnail-2-thumbnail.webp' alt='NA'></img>
					<p>Location</p>
					<p>Rating</p>
					<p>Price</p>
					<button>Book Now</button>
				</div>

				<div className='safari_card mt-2'>
					<img src='https://viutravel-cms-bucket.s3.eu-west-1.amazonaws.com/102/conversions/rsz-Ecotourism-Thumb-thumbnail.webp' alt='NA'></img>
					<p>Location</p>
					<p>Rating</p>
					<p>Price</p>
					<button>Book Now</button>
				</div>

				<div className='safari_card mt-2'>
					<img src='https://viutravel-cms-bucket.s3.eu-west-1.amazonaws.com/122/conversions/rsz-Romantic-Thumb-%282%29-thumbnail.webp' alt='NA'></img>
					<p>Location</p>
					<p>Rating</p>
					<p>Price</p>
					<button>Book Now</button>
				</div>
			</div>
    	</div>
  	)
}