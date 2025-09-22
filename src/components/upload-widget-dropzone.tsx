import { useDropzone } from "react-dropzone"
import CircularProgressBar from "./ui/circular-progressbar"
import { usePendingUploads, useUploads } from "../stores/upload-context"

const UploadWidgetDropZone = () => {
    const amountUploads = useUploads(store => store.uploads.size)
    const addUploads = useUploads(store => store.addUploads)
    const { globalPercentage, isThereAnyPendingUploads } = usePendingUploads()


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple: true,
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        onDrop(acceptedFiles) {
            addUploads(acceptedFiles)
            console.log(acceptedFiles)
        }
    })

    // console.log(uploads)

    return (
        <div className='px-3 flex flex-col gap-3'>

            <div
                data-active={isDragActive}
                className="cursor-pointer data-[active=true]:bg-indigo-500/20 data-[active=true]:border-indigo-500  data-[active=true]:text-indigo-400  text-zinc-400 bg-black/20 p-5 rounded-lg border border-zinc-700 border-dashed h-32 flex flex-col items-center justify-center gap-1 hover:border-zinc-400 transition-colors" {...getRootProps()}>
                <input type="file" {...getInputProps()} />
                {
                    isThereAnyPendingUploads ?
                        <div className="flex flex-col gap-2.5 items-center">
                            <CircularProgressBar progress={globalPercentage} size={56} strokeWidth={4} />
                            <span className="text-sm">Uploading {amountUploads} files ...</span>
                        </div>
                        :
                        <>
                            <span className="text-xs underline">click to open picker</span>
                            <span className="text-xs">Drop your files here or</span>
                        </>
                }
            </div>
            <span className="text-xxs text-zinc-400">Only PNG and JPEG files are supported</span>

        </div>
    )
}

export default UploadWidgetDropZone