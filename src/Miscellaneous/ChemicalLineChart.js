import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsonData from '../data.json';



import { useContext } from "react";
import { ContractContext } from "../Context/ContractContext";
import { AuthContext } from "../Context/AuthContext";
import Loader from './Loader/Loader';


const ChemicalListChart = () => {
  const [chartData, setChartData] = useState([]);
  const { services, rawMaterials } = useContext(ContractContext);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchRawMaterials = async () => {
      console.log("hiiiiiiiiiiii")
      console.log("raw mat" + rawMaterials);
      setisLoading(true)
      const processedChartData = await rawMaterials.map(rawMaterial => ({
        x: rawMaterial.name,
        y: Number(rawMaterial.quantity), // Use the appropriate property for y-axis data
      }));

      setChartData(processedChartData);
      setisLoading(false)
    };

    fetchRawMaterials();
  }, [rawMaterials]);


  // if (!jsonData || jsonData.length === 0) {
  //   return <div>No data available.</div>;
  // }

  // const { xaxis, quantity } = jsonData[0];

  // const chartData = xaxis.map((xValue, index) => ({
  //   x: xValue,
  //   y: quantity[index],
  // }));

  return (<>
    <Loader isLoading={isLoading} />
    {!isLoading && (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Line type="monotone" dataKey="y" stroke="green" strokeWidth={2} dot={{ fill: 'green', r: 6 }} />
          </LineChart>
        </ResponsiveContainer>

      </div>
    )}

  </>
  );
};

export default ChemicalListChart;
