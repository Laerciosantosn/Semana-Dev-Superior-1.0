import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

import { barOptions, pieOptions } from './chart-options';
import {
  buildBarSeries,
  getPlatformChartData,
  getGenderChartData,
} from './helpers';
import Filters from '../../components/Filters';

import './styles.css';

type PieChartData = {
  labels: string[];
  series: number[];
};

export type BarChartData = {
  x: string;
  y: number;
};

const initialPieData = {
  labels: [],
  series: [],
};

const BASE_URL = 'http://localhost:8080';

const Charts: React.FC = () => {
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
  const [platformData, setPlatformData] = useState<PieChartData>(
    initialPieData,
  );
  const [genderData, setGenderData] = useState<PieChartData>(initialPieData);

  useEffect(() => {
    async function getData() {
      const recordsReponse = await axios.get(`${BASE_URL}/records`);
      const gamesReponse = await axios.get(`${BASE_URL}/games`);

      const barData = buildBarSeries(
        gamesReponse.data,
        recordsReponse.data.content,
      );
      setBarChartData(barData);

      const platformChartData = getPlatformChartData(
        recordsReponse.data.content,
      );
      setPlatformData(platformChartData);

      const genderChartData = getGenderChartData(recordsReponse.data.content);
      setGenderData(genderChartData);
    }

    getData();
  }, []);

  return (
    <div className="page-container">
      <Filters link="/records" linkText="VER TABELA" />
      <div className="chart-container">
        <div className="top-related">
          <h1 className="top-related-title">Jogos mais votados</h1>
          <div className="games-container">
            <Chart
              options={barOptions}
              type="bar"
              width="800"
              height="650"
              series={[{ data: barChartData }]}
            />
          </div>
        </div>
        <div className="charts">
          <div className="platform-chart">
            <h2 className="chart-title">Plataformas</h2>
            <Chart
              options={{ ...pieOptions, labels: platformData?.labels }}
              type="donut"
              series={platformData?.series}
              width="100%"
            />
          </div>
          <div className="gender-chart">
            <h2 className="chart-title">Generos</h2>
            <Chart
              options={{ ...pieOptions, labels: genderData?.labels }}
              type="donut"
              series={genderData?.series}
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
