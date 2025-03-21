import { z } from 'zod'
import {ADD_DATA, DATA_REQUEST, HOST} from './API'
import { validateResponse } from './validateResponse'


export interface useDataResp {
    error_code: number,
    error_message: string,
    data: DocumentSchemaType[],
    profiling: string,
    timings: null | string | undefined
}

export const getDocuments = (token: string): Promise<useDataResp> => {
    return fetch(DATA_REQUEST, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-auth": token
        }
    }).then(validateResponse)
    .then(res => res.json())
}


const dateSchema = z.string().datetime().nullable();
const nullableString = z.string().nullable();

const documentSchema = z.object({
    id: z.string().uuid(),
    companySigDate: dateSchema,
    companySignatureName: nullableString,
    documentName: z.string(),
    documentStatus: z.string(),
    documentType: z.string(),
    employeeNumber: nullableString,
    employeeSigDate: dateSchema,
    employeeSignatureName: nullableString,
});

const addDocumentSchema = z.object({
    companySigDate: dateSchema,
    companySignatureName: nullableString,
    documentName: z.string(),
    documentStatus: z.string(),
    documentType: z.string(),
    employeeNumber: nullableString,
    employeeSigDate: dateSchema,
    employeeSignatureName: nullableString,
});

export type DocumentSchemaType = z.infer<typeof documentSchema>;
export type AddDocumentSchemaType = z.infer<typeof addDocumentSchema>;

export const addDocument = (token: string, data: AddDocumentSchemaType): Promise<void> => {
    return fetch(ADD_DATA, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-auth": token
        },
        body: JSON.stringify(data)
    })
    .then(validateResponse).then(() => undefined)
}

export const deleteDocument = (token: string, id: string): Promise<void> => {
    return fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-auth": token
        },
    })
    .then(validateResponse).then(() => undefined)
}

export const editDocument = (token: string, data: DocumentSchemaType, id: string): Promise<DocumentSchemaType> => {
    return fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-auth": token
        },
        body: JSON.stringify(data)
    })
    .then(validateResponse).then(res => res.json());
}