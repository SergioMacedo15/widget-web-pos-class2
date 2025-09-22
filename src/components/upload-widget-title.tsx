import { UploadCloud } from 'lucide-react'
import { usePendingUploads } from '../stores/upload-context'

const UploadWidgetTitle = () => {
    const { globalPercentage, isThereAnyPendingUploads } = usePendingUploads()

    return (
        <div className='flex items-center gap-1.5 text-sm font-medium'>
            <UploadCloud className='size-4 text-zinc-400' strokeWidth={4} />
            {
                isThereAnyPendingUploads ?
                    <span className='flex items-baseline gap-1'>
                        Uploading
                        <span className='text-sm text-zinc-400 tabular-nums'> {globalPercentage}%</span>

                    </span>
                    :

                    <span>Upload Files</span>
            }
        </div>
    )
}

export default UploadWidgetTitle