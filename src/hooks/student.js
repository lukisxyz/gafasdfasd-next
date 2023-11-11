import useSWR, { mutate } from 'swr'
import axios from '@/libs/axios'
import { z } from 'zod'

export const studentSchema = z.object({
    address: z.string().min(1, { message: 'Address is required' }),
    name: z.string().min(1, { message: 'Name is required' }),
    student_id: z.string().min(1, { message: 'Student ID is required' }),
    gender: z.enum(['male', 'female']),
    entry_year: z
        .number()
        .lte(2100, { message: 'Cannot less than 2100' })
        .gte(1990, { message: 'Cannot less than 1990' }),
})

export const useStudent = notif => {
    const { data: students } = useSWR('/api/v1/student', () =>
        axios
            .get('/api/v1/student')
            .then(res => res.data)
            .catch(error => {
                if (error?.response) {
                    notif('failed to get student data')
                }
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const create = async ({ redirectTo, ...props }) => {
        await csrf()

        var data = new FormData()
        data.append('student_id', props.student_id)
        data.append('name', props.name)
        data.append('gender', props.gender)
        data.append('address', props.address)
        data.append('entry_year', props.entry_year)

        axios
            .post('/api/v1/student', data)
            .then(() => {
                mutate()
                notif('success create data')
                redirectTo()
            })
            .catch(error => {
                if (error?.response) {
                    notif('failed to create a new student')
                }
            })
    }

    const edit = async ({ redirectTo, ...props }) => {
        await csrf()

        var data = new URLSearchParams()
        data.append('name', props.name)
        data.append('gender', props.gender)
        data.append('address', props.address)
        data.append('entry_year', props.entry_year)

        axios
            .put(`/api/v1/student/${props.id}`, data)
            .then(() => {
                mutate()
                notif('success to update student data')
                redirectTo()
            })
            .catch(error => {
                if (error?.response) {
                    notif('failed to udpate student data')
                }
            })
    }

    const remove = async ({ ...props }) => {
        await csrf()
        axios
            .delete(`/api/v1/student/${props.id}`)
            .then(() => {
                mutate()
                notif('success to delete student data')
            })
            .catch(error => {
                if (error?.response) {
                    notif('failed to delete student data')
                }
            })
    }

    return {
        create,
        remove,
        edit,
        students,
    }
}
