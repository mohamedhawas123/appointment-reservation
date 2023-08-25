import React, { useEffect, useState } from 'react';
import ReservationForm from '../components/appointments/ReservationForm';
import Navbar from '../components/navbar/Navbar';
import axios from 'axios';


const HomeScreen = ({location, history}) => {

  const user:any = localStorage.getItem('user')
  const userParsed = JSON.parse(user)

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submitReserve = async(date, name) => {
    console.log(name)
    if(!name || !date) return;
    if(!user) {
      return;
    }
    const UserId = userParsed['id']

    const response = await axios.post('https://appointment-nestjs-production.up.railway.app/appointment', {
      date,
      name
    },
    {
      params:{
        userId:UserId
      }
    }
    )
    if(response.status ===201) {
      console.log('success')
      setMessage('you have successfully created a new appointment');
    }else {
      setError('some error occurred');

    }
  };

  useEffect(() => {
    if(user == null) {
      history.push('/login')
    }
  }, [])

 

  return (
    <div>
      <div className="background-image"></div>
      <div>
        <Navbar name="My Reversation" />
      </div>
      <div id="content">
        <p className='text-success' >{message}</p>
        <p className='text-danger' >{error}</p>

        <h1>Appointment Reservation</h1>
        <ReservationForm onReserve={(date, name) => submitReserve(date, name)} />
      </div>
    </div>
  );
};

export default HomeScreen;
