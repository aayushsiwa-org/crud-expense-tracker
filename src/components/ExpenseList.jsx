import {
    Paper,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    Box,
    Grid,
    Divider,
    IconButton,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import { CATEGORIES, getCategoryObject } from "../constants/categories";

const ExpenseList = ({
    expenses,
    filter,
    setFilter,
    handleEdit,
    handleDeleteConfirm,
    filteredTotal,
    totalAmount,
}) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Paper
            elevation={3}
            sx={{
                borderRadius: 2,
                borderTop: `4px solid ${theme.palette.secondary.main}`,
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: isMediumScreen ? "column" : "row",
                    justifyContent: "space-between",
                    alignItems: isMediumScreen ? "stretch" : "center",
                    gap: 2,
                    backgroundColor: theme.palette.background.default,
                }}
            >
                <Typography variant="h6">
                    Expense List
                    {expenses.length > 0 && (
                        <Typography
                            component="span"
                            variant="body2"
                            sx={{ ml: 1, color: "text.secondary" }}
                        >
                            ({expenses.length} items)
                        </Typography>
                    )}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: isMediumScreen ? "column" : "row",
                        gap: 2,
                        flexGrow: 0,
                        width: isMediumScreen ? "100%" : "auto",
                    }}
                >
                    <FormControl
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: 120 }}
                    >
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={filter.category}
                            onChange={(e) =>
                                setFilter({
                                    ...filter,
                                    category: e.target.value,
                                })
                            }
                            label="Category"
                            startAdornment={
                                <InputAdornment position="start">
                                    <FilterListIcon fontSize="small" />
                                </InputAdornment>
                            }
                        >
                            <MenuItem value="all">All Categories</MenuItem>
                            {CATEGORIES.map((category) => (
                                <MenuItem
                                    key={category.value}
                                    value={category.value}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: "50%",
                                                backgroundColor: category.color,
                                                mr: 1,
                                            }}
                                        />
                                        {category.label}
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: 150 }}
                    >
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={filter.sortBy}
                            onChange={(e) =>
                                setFilter({
                                    ...filter,
                                    sortBy: e.target.value,
                                })
                            }
                            label="Sort By"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SortIcon fontSize="small" />
                                </InputAdornment>
                            }
                        >
                            <MenuItem value="date-desc">Date (Newest)</MenuItem>
                            <MenuItem value="date-asc">Date (Oldest)</MenuItem>
                            <MenuItem value="amount-desc">
                                Amount (High-Low)
                            </MenuItem>
                            <MenuItem value="amount-asc">
                                Amount (Low-High)
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <Divider />

            <ExpenseSummary
                filteredTotal={filteredTotal}
                totalAmount={totalAmount}
            />

            {expenses.length > 0 ? (
                <Box sx={{ overflowX: "auto" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                {!isSmallScreen && (
                                    <TableCell>Category</TableCell>
                                )}
                                <TableCell align="right">Amount</TableCell>
                                {!isSmallScreen && <TableCell>Date</TableCell>}
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {expenses.map((exp) => (
                                <ExpenseRow
                                    key={exp.id}
                                    expense={exp}
                                    isSmallScreen={isSmallScreen}
                                    handleEdit={handleEdit}
                                    handleDeleteConfirm={handleDeleteConfirm}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            ) : (
                <EmptyExpensesList />
            )}
        </Paper>
    );
};
const ExpenseSummary = ({ filteredTotal, totalAmount }) => (
    <Box sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
        <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
                <Typography variant="body2" color="text.secondary">
                    Showing:
                </Typography>
                <Typography variant="h6">${filteredTotal}</Typography>
            </Grid>
            <Grid size={{ xs: 6 }} sx={{ textAlign: "right" }}>
                <Typography variant="body2" color="text.secondary">
                    Total Expenses:
                </Typography>
                <Typography variant="h6">${totalAmount}</Typography>
            </Grid>
        </Grid>
    </Box>
);

const ExpenseRow = ({
    expense,
    isSmallScreen,
    handleEdit,
    handleDeleteConfirm,
}) => {
    const theme = useTheme();
    const category = getCategoryObject(expense.category);

    return (
        <TableRow hover>
            <TableCell>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    {isSmallScreen && (
                        <Box
                            sx={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                backgroundColor: category.color,
                            }}
                        />
                    )}
                    <Box>
                        <Typography variant="body1">{expense.title}</Typography>
                        {isSmallScreen && (
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {new Date(expense.date).toLocaleDateString()}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </TableCell>

            {!isSmallScreen && (
                <TableCell>
                    <Chip
                        label={category.label}
                        size="small"
                        sx={{
                            backgroundColor: `${category.color}20`,
                            borderLeft: `4px solid ${category.color}`,
                            borderRadius: "4px",
                            color: "text.primary",
                        }}
                    />
                </TableCell>
            )}

            <TableCell align="right">
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: "medium",
                        color: theme.palette.primary.main,
                    }}
                >
                    ${expense.amount.toFixed(2)}
                </Typography>
            </TableCell>

            {!isSmallScreen && (
                <TableCell>
                    {new Date(expense.date).toLocaleDateString()}
                </TableCell>
            )}

            <TableCell align="right">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "0.5rem",
                    }}
                >
                    <IconButton
                        size="small"
                        onClick={() => handleEdit(expense)}
                        color="primary"
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                        size="small"
                        onClick={() => handleDeleteConfirm(expense.id)}
                        color="error"
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            </TableCell>
        </TableRow>
    );
};

const EmptyExpensesList = () => (
    <Box
        sx={{
            p: 4,
            textAlign: "center",
            color: "text.secondary",
        }}
    >
        <Typography variant="body1">
            No expenses yet. Add your first expense above!
        </Typography>
    </Box>
);

export default ExpenseList;
