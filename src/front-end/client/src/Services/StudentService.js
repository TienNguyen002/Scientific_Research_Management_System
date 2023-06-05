import { get_api } from "./Method"

export function getStudents(){
    return get_api(`https://localhost:7129/api/students/all`)
}

export function getStudentBySlug(slug){
    return get_api(`https://localhost:7129/api/students/byslug/${slug}`)
}