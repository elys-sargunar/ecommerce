"use server"

import { z } from "zod"
import db from "@/db/db"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const addSchema = z.object({    
    title : z.string().min(1),
    description: z.string().min(1),
})

export async function deleteTodo(id: string) {
    const todo = await db.todo.delete({
        where: {id}
    })

    if(todo == null) return notFound()

    revalidatePath("/")
    revalidatePath("/portal")

    redirect("/admin/todos")

    return todo
}

export async function toggleTodoStatus(
    id: string,
    completed: boolean
) {
    await db.todo.update({where: {id}, data: { completed}})

    revalidatePath("/")
    revalidatePath("/portal")
}

export async function addTodo(prevState: unknown, formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    console.log(formData)
    if(result.success === false){        
        return result.error.formErrors.fieldErrors
    }
    
    const data = result.data

    await db.todo.create({ data: {
        title: data.title,
        description: data.description,

    }})

    revalidatePath("/")
    revalidatePath("/portal")

    redirect("/admin/todos")
}


export async function updateTodo(id: string, prevState: unknown, formData: FormData) {
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
    console.log(formData)
    if(result.success === false){        
        return result.error.formErrors.fieldErrors
    }
    
    const data = result.data
    const product = await db.todo.findUnique({where: {id}})

    if(product == null) return notFound()

    await db.todo.update({ 
        where: {id},
        data: {
        title: data.title,
        description: data.description,
    }})

    revalidatePath("/")
    revalidatePath("/portal")

    redirect("/admin/todos")
}