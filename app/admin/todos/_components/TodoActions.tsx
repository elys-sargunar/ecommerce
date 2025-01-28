"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { deleteTodo, toggleTodoStatus } from "../../_actions/todos"
import { useRouter } from "next/navigation"

export function ActiveToggleDropdownItem({
    id,
    completed,
} : {
    id: string,
    completed: boolean
}) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter() 
    return (
        <DropdownMenuItem
            disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    await toggleTodoStatus(id, !completed)
                    router.refresh()
                })
            }}
        >
            {completed ? "Set to complete" : "Set to Incomplete"}
        </DropdownMenuItem>
    )
}

export function DeleteDropdownItem({
    id,
    disabled,
} : {
    id: string,
    disabled: boolean
}){
    const [isPending, startTransition] = useTransition()
    const router = useRouter() 
    return (
        <DropdownMenuItem
            variant="destructive"
            disabled={disabled || isPending}
            onClick={() => {
                startTransition(async () => {
                    await deleteTodo(id)
                    router.refresh()
                })
            }}
        >
            Delete
        </DropdownMenuItem>
    )
} 