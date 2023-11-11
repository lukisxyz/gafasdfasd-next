import Image from 'next/image'
import { useEffect } from 'react'
import { Button } from '../base/button'

const ModalAlertDeletion = ({ open, data, setOpen, action }) => {
    useEffect(() => {
        setOpen(open)
    }, [open])
    return open ? (
        <div className="absolute bg-black/50 flex items-center justify-center left-0 top-0 w-screen h-screen">
            <div className="w-full max-w-md bg-white rounded-lg flex flex-col items-center px-6 py-8">
                <Image
                    src="/images/alert-exclamation.png"
                    alt="alert"
                    width={110}
                    height={110}
                />
                <h2 className="text-center">
                    <span>Anda akan menghapus</span>
                    <div />
                    <span>{data.name}</span>
                    <div />
                    <span>{`NIS ${data.student_id}`}</span>
                </h2>
                <div className="flex gap-6 items-center mt-6">
                    <Button
                        onClick={() => setOpen(false)}
                        variant="green"
                        size="sm"
                        className="flex items-center">
                        <Image
                            className="mr-2"
                            src="/icons/cancel.svg"
                            alt="edit"
                            height={14}
                            width={14}
                        />
                        <span>Batal</span>
                    </Button>
                    <Button
                        onClick={action}
                        size="sm"
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
            </div>
        </div>
    ) : null
}

export default ModalAlertDeletion
