// frontend/src/utils/apiPaths.js

// This should be the base URL of your running backend
export const BASE_URL = "http://localhost:8000";
export const API_PATHS = {
  // Authentication
  AUTH: {
    LOGIN: `${BASE_URL}/api/v1/auth/login`,
    REGISTER: `${BASE_URL}/api/v1/auth/register`,
    GET_USER_INFO: `${BASE_URL}/api/v1/auth/getUser`,
    UPLOAD_IMAGE: `${BASE_URL}/api/v1/auth/upload-image`,
  },

  // Dashboard
  DASHBOARD: {
    GET_DATA: `${BASE_URL}/api/v1/dashboard`,
    DOWNLOAD: `${BASE_URL}/api/v1/dashboard/download`,
  },

  INCOME: {
    GET_ALL: `${BASE_URL}/api/v1/income/get`,
    ADD: `${BASE_URL}/api/v1/income/add`,
    DELETE: `${BASE_URL}/api/v1/income/:id`, // :id will be replaced
  },

  EXPENSE: {
    GET_ALL: `${BASE_URL}/api/v1/expense/get`,
    ADD: `${BASE_URL}/api/v1/expense/add`,
    DELETE: `${BASE_URL}/api/v1/expense/:id`, // :id will be replaced
  },
};
