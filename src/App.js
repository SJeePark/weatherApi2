import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './App.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';


/*
1. 앱이 실행되자마자 현재 위치 기반의 날씨
2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태
3.  5개의 버튼이 있따. -> 1개는 현재, 4개는 다른 도시
4. 도시버튼을 클릭할 때마다 정보가 나타난다. 
5. 현재 위치 버트을 누르면 다시 현재 위치 기반의 날씨
6. 데이터를 들고 오는 동안 로딩 스피너가 돈다. 
*/

function App() {

  const [weather, setWeather] = useState(null);
  const cities = ['paris', 'rome', 'tokyo', 'seoul'];
  const [city, setCity] = useState('');

  //현재 위치 가져오기
  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      console.log('위치', lat, lon)
      getWeatherByCurrentLocation(lat, lon) //함수에 lat, lon 정보 넘겨주기
    });
  }

  const getWeatherByCurrentLocation = async (lat, lon) =>{
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=12f16c18bca3e6647c2b6d2cfd03a0d8&units=metric&lang=kr&units=metric`
    let response = await fetch(url)
    let data = await response.json();
    setWeather(data);
    console.log('data', data)
  }

  const getWeatherByCity=async()=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=12f16c18bca3e6647c2b6d2cfd03a0d8&units=metric`
    let response = await fetch(url)
    let data = await response.json();
    setWeather(data)

  }

  useEffect(()=>{
    if(city===''){
    getCurrentLocation()
  }else{
    getWeatherByCity()}
  }, [city])


  return (
    <div className='container'>
      <WeatherBox weather = {weather}/>
      <WeatherButton cities = {cities} setCity={setCity}/>
    </div>
  );
}

export default App;
