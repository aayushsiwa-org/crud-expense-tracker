import {
    Container,
    Typography,
    Box,
    Button,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import Notification from "./components/Notification.jsx";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog.jsx";
import { useExpenses } from "./hooks/useExpenses.jsx";

function App() {
    const [showForm, setShowForm] = useState(true);
    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const showNotification = (message, severity = "success") => {
        setNotification({
            open: true,
            message,
            severity,
        });
    };

    const {
        form,
        setForm,
        filteredExpenses,
        filter,
        setFilter,
        totalAmount,
        filteredTotal,
        handleSubmit,
        handleEdit,
        resetForm,
        deleteExpense,
    } = useExpenses(showNotification);

    const handleCloseNotification = () => {
        setNotification({
            ...notification,
            open: false,
        });
    };

    const handleDeleteConfirm = (id) => {
        setDeleteConfirm(id);
    };

    const confirmDelete = () => {
        if (deleteConfirm) {
            deleteExpense(deleteConfirm);
            showNotification("Expense deleted successfully");
            setDeleteConfirm(null);
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <Container maxWidth="lg" sx={{ mb: 8 }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
            >
                Expense Tracker
            </Typography>

            {isSmallScreen && (
                <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        color={showForm ? "secondary" : "primary"}
                        onClick={toggleForm}
                        startIcon={
                            showForm ? <FilterListIcon /> : <AddCircleIcon />
                        }
                        fullWidth
                    >
                        {showForm ? "View Expenses" : "Add Expense"}
                    </Button>
                </Box>
            )}

            {(!isSmallScreen || showForm) && (
                <ExpenseForm
                    form={form}
                    setForm={setForm}
                    handleSubmit={handleSubmit}
                    resetForm={resetForm}
                />
            )}

            <ExpenseList
                expenses={filteredExpenses}
                filter={filter}
                setFilter={setFilter}
                handleEdit={handleEdit}
                handleDeleteConfirm={handleDeleteConfirm}
                filteredTotal={filteredTotal}
                totalAmount={totalAmount}
            />

            <DeleteConfirmDialog
                open={deleteConfirm !== null}
                onClose={() => setDeleteConfirm(null)}
                onConfirm={confirmDelete}
            />

            <Notification
                open={notification.open}
                message={notification.message}
                severity={notification.severity}
                onClose={handleCloseNotification}
            />
        </Container>
    );
}

export default App;
