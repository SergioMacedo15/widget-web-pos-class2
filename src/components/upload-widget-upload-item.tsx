import { Download, ImageUp, Link2, RefreshCcw, Trash2 } from "lucide-react"
import Button from "./ui/button"
import * as Progress from '@radix-ui/react-progress'
import { useUploads, type Upload } from "../stores/upload-context"
import { formatBytes } from "../utils/bytes-formater"


interface UploadWidgetUploadItemProps {
    upload: Upload
    uploadId: string
}

const UploadWidgetUploadItem = ({ upload, uploadId }: UploadWidgetUploadItemProps) => {
    const progress = Math.min(
        upload.compressedSizeInBytes ?
            upload.uploadSizeInBytes * 100 / upload.compressedSizeInBytes : 0, 100)
    const cancelUpload = useUploads(store => store.cancelUpload)
    const retryUpload = useUploads(store => store.retryUpload)

    console.log(upload)
    return (
        <div className='p-3 rounded-lg flex flex-col gap-3 shadow-shape-content bg-white/2 relative overflow-hidden'>
            <div className="flex flex-col gap-1 w-[60%] truncate">
                <div className="text-xs font-medium  overflow-hidden flex items-center gap-1">
                    <ImageUp className="size-3 text-zinc-300" strokeWidth={1.5} />
                    <span className="truncate flex w-full ">{upload.name}</span>
                </div>
                <div className="text-xxs text-zinc-400 flex gap-1.5 items-center">
                    <span className="line-through">{formatBytes(upload.originalSizeInBytes)}</span>
                    <div className="size-1 rounded-full bg-zinc-700" />
                    <span>
                        {formatBytes(upload?.compressedSizeInBytes || 0)}
                        {upload.compressedSizeInBytes ? "tem" : "não tem"}
                        {upload.compressedSizeInBytes && <span className="text-green-400 ml-1">
                            -{Math.round((upload.originalSizeInBytes - upload.compressedSizeInBytes) * 100 / upload.originalSizeInBytes)}%
                        </span>}
                    </span>
                    <div className="size-1 rounded-full bg-zinc-700" />

                    {upload.status == 'sucess' && <span>100%</span>}
                    {upload.status == 'progress' && <span>{progress}%</span>}
                    {upload.status == 'error' && <span className="text-red-400">Error</span>}
                    {upload.status == 'cancel' && <span className="text-yellow-400">Cancel</span>}
                </div>
            </div>
            <Progress.Root
                data-status={upload.status}
                className="bg-zinc-800 group rounded-full h-1 overflow-hidden">
                <Progress.Indicator
                    className="bg-indigo-500 h-1 
                    group-data-[status=sucess]:bg-green-400
                    group-data-[status=error]:bg-red-400
                    group-data-[status=cancel]:bg-yellow-400
                    transition-all
                    "
                    style={{
                        width: upload.status == 'progress' ? `${progress}%` : "100%"
                    }} />
            </Progress.Root>
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                <Button asChild aria-disabled={upload.status !== 'sucess'} size="icon-sm">
                    <a href={upload.remoteUrl} download>
                        <Download className="size-4" strokeWidth={1.5} />
                        <span className="sr-only"> Download compressed image</span>
                    </a>

                </Button>
                <Button disabled={!['cancel', 'error'].includes(upload.status)}
                    onClick={() => upload.status !== 'sucess' && retryUpload(uploadId)} size="icon-sm">
                    <RefreshCcw className="size-4" strokeWidth={1.5} />
                    <span className="sr-only"> Download compressed image</span>
                </Button>
                <Button
                    disabled={!upload.remoteUrl}
                    onClick={() => upload?.remoteUrl && navigator.clipboard.writeText(upload.remoteUrl)} size="icon-sm" >
                    <Link2 className="size-4" strokeWidth={1.5} />
                    <span className="sr-only"> Download compressed image</span>
                </Button>
                <Button disabled={upload.status !== 'progress'} size="icon-sm">
                    <Trash2 className="size-4" strokeWidth={1.5} onClick={() => cancelUpload(uploadId)} />
                    <span className="sr-only"> Download compressed image</span>
                </Button>
            </div>
        </div>
    )
}
export default UploadWidgetUploadItem