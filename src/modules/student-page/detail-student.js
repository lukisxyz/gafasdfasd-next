import { Button } from '@/components/base/button'
import { Input } from '@/components/base/input'
import Paper from '@/components/layout/paper'
import ModalAlertDeletion from '@/components/table/modal-alert-delete'
import { studentSchema, useStudent } from '@/hooks/student'
import { jsonToBase64 } from '@/libs/helper'
import { zodResolver } from '@hookform/resolvers/zod'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function SiswaDetailPage(props) {
    const notif = msg => {
        toast.error(msg)
    }
    const [openModal, setOpenModal] = useState(false)
    const { mode = 'add', siswaName, data: propsData } = props

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            student_id: propsData.student_id,
            name: propsData.name,
            gender: propsData.gender,
            entry_year: propsData.entry_year,
            address: propsData.address,
        },
        resolver: zodResolver(studentSchema),
    })

    const router = useRouter()

    const { create, edit, remove } = useStudent(notif)

    const redirectTo = () => {
        router.push('/student')
    }

    const saveAction = data => {
        const { id } = propsData
        const { student_id, name, gender, entry_year, address } = data
        switch (mode) {
            case 'add':
                return create({
                    student_id,
                    name,
                    gender,
                    entry_year,
                    address,
                    redirectTo,
                })

            case 'edit':
                return edit({
                    id,
                    student_id,
                    name,
                    gender,
                    entry_year,
                    address,
                    redirectTo,
                })

            default:
                break
        }
    }
    const editAction = () => {
        const params = jsonToBase64(propsData)
        router.push({
            query: { data: params },
            pathname: `/student/edit`,
        })
    }
    const deleteAction = () => {
        const { id } = propsData
        setOpenModal(false)
        remove({
            id,
        })
    }

    const alertDeletion = () => {
        setOpenModal(true)
    }

    switch (mode) {
        case 'view':
            return (
                <>
                    <ModalAlertDeletion
                        open={openModal}
                        setOpen={setOpenModal}
                        data={propsData}
                        action={deleteAction}
                    />
                    <Paper
                        title="Data Siswa"
                        subtitle={siswaName}
                        additionalheaderContent={ButtonAddition({
                            mode: 'edit',
                            editAction,
                            deleteAction: alertDeletion,
                        })}>
                        <ShowData {...propsData} />
                    </Paper>
                </>
            )
        case 'edit':
            return (
                <form onSubmit={handleSubmit(saveAction)}>
                    <ModalAlertDeletion
                        open={openModal}
                        setOpen={setOpenModal}
                        data={propsData}
                        action={deleteAction}
                    />
                    <Paper
                        title="Data Siswa"
                        subtitle={siswaName}
                        additionalheaderContent={ButtonAddition({
                            mode: 'view',
                            editAction,
                            deleteAction: alertDeletion,
                        })}>
                        <InputData
                            id={propsData.id}
                            student_id={propsData.student_id}
                            name={propsData.name}
                            gender={propsData.gender}
                            entry_year={propsData.entry_year}
                            address={propsData.address}
                            register={register}
                            errors={errors}
                        />
                    </Paper>
                </form>
            )
        case 'add':
            return (
                <form onSubmit={handleSubmit(saveAction)}>
                    <Paper
                        title="Tambah Data Siswa"
                        additionalheaderContent={ButtonAddition({
                            mode: 'view',
                            editAction,
                            deleteAction: alertDeletion,
                        })}>
                        <InputData
                            student_id=""
                            id=""
                            name=""
                            address=""
                            entry_year=""
                            gender=""
                            register={register}
                            errors={errors}
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
                        <Button
                            disabled
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
            <div className="w-full max-w-sm">
                <label
                    htmlFor="student_id"
                    className="text-sm font-medium mb-2 text-[#555555]">
                    Nomor Induk Siswa
                </label>
                <Input
                    id="student_id"
                    name="student_id"
                    {...register('student_id')}
                    type="string"
                    required
                />
                {errors.student_id && (
                    <p className="text-xs italic text-red-900 mt-2">
                        {errors.student_id?.message}
                    </p>
                )}
                <br />
                <label
                    htmlFor="name"
                    className="text-sm font-medium mb-2 text-[#555555]">
                    Nama Siswa
                </label>
                <Input
                    id="name"
                    required
                    name="name"
                    type="string"
                    {...register('name')}
                />
                {errors.name && (
                    <p className="text-xs italic text-red-900 mt-2">
                        {errors.name?.message}
                    </p>
                )}
                <br />
                <label
                    htmlFor="gender"
                    className="text-sm font-medium mb-2 text-[#555555]">
                    Jenis Kelamin
                </label>
                <div />
                <select
                    defaultValue="male"
                    required
                    id="gender"
                    name="gender"
                    className="px-3 py-2.5 w-full mt-2 rounded-md"
                    {...register('gender')}>
                    {[
                        { value: 'male', label: 'Laki-laki' },
                        { value: 'female', label: 'Perempuan' },
                    ].map(v => (
                        <option key={v.value} value={v.value}>
                            {v.label}
                        </option>
                    ))}
                </select>
                {errors.gender && (
                    <p className="text-xs italic text-red-900 mt-2">
                        {errors.gender?.message}
                    </p>
                )}
                <br />
                <label
                    htmlFor="entry_year"
                    className="text-sm font-medium mb-2 text-[#555555]">
                    Tahun Masuk
                </label>
                <div />
                <Input
                    required
                    id="entry_year"
                    name="entry_year"
                    type="number"
                    step={1}
                    {...register('entry_year', { valueAsNumber: true })}
                />
                {errors.entry_year && (
                    <p className="text-xs italic text-red-900 mt-2">
                        {errors.entry_year?.message}
                    </p>
                )}
                <br />
                <label
                    htmlFor="address"
                    className="text-sm font-medium mb-2 text-[#555555]">
                    Alamat Lengkap
                </label>
                <div className="h-2" />
                <textarea
                    required
                    className="text-sm w-full bg-[#F4F4F4] rounded-md p-3 font-medium mb-2 text-[#555555]"
                    id="address"
                    name="address"
                    {...register('address')}
                />
                {errors.address && (
                    <p className="text-xs italic text-red-900 mt-2">
                        {errors.address?.message}
                    </p>
                )}
            </div>
        </div>
    )
}

