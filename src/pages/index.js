import Layout from '@/components/layout/layout'
import DashboardPage from '@/modules/dashboard-page'

export default function Home(props) {
    const { donutChartData, lineChartData, pieChartData } = props
    return (
        <Layout>
            <DashboardPage
                donutChartData={donutChartData}
                lineChartData={lineChartData}
                pieChartData={pieChartData}
            />
        </Layout>
    )
}
