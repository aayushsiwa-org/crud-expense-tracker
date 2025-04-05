import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";

export const useExpenses = (showNotification) => {
    const [expenses, setExpenses] = useState([]);
    const [form, setForm] = useState({
        title: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        category: "other",
        id: null,
    });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [filter, setFilter] = useState({
        category: "all",
        sortBy: "date-desc",
    });

    useEffect(() => {
        const stored = localStorage.getItem("expenses");
        if (stored) {
            try {
                setExpenses(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse expenses:", e);
            }
        }
        setHasLoaded(true);
    }, []);

    useEffect(() => {
        if (hasLoaded) {
            localStorage.setItem("expenses", JSON.stringify(expenses));
        }
    }, [expenses, hasLoaded]);

    const handleSubmit = () => {
        if (!form.title.trim()) {
            showNotification("Please enter a title", "error");
            return;
        }

        if (
            !form.amount ||
            isNaN(parseFloat(form.amount)) ||
            parseFloat(form.amount) <= 0
        ) {
            showNotification("Please enter a valid amount", "error");
            return;
        }

        if (!form.date) {
            showNotification("Please select a date", "error");
            return;
        }

        const parsedAmount = parseFloat(parseFloat(form.amount).toFixed(2));

        if (form.id) {
            setExpenses(
                expenses.map((exp) =>
                    exp.id === form.id ? { ...form, amount: parsedAmount } : exp
                )
            );
            showNotification("Expense updated successfully");
        } else {
            const newExpense = { ...form, id: uuidv4(), amount: parsedAmount };
            setExpenses([...expenses, newExpense]);
            showNotification("Expense added successfully");
        }

        resetForm();
    };

    const resetForm = () => {
        setForm({
            title: "",
            amount: "",
            date: new Date().toISOString().split("T")[0],
            category: "other",
            id: null,
        });
    };

    const handleEdit = (expense) => {
        setForm(expense);
    };

    const deleteExpense = (id) => {
        setExpenses(expenses.filter((exp) => exp.id !== id));
    };

    const filteredExpenses = expenses
        .filter(
            (exp) =>
                filter.category === "all" || exp.category === filter.category
        )
        .sort((a, b) => {
            switch (filter.sortBy) {
                case "amount-asc":
                    return a.amount - b.amount;
                case "amount-desc":
                    return b.amount - a.amount;
                case "date-asc":
                    return new Date(a.date) - new Date(b.date);
                case "date-desc":
                default:
                    return new Date(b.date) - new Date(a.date);
            }
        });

    const totalAmount = expenses
        .reduce((sum, exp) => sum + exp.amount, 0)
        .toFixed(2);
    const filteredTotal = filteredExpenses
        .reduce((sum, exp) => sum + exp.amount, 0)
        .toFixed(2);

    return {
        expenses,
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
        deleteExpense
    };
};