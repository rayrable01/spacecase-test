import { useSelector } from "react-redux"
import { useData } from "../../hooks/useData"
import { Alert, CircularProgress } from "@mui/material";
import { DataTable } from "../../ui/Table/DataTable";

export const MainPage = () => {
    // @ts-expect-error Не типизировал стор, так как он маленький и токен везде типизирован
    const token = useSelector(state => state.token);

    const {data, isLoading, isError, deleteData, editData, addData} = useData(token);

    if (isLoading || !data) {
        console.log('isLoading')
        return <CircularProgress />
    }

    if (isError) {
        console.log('Error', isError)
        return <Alert severity="error" variant="filled">Ошибка загрузки данных таблицы!</Alert>
    }


    return (

        <DataTable data = {data.data} onDelete = {deleteData} onEdit = {editData} onAdd = {addData} />
    )
}