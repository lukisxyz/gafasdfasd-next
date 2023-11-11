import Image from 'next/image'

const summary = [
    {
        color: '#068B92',
        icon: (
            <Image alt="siswa" height={30} width={23} src="/icons/siswa.svg" />
        ),
        label: 'Siswa',
        value: 0,
    },
    {
        color: '#D95F18',
        icon: (
            <Image
                alt="siswa"
                height={30}
                width={33}
                src="/icons/jurusan.svg"
            />
        ),
        label: 'Jurusan',
        value: 0,
    },
    {
        color: '#AD2D1E',
        icon: (
            <Image alt="siswa" height={30} width={33} src="/icons/book.svg" />
        ),
        label: 'Mata Pelajaran',
        value: 0,
    },
    {
        color: '#344ED1',
        icon: (
            <Image
                alt="siswa"
                height={30}
                width={33}
                src="/icons/teacher.svg"
            />
        ),
        label: 'Guru Pengajar',
        value: 0,
    },
]

export default summary
