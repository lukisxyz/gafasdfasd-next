import Layout from '@/components/layout/layout'
import { useStudent } from '@/hooks/student'
import StudentListPage from '@/modules/student-page'

export default function Student() {
    const { students } = useStudent()
    return (
        <Layout>
            <StudentListPage data={students?.data?.students || []} />
        </Layout>
    )
}
