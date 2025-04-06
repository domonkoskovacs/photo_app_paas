import {DialogContent, DialogHeader, DialogTitle} from "./Dialog";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "./Tabs";
import {LoginForm} from "./LoginForm";
import {RegisterForm} from "./RegisterForm";


export const AuthDialog = ({ onSuccess }: { onSuccess: () => void }) => (
    <DialogContent className="max-w-sm">
        <DialogHeader>
            <DialogTitle>Authentication</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="mt-4">
            <TabsList className="grid grid-cols-2 w-full mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
                <LoginForm onSuccess={onSuccess} />
            </TabsContent>
            <TabsContent value="register">
                <RegisterForm onSuccess={onSuccess} />
            </TabsContent>
        </Tabs>
    </DialogContent>
);
