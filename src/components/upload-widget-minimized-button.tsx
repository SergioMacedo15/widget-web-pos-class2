import * as Collapsible from '@radix-ui/react-collapsible'
import { Maximize2 } from 'lucide-react'
import UploadWidgetTitle from './upload-widget-title'

const UploadWidgetMinimizedButton = () => {
    return (
        <Collapsible.Trigger className='group w-full bg-white/2 px-5 py-3 flex items-center justify-between gap-3'>
            <UploadWidgetTitle />
            <Maximize2 strokeWidth={1.5} className='size-4 text-zinc-400 group-hover:text-zinc-100' />
        </Collapsible.Trigger>

    )
}

export default UploadWidgetMinimizedButton