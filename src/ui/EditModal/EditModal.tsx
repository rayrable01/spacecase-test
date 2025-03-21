import { FC } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { DocumentSchemaType } from "../../api/dataRequests";

interface EditModalProps {
    open: boolean;
    onClose: () => void;
    document: DocumentSchemaType | null;
    onSave: () => void;
    onChange: (field: keyof DocumentSchemaType, value: string) => void;
}

// const formatISOToReadable = (isoDate: string | null | undefined) => {
//     if (!isoDate) return "";
//     return format(parseISO(isoDate), "dd.MM.yyyy, HH:mm:ss");
// };

export const EditModal: FC<EditModalProps> = ({ open, onClose, document, onSave, onChange }) => {

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
                    <TextField variant="standard" value={document?.documentName || ""} label="Document Name" onChange={(e) => onChange("documentName", e.target.value)} />
                    <TextField variant="standard" value={document?.documentStatus || ""} label="Document Status" onChange={(e) => onChange("documentStatus", e.target.value)} />
                    <TextField variant="standard" value={document?.documentType || ""} label="Document Type" onChange={(e) => onChange("documentType", e.target.value)} />
                    <TextField variant="standard" value={document?.employeeNumber || ""} label="Employee Number" onChange={(e) => onChange("employeeNumber", e.target.value)} />
                    <TextField variant="standard" value={document?.employeeSigDate || ''} label="Employee Sign.Date" onChange={(e) => onChange("employeeSigDate", e.target.value)} />
                    <TextField variant="standard" value={document?.companySigDate || ''} label="Company Sign.Date" onChange={(e) => onChange("companySigDate", e.target.value)} />
                    <TextField variant="standard" value={document?.companySignatureName || ""} label="Company Sign.Name" onChange={(e) => onChange("companySignatureName", e.target.value)} />
                    <TextField variant="standard" value={document?.employeeSignatureName || ""} label="Employee Sign.Name" onChange={(e) => onChange("employeeSignatureName", e.target.value)} />
                    <Button variant="contained" color="success" onClick={onSave}>
                        Сохранить
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};
