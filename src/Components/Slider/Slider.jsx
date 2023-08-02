import './Slider.css'
import {React, useEffect, useState} from 'react';
import axios from 'axios';

function Slider() {
    useEffect(()=>{
        axios(`${import.meta.env.VITE_APP_BASE_URL}upcoming?api_key=${import.meta.env.VITE_APP_API_KEY}`)
        .then(res=>console.log(res.data.results))
        .catch(err => console.log(err))
    })
  return (
    <div>
        Slider
    </div>
  )
}

export default Slider