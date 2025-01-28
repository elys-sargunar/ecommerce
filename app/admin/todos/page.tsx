import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./_components/TodoActions";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

export default function AdminTodosPage() {
    return <>
        <div className="flex justify-between items-center gap-4">
            <PageHeader>To-do's</PageHeader>
            <Button asChild>
                <Link href="/admin/todos/new">Add To-do</Link>
            </Button>
        </div>
        <TodosTable></TodosTable>  
    </>
}

async function TodosTable() {
    const todos = await db.todo.findMany({ select: {
        id: true,
        title: true,
        owner: true,
        description: true,
        completed: true,
        createdAt: true,
        updatedAt: true,
        expiresAt: true,
        score: true,
        // _count: { select: { todo: length}}
    },
    orderBy: {score : "asc" }
    })

    if(todos.length === 0 ) return <p>No to-do's found</p>
    
    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="w-0">
                    <span className="sr-only">Completed</span>
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="w-0">
                    <span className="sr-only">Actions</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {todos.map(todo => (
                <TableRow key={todo.id}>
                    <TableCell>
                        {todo.title}
                    </TableCell>
                    <TableCell>
                        {todo.completed ? ( 
                            <>                                
                                <span className="sr-only">Completed</span>
                                <CheckCircle2></CheckCircle2>
                            </>
                        ) : (
                            <>                                
                                <span className="sr-only">Incomplete</span>
                                <XCircle className="stroke-destructive"></XCircle>
                            </>
                        )}
                    </TableCell>
                    <TableCell>
                        {todo.description}
                    </TableCell>
                    <TableCell>
                        {todo.score}
                    </TableCell>
                    <TableCell>
                        {todo.owner}
                    </TableCell>
                    <TableCell>
                        {todo.expiresAt ? todo.expiresAt.toLocaleDateString() : "No deadline"}
                    </TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <MoreVertical/>
                                <span className="sr-only">Actions</span>                                
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild>
                                    <a href={`/admin/todos/${todo.id}`}>Details</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={`/admin/todos/${todo.id}/edit`}>Edit</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <ActiveToggleDropdownItem
                                    id={todo.id}
                                    completed={todo.completed}
                                />                                
                                <DeleteDropdownItem 
                                    id={todo.id}
                                    disabled={false}
                                />
                            </DropdownMenuContent>
                        </DropdownMenu>                        
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
}