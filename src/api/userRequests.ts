import z from 'zod';
import { validateResponse } from './validateResponse';
import {HOST} from './API'

export const loginSchema = z.object({
    username: z.string().regex(/^user\d+$/, "Логин должен быть в формате user{N}"),
    password: z.string().regex(/^password$/, "Неверный пароль")
});

export type loginSchemaType = z.infer<typeof loginSchema>

interface AuthResponse {
    error_code: number,
    error_text: string,
    data: null | {
        token: string,
    }
    profiling: string,
    timings: null | string
}

// Получаю отсюда token
export const loginUser = ({username, password}: loginSchemaType): Promise<AuthResponse> => {
    return fetch(`${HOST}/ru/data/v3/testmethods/docs/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username,
            password
        })
    })
    .then(validateResponse)
    .then(res => res.json())
    .then((value) => { 
        return value;
    });
}

