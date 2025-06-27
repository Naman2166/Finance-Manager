export const BASE_URL = "http://localhost:8000";

//Auth API Path
export const API_PATH = {
    AUTH: {
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
        GET_USER_INFO: "/api/auth/getUser",
        UPDATE_PROFILE: "/api/auth/update-user",
    },

    //Dashboard API Path
    DASHBOARD: {
        GET_DASHBOARD_DATA: "/api/dashboard",
    },

    //Income API Path
    INCOME: {
        ADD_INCOME: "/api/income/add-income",
        GET_ALL_INCOME: "/api/income/get-all-income",
        DELETE_INCOME: (incomeId) => `/api/income/delete-income/${incomeId}`,
        DOWNLOAD_INCOME: "/api/income/download-income-excel",
    },

    //Expense API Path
    EXPENSE: {
        ADD_EXPENSE: "/api/expense/add-expense",
        GET_ALL_EXPENSE: "/api/expense/get-all-expense",
        DELETE_EXPENSE: (expenseId) => `/api/expense/delete-expense/${expenseId}`,
        DOWNLOAD_EXPENSE: "/api/expense/download-expense-excel",
    },

    //Budget API Path
    BUDGET: {
        GET_ALL_BUDGETS: "/api/budget/get-budgets",
        ADD_BUDGET: "/api/budget/add-budget",
        UPDATE_BUDGET: (category) => `/api/budget/${category}`,
        DELETE_BUDGET: (category) => `/api/budget/${category}`,
    },

    //Image API Path
    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image",         //defined in authRoutes.js
        DELETE_IMAGE: "/api/auth/delete-image",
    },
}
