import React from 'react';

const WeatherBox = ({weather, icon}) => {
    const far = (1.8 * (weather?.main.temp) + 32).toFixed(2);
    //toFixed(출력을 원하는 소수점 자릿수)
    //toFixed(2) => 소수점 3번째 자리에서 반올림

  return (
    <div className='weatherbox'>
      <div>{weather?.sys.country} {weather?.name}</div>  {/* = {weather && weather.name} 조건부 렌더링 */}
      <h2>{weather?.main.temp}°C / {far}°F</h2>
      <h3>{weather?.weather[0].description}</h3>
      <p>최고 기온: {weather?.main.temp_max}°C / 최저 기온: {weather?.main.temp_min}°C</p>
      <img className='icon' src={`http://openweathermap.org/img/wn/${icon}@2x.png`}/>
    </div>
  )
}

export default WeatherBox
