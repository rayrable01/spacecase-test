import { FC, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { AddDocumentSchemaType, DocumentSchemaType } from "../../api/dataRequests";
import { useSelector } from "react-redux";

interface AddDocumentModalProps {
    open: boolean;
    onClose: () => void;
    onAdd: (token: string, document: AddDocumentSchemaType)  => void;
}

export const AddModal: FC<AddDocumentModalProps> = ({ open, onClose, onAdd }) => {
    // @ts-expect-error Не типизировал стор, так как он маленький и токен везде типизирован
    const token = useSelector(state => state.token);

    const [newDocument, setNewDocument] = useState<AddDocumentSchemaType>({ 
        companySigDate: "", 
        companySignatureName: "", 
        documentName: "", 
        documentStatus: "", 
        documentType: "", 
        employeeNumber: "", 
        employeeSigDate: "", 
        employeeSignatureName: "" 
    });

    const handleInputChange = (field: keyof DocumentSchemaType, value: string) => {
        setNewDocument((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onAdd(token, newDocument);
        onClose(); 
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
            <Box
                sx={{
                    bgcolor: "white",
                    padding: "20px",
                    outline: "2px solid black",
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    maxWidth: "450px",
                }}
            >
                <Typography color="black" id="modal-modal-title" variant="h6" component="h2" textAlign={"center"}>
                    Добавить новый документ
                </Typography>
                <div style={{ display: "flex", justifyContent: "center", rowGap: "17px", columnGap: "50px", flexWrap: "wrap" }}>
                    <TextField variant="standard" label="Document Name" onChange={(e) => handleInputChange("documentName", e.target.value)} />
                    <TextField variant="standard" label="Document Status" onChange={(e) => handleInputChange("documentStatus", e.target.value)} />
                    <TextField variant="standard" label="Document Type" onChange={(e) => handleInputChange("documentType", e.target.value)} />
                    <TextField variant="standard" label="Employee Number" onChange={(e) => handleInputChange("employeeNumber", e.target.value)} />
                    <TextField variant="standard" label="(Comp) YYYY-MM-DDTHH.MM.SSZ" onChange={(e) => handleInputChange("employeeSigDate", e.target.value)} />
                    <TextField variant="standard" label="(Emp) YYYY-MM-DDTHH.MM.SSZ" onChange={(e) => handleInputChange("companySigDate", e.target.value)} />
                    <TextField variant="standard" label="Company Sign.Name" onChange={(e) => handleInputChange("companySignatureName", e.target.value)} />
                    <TextField variant="standard" label="Employee Sign.Name" onChange={(e) => handleInputChange("employeeSignatureName", e.target.value)} />
                    <Button variant="contained" color="success" onClick={handleSave}>
                        Добавить
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

