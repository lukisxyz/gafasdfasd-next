import { mutate } from 'swr'
import axios from '@/libs/axios'
import { z } from 'zod'

export const teacherSchema = z.object({
    email: z.string().min(1, { message: 'Email is required' }).email({
        message: 'Must be a valid email',
    }),
    name: z.string().min(1, { message: 'Name is required' }),
    confirm_password: z.string(),
    current_password: z.string(),
    password: z.string(),
})

export const useTeacher = notif => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const edit = async ({ redirectTo, ...props }) => {
        await csrf()

        var data = new URLSearchParams()
        data.append('name', props.name)

        axios
            .put(`/api/v1/profile`, data)
            .then(() => {
                mutate()
                redirectTo()
            })
            .catch(error => {
                if (error?.response?.data) {
                    notif(error?.response?.data.message)
                }
            })
    }

    const updatePassword = async ({ redirectTo, ...props }) => {
        await csrf()

        var data = new URLSearchParams()
        data.append('current_password', props.current_password)
        data.append('password', props.password)
        data.append('confirm_password', props.confirm_password)

        axios
            .patch(`/api/v1/profile`, data)
            .then(() => {
                mutate()
                redirectTo()
            })
            .catch(error => {
                if (error?.response?.data) {
                    notif(error?.response?.data.message)
                }
            })
    }

    return {
        edit,
        updatePassword,
    }
}
