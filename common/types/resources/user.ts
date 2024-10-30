import type {DateString} from "compatx";

export type User = {
    id: number
    name: string
    email: string
    email_verified_at?: DateString
    created_at: DateString
    updated_at: DateString
}