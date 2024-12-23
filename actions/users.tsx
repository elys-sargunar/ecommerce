"use server"

import db from "@/db/db";
import {z} from "zod";
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const usernameSchema = z.string().email()

export async function usernameLogin( prevState: unknown, formData: FormData ) : Promise<{message?: string; error?: string}> {
    const result = usernameSchema.safeParse(formData.get("username"))

    console.log(formData)
    const data = result.data

    if (result.success === false){
        return { error: "Invalid username"}
    }

    const user = await db.user.findUnique({where: {email: result.data }, select: {
        email: true,
        orders: {
            select: {
                pricePaidInPence: true,
                id: true,
                createdAt: true,
                product: {
                    select: {
                        id: true,
                        name: true,
                        imagePath: true,
                        description: true
                    }                    
                }
            }
        }
    }})

    if(user == null) return notFound()
    
    const orders = user.orders.map(async order => {
        return {
            ...order,
            downloadVerificationId: (await db.downloadVerification.create({
                data: {
                    expiresAt: new Date(Date.now() + 24 * 1000 * 60 * 60 ),
                    productId: order.product.id
                }
            })
        ).id
        }
    })

    revalidatePath("/")
    revalidatePath("/products")

    redirect("/portal")
}