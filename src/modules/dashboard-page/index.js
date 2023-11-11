import { DonutChart } from '@/components/derived/donut-chart'
import { LineChart } from '@/components/derived/line-chart'
import { PieChart } from '@/components/derived/pie-chart'
import SummaryCard from '@/components/derived/summary-card'
import summary from '@/components/derived/summary'

export default function DashboardPage({
    lineChartData,
    pieChartData,
    donutChartData,
}) {
    return (
        <div className="w-full h-full">
            <div className="grid grid-cols-4 w-full gap-6">
                {(summary || []).map(i => (
                    <div key={i.label}>
                        <SummaryCard {...i} />
                    </div>
                ))}
                <div className="min-h-[300px] col-span-2">
                    <LineChart data={lineChartData} title="Jumlah Siswa" />
                </div>
                <div className="min-h-[300px]">
                    <PieChart
                        {...pieChartData}
                        title="Jumlah Siswa Pada Jurusan"
                    />
                </div>
                <div className="min-h-[300px]">
                    <DonutChart
                        {...donutChartData}
                        title="Guru Mata Pelajaran"
                    />
                </div>
            </div>
        </div>
    )
}
