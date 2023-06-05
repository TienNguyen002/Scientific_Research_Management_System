import { get_api } from "./Method"

export function getDepartments(){
    return get_api(`https://localhost:7129/api/departments/all`)
}

export function getDepartmentBySlug(slug){
    return get_api(`https://localhost:7129/api/departments/byslug/${slug}`)
}