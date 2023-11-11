import Image from 'next/image'
import { Button } from '../base/button'
import { useRouter } from 'next/router'
import Menu from '@/components/layout/menu'
import DropdownMenu from '../base/dropdown-menu'
import Breadcrumb from '../base/breadcrumb'

export default function Layout({ children }) {
    const router = useRouter()
    const asPathWithoutQuery = router.asPath.split('?')[0]
    const asPathNestedRoutes = asPathWithoutQuery
        .split('/')
        .filter(v => v.length > 0)
    return (
        <div className="bg-slate-normal w-screen h-screen flex">
            <div className="bg-white border h-screen border-black rounded-r-3xl p-2 w-[240px] flex-shrink-0">
                <div className="px-6 py-8">
                    <Image
                        alt="logo"
                        height={60}
                        width={238}
                        src="/images/logo-purple.svg"
                    />
                </div>
                <ul>
                    {(Menu || []).map(p => (
                        <li key={p.link} className="mb-4">
                            <MenuItem {...p} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="min-w-0 w-full max-h-screen overflow-y-auto">
                <div className="p-[22px] pr-0">
                    <header className="bg-white flex justify-between pr-11 rounded-l-full w-full py-[10px] px-[21px] items-center">
                        <Breadcrumb data={asPathNestedRoutes} />
                        <div className="flex items-center gap-6">
                            <div className="relative h-8 w-8 flex items-center justify-center">
                                <Image
                                    alt="notification"
                                    height={20}
                                    width={20}
                                    src="/icons/notification.svg"
                                />
                                <Image
                                    className="absolute top-0 right-0"
                                    alt="new notification"
                                    height={8}
                                    width={8}
                                    src="/icons/new-notification.svg"
                                />
                            </div>
                            <div className="rounded-full h-[50px] w-[50px]">
                                <DropdownMenu>
                                    <Image
                                        alt="placeholder"
                                        height={50}
                                        width={50}
                                        src="/images/image-placeholder.png"
                                    />
                                </DropdownMenu>
                            </div>
                        </div>
                    </header>
                </div>
                <div className="p-[22px] w-full mx-auto max-w-screen-2xl">
                    {children}
                </div>
            </div>
        </div>
    )
}

function MenuItem(props) {
    const router = useRouter()
    const { icon, label, link, relatedLink } = props
    const isActive = relatedLink.includes(router.pathname)
    const handleMenuItemClick = () => {
        router.push(link)
    }
    return (
        <Button
            variant={isActive ? 'purple' : 'inactive'}
            onClick={handleMenuItemClick}
            className="w-full justify-start">
            <span className="flex gap-2 px-3">
                <div className="fill-red-900">{icon}</div>
                {label}
            </span>
        </Button>
    )
}
