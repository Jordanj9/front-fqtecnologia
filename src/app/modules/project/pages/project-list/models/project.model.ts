export interface User {
    id: number;
    name: string;
    email: string;
}
export interface ProjectData{
    id: number;
    name: string;
    description: string;
    type: string;
    value: string;
    user_id: number;
    user: User;
    created_at: Date;
}
export interface Projects {
    status: number;
    message: string;
    data: ProjectData[];
}
