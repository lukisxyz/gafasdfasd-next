import Image from 'next/image'
import { IconButton } from '../base/button'

export default function ActionTable({ viewAction, editAction, deleteAction }) {
    return (
        <div className="flex gap-3">
            <IconButton
                className="rounded-md"
                size="sm"
                as="button"
                onClick={() => viewAction()}
                type="button"
                variant="blue"
                icon={() => (
                    <Image
                        className="m-2"
                        src="/icons/view.svg"
                        alt="view"
                        height={14}
                        width={14}
                    />
                )}
            />
            <IconButton
                className="rounded-md"
                size="sm"
                as="button"
                onClick={() => editAction()}
                type="button"
                variant="purple"
                icon={() => (
                    <Image
                        className="m-2"
                        src="/icons/edit.svg"
                        alt="edit"
                        height={14}
                        width={14}
                    />
                )}
            />
            <IconButton
                className="rounded-md"
                size="sm"
                as="button"
                onClick={() => deleteAction()}
                type="button"
                variant="red"
                icon={() => (
                    <Image
                        className="m-2"
                        src="/icons/trash.svg"
                        alt="delete"
                        height={14}
                        width={14}
                    />
                )}
            />
        </div>
    )
}
