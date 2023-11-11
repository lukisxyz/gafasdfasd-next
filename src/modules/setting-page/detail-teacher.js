import { Button } from '@/components/base/button'
import { Input } from '@/components/base/input'
import Paper from '@/components/layout/paper'
import { teacherSchema, useTeacher } from '@/hooks/teacher'
import { jsonToBase64 } from '@/libs/helper'
import { zodResolver } from '@hookform/resolvers/zod'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function SettingPage(props) {
    const notif = msg => {
        toast.error(msg)
    }
    const { email, name, mode } = props
    const router = useRouter()
    const { edit, updatePassword } = useTeacher(notif)

    const redirectTo = () => {
        router.push('/setting')
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email,
            name,
        },
        resolver: zodResolver(teacherSchema),
    })

    const saveAction = data => {
        const {
            email,
            name,
            confirm_password,
            current_password,
            password,
        } = data
        edit({
            email,
            name,
        })

        if (confirm_password == '' || password == '') return redirectTo()

        updatePassword({
            confirm_password,
            current_password,
            redirectTo,
            password,
        })
    }
    const editAction = () => {
        const params = jsonToBase64({
            email,
            name,
        })
        router.push({
            query: { data: params },
            pathname: `/setting/edit`,
        })
    }
    const deleteAction = () => {}
    switch (mode) {
        case 'view':
            return (
                <Paper
                    title="Data Siswa"
                    subtitle={name}
                    additionalheaderContent={ButtonAddition({
                        mode: 'edit',
                        saveAction,
                        editAction,
                        deleteAction,
                    })}>
                    <ShowData email={email} name={name} />
                </Paper>
            )
        case 'edit':
            return (
                <form onSubmit={handleSubmit(saveAction)}>
                    <Paper
                        title="Data Siswa"
                        subtitle={name}
                        additionalheaderContent={ButtonAddition({
                            mode: 'view',
                            saveAction,
                            editAction,
                            deleteAction,
                        })}>
                        <InputData
                            register={register}
                            errors={errors}
                            email={email}
                            name={name}
                            current_password={''}
                            password={''}
                            confirm_password={''}
                        />
                    </Paper>
                </form>
            )

        default:
            return null
    }
}

function InputData(props) {
    const { register, errors } = props
    return (
        <div className="w-full flex gap-8">
            <div>
                <div className="px-5 py-10 pb-5 bg-slate-normal rounded-md w-fit">
                    <svg
                        width="220"
                        height="250"
                        viewBox="0 0 219 250"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M109.375 125C143.896 125 171.875 97.0215 171.875 62.5C171.875 27.9785 143.896 0 109.375 0C74.8535 0 46.875 27.9785 46.875 62.5C46.875 97.0215 74.8535 125 109.375 125ZM153.125 140.625H144.971C134.131 145.605 122.07 148.438 109.375 148.438C96.6797 148.438 84.668 145.605 73.7793 140.625H65.625C29.3945 140.625 0 170.02 0 206.25V226.562C0 239.502 10.498 250 23.4375 250H195.312C208.252 250 218.75 239.502 218.75 226.562V206.25C218.75 170.02 189.355 140.625 153.125 140.625Z"
                            fill="#0CBC8B"
                        />
                    </svg>
                    <div className="flex justify-center mt-6">
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            accept="image/png, image/jpeg"
                            className="hidden"
                        />
                        <Button
                            size="sm"
                            type="button"
                            className="flex items-center">
                            <Image
                                className="mr-2"
                                src="/icons/edit.svg"
                                alt="edit"
                                height={14}
                                width={14}
                            />
                            <span>Ganti Gambar</span>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="w-full max-w-sm">
                    <label
                        htmlFor="name"
                        className="text-sm font-medium mb-2 text-[#555555]">
                        Nama Guru
                    </label>
                    <Input
                        id="name"
                        required
                        name="name"
                        {...register('name')}
                        type="string"
                    />
                    {errors.name && (
                        <p className="text-xs italic text-red-900 mt-2">
                            {errors.name?.message}
                        </p>
                    )}
                    <br />
                    <label
                        htmlFor="email"
                        className="text-sm font-medium mb-2 text-[#555555]">
                        Email
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        {...register('email')}
                        required
                    />
                    {errors.email && (
                        <p className="text-xs italic text-red-900 mt-2">
                            {errors.email?.message}
                        </p>
                    )}
                </div>
                <div className="w-full max-w-sm">
                    <label
                        htmlFor="current_password"
                        className="text-sm font-medium mb-2 text-[#555555]">
                        Password saat ini
                    </label>
                    <Input
                        id="current_password"
                        name="current_password"
                        type="password"
                        {...register('current_password')}
                    />
                    {errors.current_password && (
                        <p className="text-xs italic text-red-900 mt-2">
                            {errors.current_password?.message}
                        </p>
                    )}
                    <br />
                    <label
                        htmlFor="password"
                        className="text-sm font-medium mb-2 text-[#555555]">
                        Password baru
                    </label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        {...register('password')}
                    />
                    {errors.password && (
                        <p className="text-xs italic text-red-900 mt-2">
                            {errors.password?.message}
                        </p>
                    )}
                    <br />
                    <label
                        htmlFor="confirm_password"
                        className="text-sm font-medium mb-2 text-[#555555]">
                        Konfirmasi Password
                    </label>
                    <Input
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        {...register('confirm_password')}
                    />
                    {errors.confirm_password && (
                        <p className="text-xs italic text-red-900 mt-2">
                            {errors.confirm_password?.message}
                        </p>
                    )}
                    <br />
                </div>
            </div>
        </div>
    )
}

