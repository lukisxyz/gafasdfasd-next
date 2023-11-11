import Layout from '@/components/layout/layout'
import { useAuth } from '@/hooks/auth'
import SettingPage from '@/modules/setting-page/detail-teacher'

export default function StudenDetail() {
    const { user } = useAuth()
    return (
        <Layout>
            {user && (
                <SettingPage
                    email={user.data.email}
                    name={user.data.name}
                    mode="view"
                />
            )}
        </Layout>
    )
}
