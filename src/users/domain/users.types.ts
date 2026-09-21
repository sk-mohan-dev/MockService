export interface User {
    readonly id: string
    readonly name: string
    readonly email: string
}

export interface UserRequest {
    readonly name: string
    readonly email: string
}