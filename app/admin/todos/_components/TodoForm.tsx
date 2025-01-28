"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { formatCurrency } from "@/lib/formatters"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { addTodo, updateTodo } from "../../_actions/todos"
import { useFormState, useFormStatus } from "react-dom"
import { Todo } from "@prisma/client"
import Image from "next/image"

export function ToDoForm({ product }: {product?: Product | null}) {    
    const [error, action] = useFormState(product == null ? addTodo : updateTodo.bind(null, product.id), {})
    const [priceInPence, setPriceInPence] = useState<number | undefined>(product?.priceInPence)

    return <form action={action} className="space-y-8">
        <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input type="Text" id="name" name="name" required defaultValue={product?.name || ""}></Input>
            {error.name && <div className="text-destructive">{error.name}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="priceInPence">Price in Pence</Label>
            <Input type="number" id="priceInPence" name="priceInPence" required value={priceInPence} onChange={e => setPriceInPence(Number(e.target.value || undefined))}></Input>
            <small className="text-muted-foreground">
                {formatCurrency(priceInPence || 0 / 100)}
            </small>
            {error.priceInPence && <div className="text-destructive">{error.priceInPence}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required defaultValue={product?.description}></Textarea>
            {error.description && <div className="text-destructive">{error.description}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input type="file" id="file" name="file" required={product == null}></Input>
            {product != null && (
                <small className="text-muted-foreground">
                    {product.filePath}
                </small>
            )}
            {error.file && <div className="text-destructive">{error.file}</div>}
            
        </div>
        <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input type="file" id="image" name="image" required={product == null}></Input>
            {product != null && (
                <Image src={product.imagePath} height="200" width="400" alt="Product Image" />
            )}
            {error.image && <div className="text-destructive">{error.image}</div>}
        </div>
        <SubmitButton />
    </form>
}

function SubmitButton() {
    const {pending} = useFormStatus()
    return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}