import { User } from "./User";

export interface Bot {
    id: string;
    description: string;
    user: User;
}