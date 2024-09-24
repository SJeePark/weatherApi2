import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, setCity, currentBtn, click, setClick}) => {

   // 현재 위치 색상 변경
   const handleCurrentClick = () => {
    currentBtn(); 
    setClick('');
  };

  // 도시 버튼 색상 변경
  const handleCityClick = (city) => {
    setCity(city);
    setClick(city); 
  };


  return (
    <div className='btnlist'>
      <Button
        variant={click === '' ? 'primary' : 'secondary'}
        onClick={handleCurrentClick}
      >
        Current Location
      </Button>

      {cities.map((item, index) => (
        <Button
          key={index}
          variant={click === item ? 'primary' : 'secondary'} 
          onClick={() => handleCityClick(item)}
        >
          {item}
        </Button>
      ))}

    </div>
  )
}

export default WeatherButton
