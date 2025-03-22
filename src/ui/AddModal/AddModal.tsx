import { FC, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { AddDocumentSchemaType, DocumentSchemaType } from "../../api/dataRequests";
import { useSelector } from "react-redux";

interface AddDocumentModalProps {
    open: boolean;
    onClose: () => void;
    onAdd: (token: string, document: AddDocumentSchemaType)  => void;
}

const initialDocumentState: AddDocumentSchemaType = {
    companySigDate: "",
    companySignatureName: "",
    documentName: "",
    documentStatus: "",
    documentType: "",
    employeeNumber: "",
    employeeSigDate: "",
    employeeSignatureName: "",
};

export const AddModal: FC<AddDocumentModalProps> = ({ open, onClose, onAdd }) => {
    // @ts-expect-error Не типизировал стор, так как он маленький и токен везде типизирован
    const token = useSelector(state => state.token);

    const [newDocument, setNewDocument] = useState<AddDocumentSchemaType>(initialDocumentState);
    const [errors, setErrors] = useState<{ [key in keyof AddDocumentSchemaType]?: boolean }>({});

    const handleInputChange = (field: keyof DocumentSchemaType, value: string) => {
        setNewDocument((prev) => ({ ...prev, [field]: value }));

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: false }));
        }
    };

    const handleSave = () => {
        const newErrors: { [key in keyof AddDocumentSchemaType]?: boolean } = {};
        
        if (!newDocument.documentName) newErrors.documentName = true;
        if (!newDocument.documentStatus) newErrors.documentStatus = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Останавливаем сохранение, если есть ошибки
        }

        onAdd(token, newDocument);
        setNewDocument(initialDocumentState);
        setErrors({});
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
                    <TextField
                        required
                        variant="standard"
                        label="Document Name"
                        error={errors.documentName}
                        helperText={errors.documentName ? "Обязательное поле" : ""}
                        onChange={(e) => handleInputChange("documentName", e.target.value)}
                    />
                    <TextField
                        required
                        variant="standard"
                        label="Document Status"
                        error={errors.documentStatus}
                        helperText={errors.documentStatus ? "Обязательное поле" : ""}
                        onChange={(e) => handleInputChange("documentStatus", e.target.value)}
                    />
                    <TextField variant="standard" label="Document Type" onChange={(e) => handleInputChange("documentType", e.target.value)} />
                    <TextField variant="standard" label="Employee Number" onChange={(e) => handleInputChange("employeeNumber", e.target.value)} />
                    <TextField type="datetime-local" variant="standard" onChange={(e) => handleInputChange("employeeSigDate", e.target.value)} />
                    <TextField type="datetime-local" variant="standard" onChange={(e) => handleInputChange("companySigDate", e.target.value)} />
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
