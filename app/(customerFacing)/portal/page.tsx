import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import { ToDoCard, ToDoCardSkeleton } from "@/components/ToDoCard"
import { Button } from "@/components/ui/button"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { Product, Todo } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

const getToDos = cache(() => {
    return db.todo.findMany({
        orderBy: { score: "desc"},
        take: 4
    })
}, ["/", "getToDos"])   

const getMostPopularProducts = cache(() => {
    return db.product.findMany({
        where: {isAvailableForPurchase: true},
        orderBy: {orders: {_count: "desc"} },
        take: 6
    })
}, ["/", "getMostPopularProducts"],{ revalidate: 60*60*24 })

const getNewestProducts = cache(() => {
    return db.product.findMany({
        where: {isAvailableForPurchase: true},
        orderBy: { createdAt: "desc"},
        take: 6
    })
},["/", "getNewestProducts"])

export default function PortalPage() {
    return (
        <main className="space-y-12">
            <ToDoGridSection title="To-do's" todosFetcher={getToDos}/>            
            <ProductGridSection title="Most Popular" productsFetcher={getMostPopularProducts}/>
            <ProductGridSection title="Newest" productsFetcher={getNewestProducts}/>
        </main>
    );
}

type ProductGridSectionProps = {
    title: string
    productsFetcher: () => Promise<Product[]>
}

type ToDoGridSectionProps = {
    title: string
    todosFetcher: () => Promise<Todo[]>
}

function ToDoGridSection({ todosFetcher, title }: ToDoGridSectionProps) {
    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <h2 className="text-3xl font-bold">{title}</h2>
                <Button variant="outline" asChild>
                    <Link href="/products" className="space-x-2">
                        <span>View All</span>
                        <ArrowRight className="size-4"/>
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense 
                    fallback={
                        <>
                            <ToDoCardSkeleton />
                            <ToDoCardSkeleton />
                            <ToDoCardSkeleton />
                        </>
                    }
                >
                    <ToDoSuspense todosFetcher={todosFetcher} />
                </Suspense>
            </div>
        </div>
    )
}   

function ProductGridSection({ productsFetcher, title }:
ProductGridSectionProps) {
    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <h2 className="text-3xl font-bold">{title}</h2>
                <Button variant="outline" asChild>
                    <Link href="/products" className="space-x-2">
                        <span>View All</span>
                        <ArrowRight className="size-4"/>
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense 
                    fallback={
                        <>
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                        </>
                    }
                >
                    <ProductSuspense productsFetcher={productsFetcher} />
                </Suspense>
            </div>
        </div>
    )
}

async function ToDoSuspense({todosFetcher}:{todosFetcher: () => Promise<Todo[]>}) {
    return (await todosFetcher()).map(todo => (
        <ToDoCard key={todo.id} id={todo.id} score={todo.score || 0} name={todo.name || "me"} title={todo.title} completed={todo.completed} createdAt={todo.createdAt} updatedAt={todo.updatedAt} expiresAt={todo.expiresAt || undefined} />
    ))
}

async function ProductSuspense({productsFetcher}:{productsFetcher: () => Promise<Product[]>}) {
    return (await productsFetcher()).map(product => (
        <ProductCard key={product.id} {...product} />
    ))
}