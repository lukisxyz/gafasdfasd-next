import { usePaginationPages } from '@/hooks/usePagination'
import { memo } from 'react'

function Pagination({ gotoPage, length, pageSize }) {
    const {
        canGo,
        currentPage,
        pages,
        goTo,
        goNext,
        goPrev,
    } = usePaginationPages({
        gotoPage,
        length,
        pageSize,
    })

    return (
        <div className="m-4 flex items-center justify-center">
            <button
                onClick={goPrev}
                disabled={!canGo.previous}
                className="m-1 px-2 py-1 border rounded-md disabled:bg-[#C5C5C5] disabled:cursor-not-allowed">
                Previous
            </button>
            {pages.map((page, i) => (
                <button
                    onClick={() => goTo(page)}
                    key={i}
                    style={{
                        background: currentPage === page ? '#255188' : 'none',
                        color: currentPage === page ? 'white' : 'black',
                    }}
                    className="m-1 px-3 py-1 border rounded-md">
                    {page}
                </button>
            ))}
            <button
                onClick={goNext}
                disabled={!canGo.next}
                className="m-1 px-2 py-1 border rounded-md disabled:bg-[#C5C5C5] disabled:cursor-not-allowed">
                Next
            </button>
        </div>
    )
}

export default memo(Pagination)
