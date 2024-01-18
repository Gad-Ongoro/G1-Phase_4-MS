import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header className='header bg-primary px-5 pt-2 pb-5 text-white'>
            <div className='header-nav-container-1 container-fluid d-flex justify-content-between'>
                <h4 className='text-white'>Spartans Safaris</h4>
                <div className='header-nav_1 d-flex gap-5'>
                    <h5>KES</h5>
                    <p>FLAG</p>
                    <p>Info</p>
                    <p>Register</p>
                    <p>Sign in</p>
                </div>
            </div>
            <div className='header-nav-container-2 d-flex justify-content-around flex-wrap'>
                <NavLink to='/stays' className='text-white nav_links_2'>Stays</NavLink>
                <NavLink to='/flights' className='text-white nav_links_2'>Flights</NavLink>
                <NavLink to='/car_rentals' className='text-white nav_links_2'>Car Rentals</NavLink>
                <NavLink to='/attractions' className='text-white nav_links_2'>Attractions</NavLink>
                <NavLink to='/airport_taxis' className='text-white nav_links_2'>Airport Taxis</NavLink>
            </div>
            <div className='nav_links_info container mt-3'>
                <div>
                    <h2> Car hire for any kind of trip </h2>
                    <p> Great deals at great prices, from the biggest car hire companies </p>
                </div>
            </div>
            <div className='search_form'>
                <form>
                    
                </form>
            </div>
        </header>
    )
}