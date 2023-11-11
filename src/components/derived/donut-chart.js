import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import palette from 'google-palette'
import LegendChartItem from '../base/legend-chart-item'
ChartJS.register(ArcElement, Tooltip, Legend)

export const options = () => ({
    responsive: true,
    plugins: {
        title: {
            display: false,
        },
        legend: {
            display: false,
        },
        tooltips: {
            enabled: false,
        },
        labels: {
            render: 'percentage',
            fontColor: ['white'],
            precision: 2,
        },
        datalabels: {
            display: false,
        },
    },
})

export function DonutChart(props) {
    const { title, value } = props
    const colorScheme = palette('tol-rainbow', (value || []).length).map(
        i => `#${i}`,
    )
    const labels = (value || []).map(i => i.label)
    const palettes = palette('tol-rainbow', (value || []).length).map(
        (i, idx) => ({
            label: labels[idx],
            color: `#${i}`,
        }),
    )
    const datasets = [
        {
            label: '#%',
            data: (value || []).map(i => i.value),
            backgroundColor: colorScheme,
            borderColor: colorScheme,
            borderWidth: 1,
        },
    ]
    const data = { labels, datasets }
    const total = (value || []).reduce(
        (partialSum, a) => partialSum + a.value,
        0,
    )
    return (
        <div className="bg-white p-5 rounded-xl">
            <h2 className="text-sm text-center w-full font-medium mb-5">
                {title}
            </h2>
            <div className="relative">
                <Doughnut data={data} options={options(total)} />
                <div className="absolute top-1/2 flex flex-col justify-center items-center text-[#5C5050] left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <p className="text-sm font-medium">Total</p>
                    <br />
                    <p className="font-bold text-center text-lg">{total}</p>
                </div>
            </div>
            <div className="mt-7 flex gap-4 flex-wrap">
                {(palettes || []).map(v => (
                    <div key={v.label}>
                        <LegendChartItem {...v} />
                    </div>
                ))}
            </div>
        </div>
    )
}
