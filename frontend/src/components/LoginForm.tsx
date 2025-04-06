import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Input} from "./Input";
import {Button} from "./Button";
import {toast} from "sonner";
import {saveToken} from "../lib/auth";
import {authService} from "../service/AuthService";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

type LoginFormValues = z.infer<typeof schema>;

export const LoginForm: React.FC<{ onSuccess?: () => void }> = ({onSuccess}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormValues>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const token = await authService.login({
                authRequest: {
                    email: data.email,
                    password: data.password,
                },
            });
            if (token) {
                saveToken(token);
                toast.success("Login successful");
                onSuccess?.();
                window.location.reload();
            } else {
                toast.error("Invalid credentials");
            }
        } catch {
            toast.error("Invalid credentials");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input {...register("email")} placeholder="Email"/>
            <Input {...register("password")} type="password" placeholder="Password"/>
            <Button type="submit">Login</Button>
        </form>
    );
};
