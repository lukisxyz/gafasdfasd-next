import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import palette from 'google-palette'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import LegendChartItem from '../base/legend-chart-item'
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

export const options = total => ({
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
            color: '#FFFFFF',
            formatter: value => {
                const data = Math.floor((value / total) * 100)
                return data + '%'
            },
            font: {
                weight: 700,
                size: 18,
            },
        },
        ChartDataLabels,
    },
})

export function PieChart(props) {
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
    const total = (value || []).reduce(
        (partialSum, a) => partialSum + a.value,
        0,
    )
    const data = { labels, datasets }
    return (
        <div className="bg-white p-5 rounded-xl">
            <h2 className="text-center w-full text-sm font-medium mb-5">
                {title}
            </h2>
            <Pie data={data} options={options(total)} />
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
