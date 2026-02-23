import axios from 'axios'

const EMPLOYEE_S_API_BASE_URL = "http://localhost:9090/employees"

// Create axios instance with interceptor for JWT token
const api = axios.create({
    baseURL: "http://localhost:9090"
});

// Add JWT token to all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

class EmployeeService{
    saveEmployee(employee){
        return api.post('/employees', employee)
    }

    getEmployees(){
        return api.get('/employees')
    }

    getEmployeeById(id){
        return api.get(`/employees/${id}`)
    }
    
    deleteEmployeeById(id){
        return api.delete(`/employees/${id}`)
    }

    updateEmployee(employee, id){
        return api.put(`/employees/${id}`, employee)
    }

    // Search and filter methods
    searchEmployees(keyword) {
        return api.get(`/employees/search?keyword=${keyword}`)
    }

    filterByName(name) {
        return api.get(`/employees/filter/name?name=${name}`)
    }

    filterByEmail(email) {
        return api.get(`/employees/filter/email?email=${email}`)
    }

    filterByPhone(phone) {
        return api.get(`/employees/filter/phone?phone=${phone}`)
    }
}

export default new EmployeeService();