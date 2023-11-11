import { capitalizeFirstLetter } from '@/libs/helper'
import Link from 'next/link'

export default function Breadcrumb({ data }) {
    return (
        <div className="flex gap-2 font-medium">
            <div key="dashbord" className="flex gap-2">
                <Link
                    href="/"
                    style={{
                        color: data.length === 0 ? '#0085FF' : '#858585',
                        pointerEvents: data.length > 0 ? 'all' : 'none',
                    }}>
                    Dashboard
                </Link>
                {data.length > 0 && <div className="text-base">/</div>}
            </div>
            {(data || []).map((i, idx) => (
                <div key={i} className="flex gap-2">
                    <Link
                        href={`/${data.slice(0, idx + 1).join('/')}`}
                        style={{
                            color:
                                data.length - 1 === idx ? '#0085FF' : '#858585',
                            pointerEvents:
                                data.length - 1 !== idx ? 'all' : 'none',
                        }}>
                        {capitalizeFirstLetter(i)}
                    </Link>
                    {data.length - 1 !== idx && (
                        <div className="text-base">/</div>
                    )}
                </div>
            ))}
        </div>
    )
}
