import * as ToastPrimitive from "@radix-ui/react-toast"
import {
  useState,
  useEffect,
} from "react"
import {
  AnimatePresence,
  motion,
} from "framer-motion"
import { AiFillCheckCircle } from "react-icons/ai"
import { BiLoaderAlt } from "react-icons/bi"
import { MdCancel } from "react-icons/md"
import { Notification } from "@/store/type"

type Props = {
  item: Notification
}

const Toast = ({ item }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (item.type !== "loading") {
      timeout = setTimeout(() => {
        setIsOpen(false)
      }, 3000)
    }
    return () => clearTimeout(timeout)
  }, [item.type])

  return (
    <>
      <ToastPrimitive.Provider duration={5000}>
        <AnimatePresence exitBeforeEnter>
          <ToastPrimitive.Root
            open={isOpen}
            onOpenChange={setIsOpen}
            className="p-3 bg-white border rounded-xl border-primary"
            asChild
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
              exit={{ y: 100, opacity: 0 }}
            >
              <ToastPrimitive.Title>
                <span className="text-xl font-bold">Notification</span>
              </ToastPrimitive.Title>
              <ToastPrimitive.Description className="flex flex-row items-center space-x-3">
                <div>
                  {item.type === "success" && (
                    <AiFillCheckCircle className="text-green-light" />
                  )}
                  {item.type === "error" && (
                    <MdCancel className="text-red-700" />
                  )}
                  {item.type === "loading" && (
                    <BiLoaderAlt className="animate-spin text-purple-light" />
                  )}
                </div>
                <div>
                  <span>{item.message ?? "Message"}</span>
                </div>
              </ToastPrimitive.Description>
            </motion.div>
          </ToastPrimitive.Root>
        </AnimatePresence>
        <ToastPrimitive.Viewport className="fixed z-[200] right-10 top-20 w-96" />
      </ToastPrimitive.Provider>
    </>
  )
}

export default Toast