import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

function App() {
  const API_KEY = "2b62a46be3f92ad9414c7c6d8a36433c";
  const [location, setLocation] = useState("");
  const [result, setResult] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

  const searchWeather = async (e) => {
    if (e.key === "Enter") {
      try {
        const response = await axios.get(url);
        setResult(response.data); // 데이터를 result 상태로 설정
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <AppWrap>
      <p>날씨 정보 앱</p>
      <div className="appContentWrap">
        <Input
          placeholder="도시명을 영문으로 입력해주세요. ex) Daejeon, Busan"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          onKeyDown={searchWeather}
        />
        {Object.keys(result).length !== 0 && (
          <ResultWrap>
            <div className="info">
              <div>도시명: {result.name}</div>
              <div>현재 온도: {result.main.temp}°C</div>
              <div>현재 습도: {result.main.humidity}%</div>
              <div>현재 풍속: {result.wind.speed}m/s</div>
              <div>기상: {result.weather[0].main}</div>
            </div>
            <div className="icon">
              <img
                src={`http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`}
                alt="날씨 아이콘"
              />
            </div>
          </ResultWrap>
        )}
      </div>
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f8f9fa;

p {
    font-size: 50px;
    font-weight: bold;
    margin-bottom: 20px;
  }

`;

const Input = styled.input`
  width: 600px;
  max-width: 400px;
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 15px;
  outline: none;
  margin-bottom: 20px;
`;

const ResultWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 600px;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  background-color: #fff;

  .info {
    font-size: 20px;
    line-height: 1.6;
  }

  .icon img {
    width: 100px;
    height: 100px;
    border: 1px solid lightgray;
    border-radius: 100px;
  }
`;
