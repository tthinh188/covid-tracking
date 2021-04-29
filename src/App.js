import React, { useEffect, useState } from 'react'
import Cards from './components/cards/Cards'
import CountryPicker from './components/country_picker/CountryPicker'
import Chart from './components/chart/Chart'
import { fetchData } from './api/axios'
import styles from './App.module.css';

import coronaImage from './img/image.png';

function App() {
  const [data, setData] = useState({ data: {}, country: 'Global' });
  

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchData());
    }

    fetchAPI();
  },[])

  const handleCountrySelect = async (country) => {
    setData(await fetchData(country));
  }
  
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={coronaImage} className={styles.image}/>
        <h2 className={styles.animation}>Covid Tracking App by Thinh Phan - PTT</h2>
        <h1 className={styles.animation}>{data.country? data.country : "Global"}</h1>
        <p className={styles.date}>{new Date(data.lastUpdate).toDateString()}</p>
      </div>
      
      <Cards data={data}/>
      <CountryPicker handleCountrySelect={handleCountrySelect}/>
      <Chart data={data} country={data.country}/>
      <footer className={styles.footer}>api: https://covid19.mathdro.id/api</footer>
    </div>
  );
}

export default App;
