import * as Collapsible from "@radix-ui/react-collapsible"
import { motion, useCycle } from 'motion/react'
import UploadWidgetDropZone from "./upload-widget-dropzone"
import UploadWidgetHeader from "./upload-widget-header"
import UploadWidgetMinimizedButton from "./upload-widget-minimized-button"
import UploadWidgetUploadList from "./upload-widget-upload-list"

const UploadWidget = () => {
    const [isWidgetOpen, toogleIsWidgetOpen] = useCycle<boolean>(false, true)

    return (
        <Collapsible.Root open={isWidgetOpen} onOpenChange={() => toogleIsWidgetOpen()} >
            <motion.div
                className="bg-zinc-900 overflow-hidden w-[360px]  rounded-3xl shadow-shape"
                animate={isWidgetOpen ? "open" : "closed"}
                variants={{
                    closed: {
                        width: "max-content",
                        height: 44,
                        transition: {
                            type: 'keyframes'
                        }
                    }
                    ,
                    open: {
                        width: 360,
                        height: "auto",
                        transition: {
                            duration: 0.1
                        }
                    }
                }}
            >
                {!isWidgetOpen && <UploadWidgetMinimizedButton />}
                <Collapsible.Content>
                    <UploadWidgetHeader />
                    <div className="flex flex-col gap-4 py-3">
                        <UploadWidgetDropZone />

                        <div className="w-full h-[1px] bg-black/50" />
                        <UploadWidgetUploadList />
                    </div>

                </Collapsible.Content>
            </motion.div>
        </Collapsible.Root>
    )
}

export default UploadWidget