function ShowData(props) {
    const { address, entry_year, gender, imgSrc, name, student_id } = props
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
                    Nomor Induk Siswa
                </h4>
                <p>{student_id}</p>
                <h4 className="text-sm font-medium mb-2 mt-5 text-[#555555]">
                    Jenis Kelamin
                </h4>
                <p>{gender === 'male' ? 'Laki-laki' : 'Perempuan'}</p>
                <h4 className="text-sm font-medium mb-2 mt-5 text-[#555555]">
                    Alamat Lengkap
                </h4>
                <p>{address}</p>
                <h4 className="text-sm font-medium mb-2 mt-5 text-[#555555]">
                    Tahun Masuk
                </h4>
                <p>{entry_year}</p>
            </div>
        </div>
    )
}

function ButtonAddition({ editAction, deleteAction, mode }) {
    switch (mode) {
        case 'edit':
        case 'add':
            return (
                <div className="flex gap-2 items-center">
                    <Button
                        size="sm"
                        onClick={editAction}
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
                    <Button
                        size="sm"
                        onClick={deleteAction}
                        className="flex items-center"
                        variant="red">
                        <Image
                            className="mr-2"
                            src="/icons/trash.svg"
                            alt="delete"
                            height={14}
                            width={14}
                        />
                        <span>Hapus</span>
                    </Button>
                </div>
            )
        case 'view':
            return (
                <Button
                    type="submit"
                    size="sm"
                    className="flex items-center"
                    variant="green">
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
