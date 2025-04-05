import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@mui/material";

const DeleteConfirmDialog = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this expense? This action
                    cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="error" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmDialog;