import { FC, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { DocumentSchemaType } from "../../api/dataRequests";

interface EditModalProps {
    open: boolean;
    onClose: () => void;
    document: DocumentSchemaType | null;
    onSave: () => void;
    onChange: (field: keyof DocumentSchemaType, value: string) => void;
}

export const EditModal: FC<EditModalProps> = ({ open, onClose, document, onSave, onChange }) => {
    const [errors, setErrors] = useState<{ [key in keyof DocumentSchemaType]?: boolean }>({});

    const handleSave = () => {
        if (!document) return;

        const newErrors: { [key in keyof DocumentSchemaType]?: boolean } = {};
        if (!document.documentName) newErrors.documentName = true;
        if (!document.documentStatus) newErrors.documentStatus = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onSave();
    };

    const handleInputChange = (field: keyof DocumentSchemaType, value: string) => {
        onChange(field, value);

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: false }));
        }
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
                    Режим редактирования
                </Typography>
                <div style={{ display: "flex", justifyContent: "center", rowGap: "17px", columnGap: "50px", flexWrap: "wrap" }}>
                    <TextField
                        variant="standard"
                        value={document?.documentName || ""}
                        label="Document Name"
                        error={errors.documentName}
                        helperText={errors.documentName ? "Обязательное поле" : ""}
                        onChange={(e) => handleInputChange("documentName", e.target.value)}
                    />
                    <TextField
                        variant="standard"
                        value={document?.documentStatus || ""}
                        label="Document Status"
                        error={errors.documentStatus}
                        helperText={errors.documentStatus ? "Обязательное поле" : ""}
                        onChange={(e) => handleInputChange("documentStatus", e.target.value)}
                    />
                    <TextField
                        variant="standard"
                        value={document?.documentType || ""}
                        label="Document Type"
                        onChange={(e) => handleInputChange("documentType", e.target.value)}
                    />
                    <TextField
                        variant="standard"
                        value={document?.employeeNumber || ""}
                        label="Employee Number"
                        onChange={(e) => handleInputChange("employeeNumber", e.target.value)}
                    />
                    <TextField
                        variant="standard"
                        value={document?.employeeSigDate || ""}
                        label="Employee Sign.Date"
                        onChange={(e) => handleInputChange("employeeSigDate", e.target.value)}
                    />
                    <TextField
                        variant="standard"
                        value={document?.companySigDate || ""}
                        label="Company Sign.Date"
                        onChange={(e) => handleInputChange("companySigDate", e.target.value)}
                    />
                    <TextField
                        variant="standard"
                        value={document?.companySignatureName || ""}
                        label="Company Sign.Name"
                        onChange={(e) => handleInputChange("companySignatureName", e.target.value)}
                    />
                    <TextField
                        variant="standard"
                        value={document?.employeeSignatureName || ""}
                        label="Employee Sign.Name"
                        onChange={(e) => handleInputChange("employeeSignatureName", e.target.value)}
                    />
                    <Button variant="contained" color="success" onClick={handleSave}>
                        Сохранить
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};
