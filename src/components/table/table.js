import React from 'react'

import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table'
import Pagination from '../derived/pagination'

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}) {
    const [value, setValue] = React.useState(initialValue)

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <input
            {...props}
            value={value}
            className="h-7 bg-[#F4F4F4] rounded-md px-3 py-1.5"
            onChange={e => setValue(e.target.value)}
        />
    )
}

export default function Table({ data, columns }) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    })

    return (
        <div className="p-2">
            <div className="flex items-center justify-between mb-6 text-[#5C5050] text-xs">
                <div>
                    Show
                    <select
                        className="p-1 mx-2 rounded-md w-16"
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}>
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                    entries
                </div>
                <div className="flex-shrink-0 flex gap-3 items-center">
                    Search:
                    <DebouncedInput
                        value={table.getState().globalFilter ?? ''}
                        onChange={value => table.setGlobalFilter(String(value))}
                        className="p-2 font-lg shadow border"
                        placeholder="Type here..."
                    />
                </div>
            </div>
            <table className="w-full">
                <thead className="w-full text-left text-[#333333] text-base font-medium border-b">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            <th className="text-left" key="no">
                                No.
                            </th>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}
                                            </div>
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, idx) => {
                        return (
                            <tr key={row.id} className="py-4 border-b">
                                <td key={row.id}>{idx + 1}</td>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="h-2" />
            <div className="flex text-[#5C5050] text-sm items-center justify-between">
                <span className="flex items-center gap-1">
                    <div>{`Showing ${
                        table.getState().pagination.pageIndex + 1
                    } of ${table.getPageCount()} entries`}</div>
                </span>
                <div>
                    <Pagination
                        gotoPage={table.setPageIndex}
                        length={data.length}
                        pageSize={table.getState().pagination.pageSize}
                        setPageSize={table.setPageSize}
                    />
                </div>
            </div>
        </div>
    )
}
