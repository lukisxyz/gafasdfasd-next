import Layout from '@/components/layout/layout'
import SiswaDetailPage from '@/modules/student-page/detail-student'
import { base64ToJson } from '@/libs/helper'
import { useRouter } from 'next/router'

export default function StudenDetail() {
    const router = useRouter()
    const data = base64ToJson(String(router.query.data))
    return (
        <Layout>
            {data && (
                <SiswaDetailPage
                    data={data}
                    mode="view"
                    siswaName={data.name}
                />
            )}
        </Layout>
    )
}
