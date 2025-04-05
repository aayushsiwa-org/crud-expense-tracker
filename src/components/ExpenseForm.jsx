import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useTheme } from "@mui/material";
import { CATEGORIES, getCategoryObject } from "../constants/categories";

const ExpenseForm = ({ form, setForm, handleSubmit, resetForm }) => {
  const theme = useTheme();

  const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({
          ...form,
          [name]: name === "amount" ? value : value,
      });
  };

  return (
      <Paper
          elevation={3}
          sx={{
              p: 3,
              mb: 3,
              borderRadius: 2,
              borderTop: `4px solid ${theme.palette.primary.main}`,
          }}
      >
          <Typography variant="h6" gutterBottom>
              {form.id ? "Edit Expense" : "Add Expense"}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <TextField
              fullWidth
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                          {getCategoryObject(form.category).label.charAt(0)}
                      </InputAdornment>
                  ),
              }}
          />

          <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                          <AttachMoneyIcon fontSize="small" />
                      </InputAdornment>
                  ),
              }}
          />

          <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.date}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                          <CalendarTodayIcon fontSize="small" />
                      </InputAdornment>
                  ),
              }}
          />

          <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  label="Category"
              >
                  {CATEGORIES.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Box
                                  sx={{
                                      width: 16,
                                      height: 16,
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

          <Box
              sx={{
                  mt: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
              }}
          >
              <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  fullWidth
                  size="large"
                  startIcon={<AddCircleIcon />}
              >
                  {form.id ? "Update Expense" : "Add Expense"}
              </Button>

              {form.id && (
                  <Button
                      variant="outlined"
                      color="secondary"
                      onClick={resetForm}
                      fullWidth
                  >
                      Cancel
                  </Button>
              )}
          </Box>
      </Paper>
  );
};

export default ExpenseForm;