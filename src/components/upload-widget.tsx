import * as Collapsible from "@radix-ui/react-collapsible"
import UploadWidgetDropZone from "./upload-widget-dropzone"
import UploadWidgetHeader from "./upload-widget-header"
import UploadWidgetUploadList from "./upload-widget-upload-list"
import { useState } from "react"
import UploadWidgetMinimizedButton from "./upload-widget-minimized-button"

const UploadWidget = () => {
    const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(false)

    return (
        <Collapsible.Root open={isWidgetOpen} onOpenChange={setIsWidgetOpen} >
            <main className="bg-zinc-900 overflow-hidden w-[360px]  rounded-3xl shadow-shape">
                {!isWidgetOpen && <UploadWidgetMinimizedButton />}
                <Collapsible.Content>
                    <UploadWidgetHeader />
                    <div className="flex flex-col gap-4 py-3">
                        <UploadWidgetDropZone />

                        <div className="w-full h-[1px] bg-black/50" />
                        <UploadWidgetUploadList />
                    </div>

                </Collapsible.Content>
            </main>
        </Collapsible.Root>
    )
}

export default UploadWidget