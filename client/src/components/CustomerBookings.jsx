import React, {useState, useEffect} from 'react';

function CustomerBookings() {
    let [customer_bookings, setCustomerBookings] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:5000//customer_bookings/2')
        .then(response => response.json())
        .then(data => {
            setCustomerBookings(data);
            console.log(data[0]);
        })
    },
    [])

    const booking_card = customer_bookings.map((customer_booking) => {
        return(
            <div className='row gap-3' key={customer_booking.booking_id}>
                <div className='accommodation_bookings col d-flex gap-5'>
                    <img src={`${customer_booking.accommodation.thumbnail}`} alt="NA" width={300}></img>
                    <div>
                        <h3>Accommodation details:</h3>
                        <p>Name: {customer_booking.accommodation.name}</p>
                        <p>Location: {customer_booking.accommodation.location}</p>
                    </div>
                </div>

                <div className='vacation_bookings col d-flex gap-5'>
                    <img src={`${customer_booking.vacation.thumbnail}`} alt="NA" width={300}></img>
                    <div>
                        <h3>Vacation details:</h3>
                        <p>Name: {customer_booking.vacation.name}</p>
                        <p>Location: {customer_booking.vacation.location}</p>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div>
            <h2 className='text-center text-primary'>My Bookings</h2>
            {booking_card}
        </div>
    );
};

export default CustomerBookings;