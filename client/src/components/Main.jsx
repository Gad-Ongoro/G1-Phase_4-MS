import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Vacations from './Vacations';
import Accommodations from './Accommodations';
import Accommodation from './Accommodation';
import SignIn from './SignIn';
import CustomerBookings from './CustomerBookings';
import CustomerAccount from './CustomerAccount';
import { useAppContext } from '../services/utils';
import Header from './Header';
import GridLoader from './Loaders/GridLoader';

export default function Main() {
	const { setBookings, vacations, accommodationsAndHotels, setAccommodationsAndHotels } = useAppContext();
  let acc_loaded = accommodationsAndHotels[0] !== undefined;
  let vac_loaded = vacations[0] !== undefined;

  return (
    <main>
      <Header />
      <Routes>
        <Route path='/' element={<Accommodations />} />
        <Route path='/vacations' element={vac_loaded ? <Vacations vacations={vacations} /> : <GridLoader></GridLoader>} />
        <Route path='/accommodations' element={acc_loaded ? <Accommodations accommodations={accommodationsAndHotels} setAccommodations={setAccommodationsAndHotels} /> : <GridLoader></GridLoader>} exact />
        <Route path='/accommodations/:accommodation_id/*' element={<Accommodation />} />
        <Route path='/signin' exact element={<SignIn />} />
        <Route path='/my_bookings' exact element={<CustomerBookings />} />
        <Route path='/account/*' exact element={<CustomerAccount />} />
      </Routes>

      <div className='app_subscribe'>
        <div className='email_subscription mt-3'>
          <h2>Join the Safaris Community</h2>
          <div className='d-flex flex-column align-items-center'>
            <p>Your highly customized holidays have never been easier to curate and enjoy.
              Safaris has exclusive offers and new holiday inspirations, which we will send directly to you via email.
              Sign up with us to experience unique destinations and accommodation options, and mind-blowing fun with our things to do.</p>
            <p>Worry no more about your next flight, airport transfers or car hire. We are here to ensure that your experience creates lasting memories shared with others through your lenses.</p>
            <form>
              <input type='email' name="newsletter_mail" className='newsletter_mail_input' placeholder='Email Address' />
              <input type='submit' value="Join Now" className='newsletter_mail_submit' />
            </form>
          </div>
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

        <div className='qr_code_div'>
          {/* <img src='https://gado.w3spaces.com/Img/qrcode.png' alt='NA' /> */}
          <img src='https://i.pinimg.com/564x/46/6f/1a/466f1aa5d91bd75150cd8c1005b1ef21.jpg' height={300} width={300} className='object-cover' alt='NA' />
          <h6 className='p-0 mt-0'>Get our mobile application</h6>

          <div className='socials d-flex gap-2 justify-content-center'>
            <img src='https://img.icons8.com/?size=100&id=118467&format=png' alt='facebook' />
            <img src='https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png' alt='twitter' />
            <img src='https://img.icons8.com/?size=100&id=32309&format=png' alt='instagram' />
            <img src='https://img.icons8.com/?size=100&id=8808&format=png' alt='linkedin' />
          </div>
        </div>

      </div>
    </main>
  );
}
