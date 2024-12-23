import db from "@/db/db";
import { PageHeader } from "../_components/PageHeader";
import { MoreVertical } from "lucide-react";
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from "@/components/ui/table";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeleteDropdownItem } from "../orders/_components/OrderActions";

function getOrders() {
    return db.order.findMany({
        select: {
            id: true,
            pricePaidInPence: true,
            product: { select: {name: true}},
            user: { select: {email: true}}            
        },
        orderBy: {
            createdAt: "desc",
        }
    })
}

export default function OrdersPage() {
    return (
        <>
            <PageHeader>Sales</PageHeader>
            <OrdersTable></OrdersTable>
        </>
    )
}

async function OrdersTable() {
    const orders = await getOrders()

    if(orders.length === 0) return <p>No orders found.</p>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Price Paid</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map(order => (
                    <TableRow key={order.id}>
                        <TableCell>{order.product.name}</TableCell>
                        <TableCell>{order.user.email}</TableCell>
                        <TableCell>
                            {formatCurrency(order.pricePaidInPence / 100 )}
                        </TableCell>
                        <TableCell className="text-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical></MoreVertical>
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DeleteDropdownItem id={order.id}/>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}