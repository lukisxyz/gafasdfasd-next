import Layout from '@/components/layout/layout'
import SiswaDetailPage from '@/modules/student-page/detail-student'

export default function StudenDetail() {
    const emptyData = {
        id: '',
        student_id: '',
        name: '',
        gender: '',
        entry_year: '',
        address: '',
    }
    return (
        <Layout>
            <SiswaDetailPage data={emptyData} mode="add" siswaName="" />
        </Layout>
    )
}
