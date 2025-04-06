import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";
import {Button} from "./Button";
import {Input} from "./Input";
import {Label} from "./Label";
import {photoService} from "../service/PhotoService";
import {toast} from "sonner";

type UploadPhotoFormValues = z.infer<typeof uploadPhotoSchema>;

const uploadPhotoSchema = z.object({
    name: z
        .string()
        .min(1, "Photo name is required")
        .max(40, "Photo name must be at most 40 characters"),
    image: z
        .instanceof(File)
        .refine((file) => file.size > 0, "Image is required"),
});

type UploadFormProps = {
    onSuccess?: () => void;
};

export const UploadForm: React.FC<UploadFormProps> = ({ onSuccess }) => {
    const {
        reset,
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<UploadPhotoFormValues>({
        resolver: zodResolver(uploadPhotoSchema),
    });

    const onSubmit = async (data: UploadPhotoFormValues) => {
        try {
            await photoService.upload({
                name: data.name,
                image: data.image,
            });
            toast.success("Upload successful");
            reset();
            onSuccess?.();
        } catch (error) {
            toast.error( "Upload failed");
        }
    };

    const imageFile = watch("image");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="name">Photo name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
            </div>

            <div>
                <Label htmlFor="image">Select image</Label>
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            setValue("image", e.target.files[0], {
                                shouldValidate: true,
                            });
                        }
                    }}
                />
                {errors.image && (
                    <p className="text-sm text-red-500">{errors.image.message}</p>
                )}
                {imageFile && imageFile.name && (
                    <p className="text-sm text-gray-500">Selected: {imageFile.name}</p>
                )}
            </div>

            <Button type="submit">Upload</Button>
        </form>
    );
};
