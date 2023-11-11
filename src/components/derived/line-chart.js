import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import palette from 'google-palette'
import LegendChartItem from '../base/legend-chart-item'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)

export const options = {
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    stacked: false,
    plugins: {
        tooltip: {
            enabled: false,
        },
        title: {
            display: false,
        },
        legend: {
            display: false,
        },
        datalabels: {
            display: false,
        },
    },
    elements: {
        line: {
            tension: 0.35,
        },
    },
}

export function LineChart(props) {
    const { title, data: rawData } = props

    const labels = (rawData || []).map(i => i.title)
    const palettes = palette('tol-rainbow', (rawData || []).length).map(
        (i, idx) => ({
            label: labels[idx],
            color: `#${i}`,
        }),
    )

    const datasets = palette('tol-rainbow', (rawData || []).length).map(
        (i, idx) => ({
            label: (rawData || [])[idx].value.map(v => v.label),
            data: (rawData || [])[idx].value.map(v => v.value),
            borderColor: `#${i}`,
            backgroundColor: `#${i}`,
            yAxisID: 'student-total',
        }),
    )

    const data = {
        labels,
        datasets,
    }

    return (
        <div className="bg-white p-5 rounded-xl">
            <h2 className="text-sm font-medium mb-5">{title}</h2>
            <Line options={options} data={data} />
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
