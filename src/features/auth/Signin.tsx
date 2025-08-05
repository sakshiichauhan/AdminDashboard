import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"

export default function Signin({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div className={cn("flex flex-col gap-6 justify-center items-center min-h-screen", className)} {...props}>
            <Card className="w-full max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl mb-2">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your Email Address"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline mb-2"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" placeholder="Enter your password" required />
                            </div>
                            <Link to={'/explorers'}>
                                <Button type="submit" className="w-full mt-2">
                                    Login
                                </Button>
                            </Link>

                        </div>
                        {/* <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href="#" className="underline underline-offset-4">
                                Sign up
                            </a>
                        </div> */}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}