import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./Input";
import { Button } from "./Button";
import { toast } from "sonner";
import {authService} from "../service/AuthService";

const schema = z
    .object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

type RegisterFormValues = z.infer<typeof schema>;

export const RegisterForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            await authService.register({
                authRequest: {
                    email: data.email,
                    password: data.password,
                },
            });
            toast.success("Registration successful. You can now log in.");
            onSuccess?.();
        } catch (error) {
            toast.error("Registration failed.");
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input {...register("email")} placeholder="Email" />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

            <Input type="password" {...register("password")} placeholder="Password" />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

            <Input type="password" {...register("confirmPassword")} placeholder="Confirm password" />
            {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}

            <Button type="submit">Register</Button>
        </form>
    );
};
