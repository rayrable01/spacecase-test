import { FC, useState } from "react";
import { AddDocumentSchemaType, DocumentSchemaType } from "../../api/dataRequests"
import { TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Table, Button, ButtonGroup } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { EditModal } from "../EditModal/EditModal";
import { AddModal } from "../AddModal/AddModal";
import { actions } from "../../store/token/token.slice";

interface TableProps {
    data: DocumentSchemaType[],
    onDelete: (token: string, id: string) => void,
    onEdit: (token: string, object: DocumentSchemaType, id: string) => void,
    onAdd: (token: string, document: AddDocumentSchemaType)  => void;
}

export const DataTable: FC<TableProps> = ({data, onDelete, onEdit, onAdd}) => {
    // @ts-expect-error Не типизировал стор, так как он маленький и токен везде типизирован
    const token = useSelector(state => state.token);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [addDoc, setAddDoc] = useState<boolean>(false);
    const [selectedDocument, setSelectedDocument] = useState<DocumentSchemaType | null>(null);
    const [uniqueId, setUniqueId] = useState<string>();
    const dispatch = useDispatch();

    const logoutClick = () => {
        dispatch(actions.removeToken())
    }

    const handleOpenEditor = (document: DocumentSchemaType, id: string) => {
        setOpenModal(true);
        setSelectedDocument(document);
        setUniqueId(id);
    }

    const handleInputChange = (field: keyof DocumentSchemaType, value: string) => {
        setSelectedDocument((prev) => (prev ? { ...prev, [field]: value } : null));
    };

    const saveChanges = () => {
        setOpenModal(false);
        
        if (selectedDocument && uniqueId) {
            onEdit(token, selectedDocument, uniqueId);
        } else {
            throw new Error('Ошибка в редактировании заметки!')
        }
    }

    return (
        <>
            <TableContainer component={Paper} sx={{marginBottom: 2}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Document Name</TableCell>
                            <TableCell>Document Status</TableCell>
                            <TableCell>Document Type</TableCell>
                            <TableCell>Employee Number</TableCell>
                            <TableCell>Employee Signature Date</TableCell>
                            <TableCell>Company Signature Date</TableCell>
                            <TableCell>Company Signature Name</TableCell>
                            <TableCell>Employee Signature Name</TableCell>
                            <TableCell>Instruments</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.documentName}</TableCell>
                                <TableCell>{row.documentStatus}</TableCell>
                                <TableCell>{row.documentType}</TableCell>
                                <TableCell>{row.employeeNumber}</TableCell>
                                <TableCell>{row.employeeSigDate ? new Date(row.employeeSigDate).toLocaleString() : "N/A"}</TableCell>
                                <TableCell>{row.companySigDate ? new Date(row.companySigDate).toLocaleString() : "N/A"}</TableCell>
                                <TableCell>{row.companySignatureName}</TableCell>
                                <TableCell>{row.employeeSignatureName}</TableCell>
                                <TableCell>
                                    <ButtonGroup variant="contained">
                                        <Button onClick={() => handleOpenEditor(row, row.id)}>Edit</Button>
                                        <Button startIcon={<Delete />} color="error" onClick={() => onDelete(token, row.id)}>Delete</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button sx={{marginRight: 2}} variant="contained" color="success" onClick={() => setAddDoc(true)}>Добавить поле</Button>
            <Button variant="contained" color="secondary" onClick={logoutClick}>Выйти</Button>

            <EditModal open={openModal} onClose={() => setOpenModal(false)} document={selectedDocument} onSave={saveChanges} onChange={handleInputChange} />
            <AddModal open={addDoc} onClose={() => (setAddDoc(false))} onAdd = {onAdd} />
        </>

    );
}