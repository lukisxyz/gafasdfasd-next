import useSWR from 'swr'
import axios from '@/libs/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().min(1, { message: 'Email is required' }).email({
        message: 'Must be a valid email',
    }),
    password: z
        .string()
        .min(6, { message: 'Password must be atleast 6 characters' }),
})

export const useAuth = ({
    middleware,
    redirectIfAuthenticated,
    notif,
} = {}) => {
    const router = useRouter()

    const { data: user, error, mutate } = useSWR('/api/me', () =>
        axios
            .get('/api/me')
            .then(res => res.data)
            .catch(error => {
                if (error?.response.data) {
                    notif(error?.response.data.message)
                }
                router.push('/')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const login = async ({ ...props }) => {
        await csrf()

        axios
            .post('/api/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error?.response.data) {
                    notif(error?.response.data.message)
                }
            })
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/api/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        login,
        logout,
    }
}
