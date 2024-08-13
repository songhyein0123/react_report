import React, { useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [bronze, setBronze] = useState(0);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleGoldChange = (event) => {
    setGold(Number(event.target.value));
  };

  const handleSilverChange = (event) => {
    setSilver(Number(event.target.value));
  };

  const handleBronzeChange = (event) => {
    setBronze(Number(event.target.value));
  };
//상태 관리와 메달 집계 추가 기능 구현
  const handleAddCountry = (event) => {
    event.preventDefault();
    const existingCountry = countries.find((c) => c.name === country);
    if (existingCountry) {
      alert("이미 등록된 국가입니다.");
      return;
    }
    const newCountry = {
      name: country,
      medals: { gold, silver, bronze },
    };

    setCountries([...countries, newCountry]);

    setCountry("");
    setGold(0);
    setSilver(0);
    setBronze(0);
  };
//메달 수 업데이트
  const handleUpdateCountry = (event) => {
    event.preventDefault();

    const existingCountry = countries.find((c) => c.name === country);
    if (existingCountry) {
      const updatedCountries = countries.map((c) =>
        c.name === country
          ? {
              name: country,
              medals: { gold, silver, bronze },
            }
          : c
      );

      setCountries(updatedCountries);

      setCountry("");
      setGold(0);
      setSilver(0);
      setBronze(0);
    } else {
      alert("등록 되지 않은 국가입니다.");
    }
  };
//메달 수 삭제
  const handleDeleteCountry = (countryName) => {
    const updatedCountries = countries.filter((c) => c.name !== countryName);
    setCountries(updatedCountries);
  };

  //메달 수에 따른 순위변경
  const sortedCountries = [...countries].sort((a, b) => {
    if (b.medals.gold !== a.medals.gold) {
      return b.medals.gold - a.medals.gold; 
    } else if (b.medals.silver !== a.medals.silver) {
      return b.medals.silver - a.medals.silver; 
    } else {
      return b.medals.bronze - a.medals.bronze; 
    }
  });

  return (
    <div className="container">
      <h1>2024 파리 올림픽</h1>
      <form className="input-group">
        <div className="input-row">
          <label>국가명</label>
          <input type="text" value={country} onChange={handleCountryChange} />
        </div>
        <div className="input-row">
          <label>금메달</label>
          <input type="number" value={gold} onChange={handleGoldChange} />
        </div>
        <div className="input-row">
          <label>은메달</label>
          <input type="number" value={silver} onChange={handleSilverChange} />
        </div>
        <div className="input-row">
          <label>동메달</label>
          <input type="number" value={bronze} onChange={handleBronzeChange} />
        </div>
        <div className="button-group">
          <button type="submit" onClick={handleAddCountry}>
            국가 추가
          </button>
          <button type="button" onClick={handleUpdateCountry}>
            업데이트
          </button>
        </div>
      </form>
      {/* 메달 집계 리스트 출력하기 */}
      {countries.length === 0 ? (
        <p>아직 추가된 국가가 없습니다. 메달을 추적하세요!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>국가명</th>
              <th>금메달</th>
              <th>은메달</th>
              <th>동메달</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {sortedCountries.map((country, index) => (
              <tr key={index}>
                <td>{country.name}</td>
                <td>{country.medals.gold}</td>
                <td>{country.medals.silver}</td>
                <td>{country.medals.bronze}</td>
                <td>
                  <button type="button" onClick={() => handleDeleteCountry(country.name)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
