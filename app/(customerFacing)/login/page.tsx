"use client"

//import { signup } from '@/app/actions/auth'
import { usernameLogin } from "@/actions/users";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormState, useFormStatus } from "react-dom";
 
export default function SignupForm() {
  const [ data, action ] = useFormState(usernameLogin, {})
  return (
    <form  action={action} className="max-2-xl mx-auto">

        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your login details to access your lessons and profile.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input type="string" required name="username" id="username"></Input>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" required name="password" id="password"></Input>
                </div>
                {data.error && <div className="text-destructive">{data.error}</div>}
            </CardContent>
            <CardFooter>
                { data.message ? <p>{data.message}</p> : <SubmitButton/> }                    
            </CardFooter>
        </Card>
    </form>
  )
}

function SubmitButton(){
    const { pending } = useFormStatus()

    return <Button className="w-full" size="lg" disabled={pending} type="submit">{ pending ? "Signing In..." : "Sign In"}</Button> 
}