function ShowData(props) {
    const { name, email, imgSrc } = props
    return (
        <div className="w-full flex gap-8">
            <div>
                <div className="px-5 py-8 bg-slate-normal rounded-md w-fit">
                    {imgSrc ? (
                        <Image
                            src={imgSrc}
                            alt={name}
                            height={250}
                            width={220}
                        />
                    ) : (
                        <svg
                            width="220"
                            height="250"
                            viewBox="0 0 219 250"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M109.375 125C143.896 125 171.875 97.0215 171.875 62.5C171.875 27.9785 143.896 0 109.375 0C74.8535 0 46.875 27.9785 46.875 62.5C46.875 97.0215 74.8535 125 109.375 125ZM153.125 140.625H144.971C134.131 145.605 122.07 148.438 109.375 148.438C96.6797 148.438 84.668 145.605 73.7793 140.625H65.625C29.3945 140.625 0 170.02 0 206.25V226.562C0 239.502 10.498 250 23.4375 250H195.312C208.252 250 218.75 239.502 218.75 226.562V206.25C218.75 170.02 189.355 140.625 153.125 140.625Z"
                                fill="#0CBC8B"
                            />
                        </svg>
                    )}
                </div>
            </div>
            <div>
                <h4 className="text-sm font-medium mb-2 text-[#555555]">
                    Email
                </h4>
                <p>{email}</p>
            </div>
        </div>
    )
}

function ButtonAddition({ editAction, mode }) {
    switch (mode) {
        case 'edit':
        case 'add':
            return (
                <div className="flex gap-2 items-center">
                    <Button
                        size="sm"
                        onClick={() => editAction()}
                        className="flex items-center">
                        <Image
                            className="mr-2"
                            src="/icons/edit.svg"
                            alt="edit"
                            height={14}
                            width={14}
                        />
                        <span>Ubah Data</span>
                    </Button>
                </div>
            )
        case 'view':
            return (
                <Button size="sm" className="flex items-center" variant="green">
                    <Image
                        className="mr-2"
                        src="/icons/save.svg"
                        alt="edit"
                        height={14}
                        width={14}
                    />
                    <span>Simpan</span>
                </Button>
            )

        default:
            return null
    }
}
