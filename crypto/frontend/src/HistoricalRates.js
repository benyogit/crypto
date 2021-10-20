import React, { useState, useEffect } from 'react';

import axios from 'axios';
import {API_URL} from './Globals';
const HistoricalRates = () => {
    const [rates, setRates] = useState({});
    useEffect(() => {
        async function fetchRates() {
            let response = await axios.get(`${API_URL}/rates/historical`);
            setRates(response.data);
            
        }
        fetchRates();
      }, []);
    return (
        <div className="grid">
               {Object.entries(rates).map((val,key) => (
                   <div>
                        <div className="align-center">{val[0]}</div>
                        <HistoryGridObject key={key} values={val}></HistoryGridObject>
                   </div>
                ))}
        </div>
    );
};

const HistoryGridObject = (props) =>{
    console.log(props.values);
    return (
            <div >
                {props.values[1].map((rate,key) => (
                    <div key = {key}>
                        <h4> {new Date(rate.time).getHours()}:{new Date(rate.time).getMinutes()} - {rate.rate.toFixed(2)}$</h4>
                    </div>
                ))}                            
            </div>
    );
}
export default HistoricalRates;