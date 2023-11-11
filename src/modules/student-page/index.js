/* eslint-disable no-unused-vars */
import { Button } from '@/components/base/button'
import Paper from '@/components/layout/paper'
import { useMemo, useState } from 'react'
import { studentColumns } from './table'
import Table from '@/components/table/table'
import { useRouter } from 'next/router'
import ModalAlertDeletion from '@/components/table/modal-alert-delete'
import { jsonToBase64 } from '@/libs/helper'
import { useStudent } from '@/hooks/student'

export default function StudentListPage({ data }) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [currentId, setCurrentId] = useState()
    const { remove } = useStudent()

    const viewAction = arg => {
        const params = jsonToBase64(arg)
        router.push({
            query: { data: params },
            pathname: `/student/view`,
        })
    }

    const redirectTo = () => {
        window.location.reload(false)
    }

    const editAction = arg => {
        const params = jsonToBase64(arg)
        router.push({
            query: { data: params },
            pathname: `/student/edit`,
        })
    }
    const deleteAlert = arg => {
        setOpen(true)
        setCurrentId(arg.id)
    }

    const deleteAction = () => {
        remove({
            id: currentId,
            setErrors,
            setStatus,
            redirectTo,
        })
    }
    const columns = useMemo(
        () => studentColumns(viewAction, editAction, deleteAlert),
        [],
    )
    return (
        <>
            <Paper
                title="Data Siswa"
                additionalheaderContent={
                    <Button
                        variant="green"
                        onClick={() => {
                            router.push('/student/add')
                        }}
                        className="flex items-center">
                        <svg
                            width="15"
                            height="14"
                            viewBox="0 0 14 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.1 3.69999C2.1 2.95739 2.395 2.2452 2.9201 1.72009C3.4452 1.19499 4.15739 0.899994 4.9 0.899994C5.64261 0.899994 6.3548 1.19499 6.8799 1.72009C7.405 2.2452 7.7 2.95739 7.7 3.69999C7.7 4.4426 7.405 5.15479 6.8799 5.67989C6.3548 6.20499 5.64261 6.49999 4.9 6.49999C4.15739 6.49999 3.4452 6.20499 2.9201 5.67989C2.395 5.15479 2.1 4.4426 2.1 3.69999ZM0 11.4503C0 9.29562 1.74563 7.54999 3.90031 7.54999H5.89969C8.05437 7.54999 9.8 9.29562 9.8 11.4503C9.8 11.8091 9.50906 12.1 9.15031 12.1H0.649688C0.290938 12.1 0 11.8091 0 11.4503ZM11.025 7.72499V6.32499H9.625C9.33406 6.32499 9.1 6.09093 9.1 5.79999C9.1 5.50906 9.33406 5.27499 9.625 5.27499H11.025V3.87499C11.025 3.58406 11.2591 3.34999 11.55 3.34999C11.8409 3.34999 12.075 3.58406 12.075 3.87499V5.27499H13.475C13.7659 5.27499 14 5.50906 14 5.79999C14 6.09093 13.7659 6.32499 13.475 6.32499H12.075V7.72499C12.075 8.01593 11.8409 8.24999 11.55 8.24999C11.2591 8.24999 11.025 8.01593 11.025 7.72499Z"
                                fill="currentColor"
                            />
                        </svg>
                        <span className="text-xs ml-2">Tambah Siswa</span>
                    </Button>
                }>
                <Table columns={columns} data={data} />
            </Paper>
            <ModalAlertDeletion
                data={data[0]}
                setOpen={v => setOpen(v)}
                open={open}
                action={deleteAction}
            />
        </>
    )
}
