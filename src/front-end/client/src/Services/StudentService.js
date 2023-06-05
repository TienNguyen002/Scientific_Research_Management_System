import { get_api } from "./Method"

export function getStudents(pageSize = 11, pageNumber = 1){
    return get_api(`https://localhost:7129/api/students?PageSize=${pageSize}&PageNumber=${pageNumber}`)
}

export function getStudentBySlug(slug){
    return get_api(`https://localhost:7129/api/students/byslug/${slug}`)
}