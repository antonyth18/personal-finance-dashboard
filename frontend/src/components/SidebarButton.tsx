import type React from "react"
import { useNavigate } from "react-router-dom"

type SidebarButtonProps = {
    content: string
    icon: React.ComponentType
    page: string
  }

export default function SidebarButton({ content, icon: Icon, page }: SidebarButtonProps) {
    const navigate = useNavigate();
    return <div className="pt-3">
        <button onClick={() => {
            navigate("/" + page)
        }} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700 transition">
            <Icon />
            <span className="text-base font-medium">{ content }</span>
        </button>
    </div>
}
