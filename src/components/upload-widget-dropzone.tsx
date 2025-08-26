import { useDropzone } from "react-dropzone"

const UploadWidgetDropZone = () => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple: true,
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        onDrop(acceptedFiles, fileRejections, event) {
            console.log(acceptedFiles)
        }
    })

    return (
        <div className='px-3 flex flex-col gap-3'>
            <div
                data-active={isDragActive}
                className="cursor-pointer data-[active=true]:bg-indigo-500/20 data-[active=true]:border-indigo-500  data-[active=true]:text-indigo-400  text-zinc-400 bg-black/20 p-5 rounded-lg border border-zinc-700 border-dashed h-32 flex flex-col items-center justify-center gap-1 hover:border-zinc-400 transition-colors" {...getRootProps()}>
                <input type="file" {...getInputProps()} />
                <span className="text-xs">Drop your files here or</span>
                <span className="text-xs underline">click to open picker</span>
            </div>
            <span className="text-xs text-zinc-400">Only PNG and JPEG files are supported</span>

        </div>
    )
}

export default UploadWidgetDropZone