import ActionTable from '@/components/table/action'

export const studentColumns = (viewAction, editAction, deleteAction) => {
    return [
        {
            accessorKey: 'student_id',
            header: () => <span>Nomor Induk Siswa</span>,
            Cell: props => props.column.student_id,
        },
        {
            accessorKey: 'name',
            header: () => <span>Nama Siswa</span>,
            Cell: props => props.column.name,
        },
        {
            accessorKey: 'gender',
            header: () => <span>Jenis Kelamin</span>,
            cell: props =>
                props.column.gender === 'male' ? 'Laki-laki' : 'Perempuan',
        },
        {
            accessorKey: 'entry_year',
            header: () => <span>Tahun Masuk</span>,
            Cell: props => props.column.entry_year,
        },
        {
            accessorKey: 'address',
            header: () => <span className="w-full max-w-xs">Alamat</span>,
            Cell: props => props.column.address,
        },
        {
            accessorKey: '_',
            header: () => <span>Action</span>,
            cell: props => (
                <ActionTable
                    key={props.column.id}
                    viewAction={() => viewAction(props.row.original)}
                    editAction={() => editAction(props.row.original)}
                    deleteAction={() => deleteAction(props.row.original)}
                />
            ),
        },
    ]
}
