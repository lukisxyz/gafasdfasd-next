import { dropdownMenu } from '@/components/layout/menu'
import { useAuth } from '@/hooks/auth'
import { Popover } from '@headlessui/react'

export default function DropdownMenu({ children }) {
    const { logout } = useAuth({
        middleware: 'guest',
    })
    return (
        <Popover className="relative">
            <Popover.Button>{children}</Popover.Button>
            <Popover.Panel className="absolute z-10 right-0">
                <div className="p-4 w-fi text-[#5C5050] bg-white rounded-lg border">
                    {(dropdownMenu(logout) || []).map(i => (
                        <button key={i.link} onClick={i.action} type="button">
                            {i.label}
                        </button>
                    ))}
                </div>
            </Popover.Panel>
        </Popover>
    )
}
