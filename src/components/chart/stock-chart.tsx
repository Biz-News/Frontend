'use client';

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  FinancialDataPoint,
} from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  CandlestickController,
  CandlestickElement
);

interface StockData {
  x: string;
  o: number;
  h: number;
  l: number;
  c: number;
}

interface StockChartProps {
  data: StockData[];
}

export function StockChart({ data }: StockChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS<'candlestick', FinancialDataPoint[]> | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // 이전 차트 인스턴스 제거
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new ChartJS<'candlestick', FinancialDataPoint[]>(ctx, {
          type: 'candlestick',
          data: {
            datasets: [{
              label: '주가',
              data: data.map(item => ({
                x: new Date(item.x).getTime(),
                o: item.o,
                h: item.h,
                l: item.l,
                c: item.c
              }))
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2,
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (context: any) => {
                    const point = context.raw;
                    return [
                      `시가: ${point.o}`,
                      `고가: ${point.h}`,
                      `저가: ${point.l}`,
                      `종가: ${point.c}`
                    ];
                  }
                }
              }
            },
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                  displayFormats: {
                    day: 'MM/dd'
                  }
                },
                title: {
                  display: false
                }
              },
              y: {
                title: {
                  display: false
                },
                ticks: {
                  maxTicksLimit: 8,
                  callback: function(value) {
                    return value.toLocaleString('ko-KR');
                  }
                }
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="w-full h-[300px]">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}