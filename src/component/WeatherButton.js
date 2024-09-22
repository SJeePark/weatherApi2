import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, setCity}) => {
  console.log('c', cities)
  return (
    <div>
      <Button variant="secondary">CurrentLocation</Button>
      {cities.map((item, index)=>[
        <Button variant = 'secondary'
        key={index}
        onClick={()=>setCity(item)}
        >{item}
        </Button>
      ])}

    </div>
  )
}

export default WeatherButton
