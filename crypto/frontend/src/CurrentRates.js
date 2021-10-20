import React, { useState, useEffect } from 'react';

import axios from 'axios';
import {API_URL} from './Globals';
const CurrentRates = () => {
    const [rates, setRates] = useState([]);
    useEffect(() => {
        async function fetchCurrentRates() {
            let response = await axios.get(`${API_URL}/rates/current`);
            setRates(response.data);
        }
        fetchCurrentRates();
    }, []);
    
    return (
        <div>
            <div className="grid">
                {rates.map((rate) => (
                    <div key = {rate.fiat_code+rate.crypto_code}>
                        <h4> {rate.rate_name} = {rate.rate.toFixed(2)}$</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CurrentRates;