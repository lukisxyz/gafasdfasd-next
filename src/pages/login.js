import { Button } from '@/components/base/button'
import { Input } from '@/components/base/input'
import { Label } from '@/components/base/label'
import { loginSchema, useAuth } from '@/hooks/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'react-hot-toast'

export default function LoginPage() {
    const notif = msg => {
        toast.error(msg)
    }
    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
        notif,
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    })

    const submitForm = data => {
        const { email, password } = data
        login({
            email,
            password,
        })
    }

    return (
        <main>
            <div className="absolute left-0 top-0 w-screen h-screen">
                <Image
                    alt="background"
                    fill={true}
                    src="/images/pexels-pixabay-159711 1.jpg"
                    className="-z-10"
                />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 w-screen">
                <div className="max-w-[416px] w-full mx-auto py-16 px-14 backdrop-blur-sm bg-white/50 my-auto rounded-2xl">
                    <div className="w-full flex justify-center mb-10">
                        <Image
                            alt="logo"
                            height={60}
                            width={238}
                            src="/images/logo.svg"
                        />
                    </div>
                    <h1 className="text-center font-semibold text-black text-2xl">
                        LOGIN
                    </h1>
                    <br />
                    <form onSubmit={handleSubmit(submitForm)}>
                        <Label
                            className="text-black font-semibold text-base"
                            htmlFor="email">
                            Email
                        </Label>
                        <Input
                            autoFocus
                            {...register('email')}
                            required
                            type="email"
                            name="email"
                        />
                        {errors.email && (
                            <p className="text-xs italic text-red-900 mt-2">
                                {errors.email?.message}
                            </p>
                        )}
                        <br />
                        <Label
                            className="text-black font-semibold text-base"
                            htmlFor="password">
                            Password
                        </Label>
                        <Input
                            autoFocus
                            {...register('password')}
                            required
                            type="password"
                            name="password"
                        />
                        {errors.password && (
                            <p className="text-xs italic text-red-900 mt-2">
                                {errors.password?.message}
                            </p>
                        )}
                        <br />
                        <Button
                            className="rounded-md text-center w-full"
                            type="submit">
                            <div className="flex gap-2 mx-auto">
                                Login
                                <Image
                                    src="/icons/arrow-right.svg"
                                    alt="arrow right"
                                    width={18}
                                    height={18}
                                />
                            </div>
                        </Button>
                        <br />
                        <br />
                        <p className="text-center text-base w-full text-slate-700">
                            No have account?{'  '}
                            <Link
                                className="text-white font-bold"
                                href="signup">
                                sign up here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    )
}
