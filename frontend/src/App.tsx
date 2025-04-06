import React, {useEffect, useState} from "react";
import {Button} from "./components/Button";
import {GetAllMetadataSortByEnum, PhotoMetadataResponse} from "./shared/api";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./components/Select";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "./components/Dialog";
import {UploadForm} from "./components/UploadForm";
import {Toaster} from "./components/Toast";
import {photoService} from "./service/PhotoService";
import {Card, CardContent } from "components/Card";
import {toast} from "sonner";

const sortOptions: { label: string; value: GetAllMetadataSortByEnum }[] = [
    {label: "Name (A–Z)", value: GetAllMetadataSortByEnum.NameAsc},
    {label: "Name (Z–A)", value: GetAllMetadataSortByEnum.NameDesc},
    {label: "Date (oldest first)", value: GetAllMetadataSortByEnum.DateAsc},
    {label: "Date (newest first)", value: GetAllMetadataSortByEnum.DateDesc},
];

function App() {
    const [sort, setSort] = React.useState<GetAllMetadataSortByEnum | null>(null);
    const [uploadOpen, setUploadOpen] = React.useState(false);
    const [loginOpen, setLoginOpen] = React.useState(false);
    const [photos, setPhotos] = useState<PhotoMetadataResponse[]>([]);
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";
    const [selectedPhotoId, setSelectedPhotoId] = React.useState<number | null>(null);

    const fetchPhotos = async () => {
        try {
            const data = await photoService.getAllMetadata(sort ?? undefined);
            setPhotos(data);
        } catch (error) {
            console.error("Failed to fetch photos", error);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, [sort]);

    const handleDelete = async (id: number) => {
        try {
            await photoService.deletePhoto(id);
            toast.success("Photo deleted");
            const updated = await photoService.getAllMetadata(sort ?? undefined);
            setPhotos(updated);
        } catch (error) {
            console.error("Delete failed", error);
            toast.error("Failed to delete photo");
        }
    };

    return (
        <div className="h-screen bg-gray-50 text-gray-900">
            <Dialog open={selectedPhotoId !== null} onOpenChange={(open) => !open && setSelectedPhotoId(null)}>
                <DialogContent className="max-w-2xl">
                    {selectedPhotoId !== null && (
                        <div className="flex flex-col gap-4">
                            <img
                                src={`${backendUrl}/api/photo/${selectedPhotoId}`}
                                alt="Full photo"
                                className="max-w-full max-h-[70vh] rounded-md object-contain"
                            />
                            <Button onClick={() => setSelectedPhotoId(null)} variant="outline">
                                Close
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
                <div className="flex items-center gap-3">
                    <img
                        src="/logo.png"
                        alt="SnapVault Logo"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <h1 className="text-xl font-semibold tracking-tight">PhotoVault</h1>
                </div>

                <div className="flex items-center gap-4">
                    <Select
                        onValueChange={(value: GetAllMetadataSortByEnum) => setSort(value)}
                        value={sort ?? undefined}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort"/>
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                        <DialogTrigger>
                            <Button>Login</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Authentication</DialogTitle>
                                <DialogDescription>

                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
                        <DialogTrigger asChild>
                            <Button>Upload</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Upload Photo</DialogTitle>
                                <DialogDescription>
                                    Add a new image to your collection. Name must be max 40 characters.
                                </DialogDescription>
                            </DialogHeader>
                            <UploadForm
                                onSuccess={() => {
                                    setUploadOpen(false);
                                    fetchPhotos();
                                }}
                            />

                        </DialogContent>
                    </Dialog>

                </div>
            </header>

            <main className="p-6 space-y-4">
                {photos.length === 0 ? (
                    <p className="text-gray-500">No photos found.</p>
                ) : (
                    <ul className="space-y-4">
                        {photos.map((photo) => (
                            <Card key={photo.id}>
                                <CardContent className="flex items-center justify-between gap-2 p-2">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={`${backendUrl}/api/photo/${photo.id}`}
                                            alt={photo.name}
                                            className="w-16 h-16 object-cover rounded-md border"
                                        />
                                        <div>
                                            <p className="text-sm font-medium">{photo.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(photo.uploadDate).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button variant="outline" onClick={() => setSelectedPhotoId(photo.id)}>
                                            View
                                        </Button>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="destructive">Delete</Button>
                                            </DialogTrigger>

                                            <DialogContent className="max-w-sm">
                                                <DialogHeader>
                                                    <DialogTitle>Delete Photo</DialogTitle>
                                                    <DialogDescription>
                                                        Are you sure you want to permanently delete <strong>{photo.name}</strong>?
                                                    </DialogDescription>
                                                </DialogHeader>

                                                <div className="flex justify-end gap-2 pt-4">
                                                    <Button variant="outline" onClick={() => document.activeElement?.dispatchEvent(new Event("click"))}>
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() => {
                                                            handleDelete(photo.id);
                                                            document.activeElement?.dispatchEvent(new Event("click"));
                                                        }}
                                                    >
                                                        Confirm
                                                    </Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </ul>
                )}
            </main>


            <Toaster/>

        </div>
    );
}

export default App;
