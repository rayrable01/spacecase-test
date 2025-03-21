import { useQuery } from "@tanstack/react-query"
import { deleteDocument, DocumentSchemaType, AddDocumentSchemaType, editDocument, getDocuments, useDataResp, addDocument } from "../api/dataRequests"
import { queryClient } from "../api/queryClient"

export interface UseDataQueryResult {
    data: useDataResp | undefined
    isLoading: boolean;
    isError: boolean;
    deleteData: (id: string, token: string) => void;
    editData: (token: string, object: DocumentSchemaType, id: string) => void;
    addData: (token: string, document: AddDocumentSchemaType)  => void;
}


export const useData = (token: string): UseDataQueryResult => {
    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ['data'],
        queryFn: () => getDocuments(token),
        initialData: undefined
    }, queryClient)

    const deleteData = async (id: string, token: string) => {
        await deleteDocument(id, token);
        refetch();
    }

    const editData = async (token: string, object: DocumentSchemaType, id: string) => {
        await editDocument(token, object, id);
        refetch();
    }

    const addData = async (token: string, document: AddDocumentSchemaType) => {
        await addDocument(token, document);
        refetch();
    }

    return {data, isLoading, isError, deleteData, editData, addData}
}