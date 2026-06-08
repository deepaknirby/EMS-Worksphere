export const getMe = (api) => 
    api.get('/employees/me');

export const getAllEmployees = (api,page=0,size=10) =>
    api.get(`/employees?page=${page}&size=${size}`)

export const saveEmployee = (api,employeeData) => 
    api.post('/employees',employeeData)

export const updateEmployee = (api,id,employeeData) => 
    api.patch(`/employees/${id}`,employeeData)

export const deleteEmployee = (api,id) => 
    api.delete(`/employees/${id}`)

export const promoteEmployee = (api,id) => 
    api.patch(`/employees/${id}/promote`)