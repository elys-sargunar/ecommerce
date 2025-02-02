import db from "@/db/db";
import { PageHeader } from "../_components/PageHeader";
import { MoreVertical } from "lucide-react";
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from "@/components/ui/table";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeleteDropdownItem } from "../users/_components/UserActions";

function getUsers() {
    return db.user.findMany({
        select: {
            id: true,
            email: true,
            orders: {
                select: {
                    pricePaidInPence: true,
                }
            }
        },
        orderBy: {
            createdAt: "desc",
        }
    })
}

export default function UsersPage() {
    return (
        <>
            <PageHeader>Customers</PageHeader>
            <UsersTable></UsersTable>
        </>
    )
}

async function UsersTable() {
    const users = await getUsers()

    if(users.length === 0) return <p>No customers found.</p>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map(user => (
                    <TableRow key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{formatNumber(user.orders.length)}</TableCell>
                        <TableCell>
                            {formatCurrency(
                                user.orders.reduce((sum, o) => o.pricePaidInPence + sum, 0) / 100
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical></MoreVertical>
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DeleteDropdownItem id={user.id}/>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}