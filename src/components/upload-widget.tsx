import * as Collapsible from "@radix-ui/react-collapsible"
import UploadWidgetDropZone from "./upload-widget-dropzone"
import UploadWidgetHeader from "./upload-widget-header"
import UploadWidgetUploadList from "./upload-widget-upload-list"

const UploadWidget = () => {
    return (
        <Collapsible.Root>
            <main className="bg-zinc-900 overflow-hidden max-w-[360px] w-full rounded-3xl shadow-shape">
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