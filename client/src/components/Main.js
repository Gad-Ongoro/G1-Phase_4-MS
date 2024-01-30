import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLog from './UserLog';
import Vacations from './Vacations';
import Accommodations from './Accommodations';
import Accommodation from './Accommodation';
import SignIn from './SignIn';
import CustomerBookings from './CustomerBookings';

export default function Main({vacations, accommodations, setAccommodations}) {
  return (
    <main>
        <Routes>
            <Route path='/accommodations/:id' element={<Accommodation></Accommodation>}></Route>
            <Route element={<Vacations vacations = {vacations}></Vacations>} path='/vacations'></Route>
            <Route path='/accommodations' element={<Accommodations accommodations = {accommodations} setAccommodations={setAccommodations}></Accommodations>} exact></Route>
            <Route path='/signup' exact element={<UserLog></UserLog>}></Route>
            <Route path='/signin' exact element={<SignIn></SignIn>}></Route>
            <Route path='/my_bookings' exact element={<CustomerBookings></CustomerBookings>}></Route>
        </Routes>

        <div className='app_subscribe'>
            <div className='qr_code_div'>
                <img src='https://gado.w3spaces.com/Img/qrcode.png' alt='NA'></img>
                <h6 className='p-0 mt-0'>Get our mobile application</h6>
            </div>

            <div className='email_subscription mt-3'>
                <h2>Join the Safaris Community</h2>
                <p>Your highly customized holidays have never been easier to curate and enjoy.
                Safaris has exclusive offers and new holiday inspirations, which we will send directly to you via email.
                Sign up with us to experience unique destinations and accommodation options, and mind-blowing fun with our things to do.</p> 
                <p>Worry no more about your next flight, airport transfers or car hire. We are here to ensure that your experience creates lasting memories shared with others through your lenses.</p>
                <form>
                    <input type='email' name="newsletter_mail" className='newsletter_mail_input' placeholder='Email Address'></input>
                    <input type='submit' value="Join Now" className='newsletter_mail_submit'></input>
                </form>
            </div>

            <div className='why-us mt-3'>
                <div className='d-flex flex-column align-items-center'>
                    <h2>Why Spartans Safaris?</h2>
                    <ul>
                        <li>Personalized holidays</li>
                        <li>Support at every step</li>
                        <li>Value for money</li>
                        <li>Great flying options</li>
                        <li>Amazing deals</li>
                    </ul>
                </div>
            </div>

            <div className='socials d-flex flex-column gap-2'>
				<img src='https://img.icons8.com/?size=100&id=118467&format=png' alt='facebook'></img>
				<img src='https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png' alt='twitter'></img>
				<img src='https://img.icons8.com/?size=100&id=32309&format=png' alt='instagram'></img>
				<img src='https://img.icons8.com/?size=100&id=8808&format=png' alt='linkedin'></img>
			</div>

        </div>
    </main>
  )
}