import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = () => {
  return (
    <div>
      <Button variant="secondary">CurrentLocation</Button>
      <Button variant="secondary">Seoul</Button>
      <Button variant="secondary">Paris</Button>
      <Button variant="secondary">NewYork</Button>

    </div>
  )
}

export default WeatherButton
