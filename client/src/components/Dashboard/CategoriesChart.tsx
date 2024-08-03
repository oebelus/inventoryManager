import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

interface Product {
  id?: string;
  name: string;
  count: number;
  expiration: string;
  category: string;
}

interface CategoriesChartProps {
  items: Product[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF'],
  labels: [], // Labels will be dynamically set
  legend: {
    show: false,
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const CategoriesChart: React.FC<CategoriesChartProps> = ({ items }) => {
  const [state, setState] = useState<{
    series: number[];
    labels: string[];
  }>({
    series: [],
    labels: [],
  });

  useEffect(() => {
    const categoryCounts: { [key: string]: number } = {};

    items.forEach(item => {
      if (item.category) {
        const category = item.category[0].toUpperCase() + item.category.toLowerCase().slice(1, item.category.length); 
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      }
    });

    const labels = Object.keys(categoryCounts);
    const series = labels.map(label => categoryCounts[label]);

    setState({ series, labels });
  }, [items]);

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Category Distribution
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={{ ...options, labels: state.labels }}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {state.labels.map((label, index) => (
          <div className="sm:w-1/2 w-full px-8" key={label}>
            <div className="flex w-full items-center">
              <span
                className="mr-2 block h-3 w-full max-w-3 rounded-full"
                style={{ backgroundColor: options.colors![index % options.colors!.length] }}
              ></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span>{label}</span>
                <span>{(state.series[index]/items.length * 100).toFixed(2)}%</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesChart;
