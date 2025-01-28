import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

type ToDoCardProps = {
    id: string,
    score?: number,
    description: string,
    title: string,
    owner: string,
    completed: boolean,
    createdAt: Date,
    updatedAt: Date,
    expiresAt?: Date
}

export function ToDoCard( {id, score, description, owner, title, completed, createdAt, updatedAt, expiresAt}: 
    ToDoCardProps) {
    return <Card className="flex overflow-hidden flex-col">
        <CardHeader>
            <CardTitle>{title}</CardTitle>            
            <CardTitle>{ score != null ? "Score: " + score : ""}</CardTitle>                   
            <CardDescription>{ completed ? "Completed" : "Incomplete"}</CardDescription>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="line-clamp-4">{ owner != "me" ? "Owner: " + owner : ""}</p>
            <hr></hr>
            <p className="line-clamp-2"><small>Updated: {updatedAt.toString()}</small></p>
            <p className="line-clamp-2"><small>Created: {createdAt.toString()}</small></p>
            <p className="line-clamp-2"><small>Expires: {expiresAt?.toString()}</small></p>
        </CardContent>
        <CardFooter>
            <Button size="lg" className="w-full" asChild>
                <Link href={`todos/${id}`}>Details</Link>
            </Button>
        </CardFooter>
    </Card>
}

export function ToDoCardSkeleton() {
    return (
        <Card className="overflow-hidden flex flex-col animate-pulse">
            <div className="w-full aspect-video bg-gray-300"/>
            <CardHeader>
                <CardTitle>
                    <div className="w-3/4 h-6 rounded-full bg-gray-300" />
                </CardTitle>
                <CardDescription>
                    <div className="w-1/2 h-4 rounded-full bg-gray-300" />
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="w-full h-4 rounded-full bg-gray-300" />
                <div className="w-full h-4 rounded-full bg-gray-300" />
                <div className="w-3/4 h-4 rounded-full bg-gray-300" />
            </CardContent>
            <CardFooter>
                <Button className="w-full" disabled size="lg"></Button>
            </CardFooter>
        </Card>
    )
}