import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header className='header px-5 pt-2 pb-5 text-white'>
            <div className='header-nav-container-1 container-fluid d-flex justify-content-between'>
                <h4 className='text-white'>
                    <NavLink to='/' exact className='text-white home_link'>
                        <span className='spartans_span'>Spartans</span> <span className='safaris_span'>Safaris</span>
                    </NavLink>
                </h4>
                <div className='header-nav_1 d-flex gap-5'>
                    <h5>KES</h5>
                    <img className='language_img' src='https://t-cf.bstatic.com/design-assets/assets/v3.109.0/images-flags/Gb@3x.png' alt='NA'></img>
                    <img className='support_img' src='https://cdn-icons-png.flaticon.com/128/10309/10309127.png' alt='NA'></img>
                    <p>
                        <NavLink to='/bookings' className='text-white nav_links_2'>Manage Booking</NavLink>
                    </p>
                    <p>
                        <NavLink to='/account' className='text-white nav_links_2' exact>Sign in</NavLink>
                    </p>
                    <p>
                        <NavLink to='/account' className='text-white' exact>
                            <img src='https://cdn-icons-png.flaticon.com/128/10307/10307911.png' alt='NA' className='profile_img'></img>
                        </NavLink>
                    </p>
                </div>
            </div>
            <div className='header-nav-container-2 d-flex justify-content-around flex-wrap'>
                <div className='service_div'>
                    <NavLink to='/accommodations' className='nav_links_2'>Accommodations & Hotels</NavLink>
                </div>

                <div className='service_div'>
                    <NavLink to='/attractions' className='nav_links_2'>Attractions & Activities</NavLink>
                </div>

                <div className='service_div'>                    
                    <a href='https://www.kenya-airways.com/en-us/' className='nav_links_2' target='_blank' rel="noreferrer">
                        Flights
                    </a>                   
                </div>

                <div className='service_div'>
                    <NavLink to='/car_rentals' className='nav_links_2'>Car Rentals</NavLink>
                </div>

                <div className='service_div'>                    
                    <a href='https://www.uber.com' className='nav_links_2' target='_blank' rel="noreferrer">
                        Taxis/Uber
                    </a>                   
                </div>
            </div>

            <div className='nav_links_info container mt-3 mb-0'>
                <div>
                    <h2> Car hire for any kind of trip </h2>
                    <p> Great deals at great prices, from the biggest car hire companies </p>
                </div>
            </div>
            <div className='search_form py-1 px-3'>
                <form className='d-flex gap-1'>
                    <input type='text' className='' placeholder='Destination'></input>
                    <input type='date'></input>
                    <input type='date'></input>
                    <input type='submit' value="Search"></input>                    
                </form>
            </div>
        </header>
    )
}