import UploadWidgetUploadItem from './upload-widget-upload-item'

const UploadWidgetUploadList = () => {
    const isUploadEmpty = false

    return (
        <div className='px-3 flex flex-col gap-3'>
            <span className='text-xs font-medium'>
                Upload Files {" "}
                <span className='text-zinc-400'>(2)</span>
            </span>
            {
                isUploadEmpty ?
                    <span className='text-sm text-zinc-400'> No Uploads added</span>
                    :
                    <div className='space-y-2'>
                        <UploadWidgetUploadItem />
                        <UploadWidgetUploadItem />

                    </div>
            }
        </div>
    )
}

export default UploadWidgetUploadList