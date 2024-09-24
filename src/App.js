import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import './App.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';

/*
1. 앱이 실행되자마자 현재 위치 기반의 날씨
2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태
3.  5개의 버튼이 있다. -> 1개는 현재, 4개는 다른 도시
4. 도시버튼을 클릭할 때마다 정보가 나타난다. 
5. 현재 위치 버트을 누르면 다시 현재 위치 기반의 날씨
6. 데이터를 들고 오는 동안 로딩 스피너가 돈다. 
*/

function App() {
  const [weather, setWeather] = useState(null);
  const cities = ['hanoi', 'paris', 'rome', 'fukuoka'];
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(false); // 클릭한 버튼 상태
  const [message, setMessage] = useState('');  // 에러 메시지 상태
  const [icon, setIcon] = useState(''); // API 아이콘 사용
  const [searchCity, setSearchCity] = useState('');  // 검색어 상태

  // 현재 위치 가져오기
  const getCurrentLocation = () => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        console.log('위치', lat, lon);
        getWeatherByCurrentLocation(lat, lon); // 함수에 lat, lon 정보 넘겨주기
      });
    } catch (err) {
      setMessage(err.message);
    }
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=12f16c18bca3e6647c2b6d2cfd03a0d8&units=metric&lang=kr&units=metric`;
      setLoading(true);   // fetch 전에 로딩 스피너 true로 돌아감
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setIcon(data.weather[0].icon);
      console.log('data', data);
      setLoading(false);  // 데이터를 불러오면 다시 false로 로딩 종료
    } catch (err) {
      setMessage(err.message);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=12f16c18bca3e6647c2b6d2cfd03a0d8&units=metric&lang=kr`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setIcon(data.weather[0].icon);
      setLoading(false);
    } catch (err) {
      setMessage(err.message);
    }
  };

  useEffect(() => {
    if (city === '') {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  // 현재 위치 버튼
  const currentBtn = () => {
    getCurrentLocation();   //바로 onClick에ㅓ getCurrentLocation을 사용하지 않는 이유: lat, lon 인자가 필요하기 때문에 선언해도 함수 정상 작동 안함.
  };


  return (
    <div>
      {loading ?   // loading이 true면 로딩화면, false면 박스 출력
        <div className='container'>
          {message ? <div>{message}</div> : null}
          <ClipLoader
            color={'orange'}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div> :
        <div className='container'>
          <h1 className='title'>Global Weather Forecast</h1>
          <div className='searching'>
          <input
          type="text"
          placeholder="도시를 입력하세요"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}   //onChange: 변화 감지핸들러 => value를 setSearchCity에 넣어 함수 작동
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setCity(searchCity);  // 엔터키가 눌리면 버튼의 onClick 함수와 동일한 로직 실행
            }
            }}
      />
        
          <button className='search' onClick={() => setCity(searchCity)}>
            <img src='https://cdn.pixabay.com/photo/2015/12/08/17/38/magnifying-glass-1083373_1280.png' width={'25px'}/>
          </button>
          </div>
          <WeatherBox weather={weather} icon={icon} />
          <WeatherButton cities={cities} setCity={setCity} currentBtn={currentBtn} click={click} setClick={setClick}/>
        </div>
      }
    </div>
  );
}

export default App;
