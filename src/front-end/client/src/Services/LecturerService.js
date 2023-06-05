import { get_api } from "./Method"

export function getLecturers(){
    return get_api(`https://localhost:7129/api/lecturers/all`)
}

export function getLecturerBySlug(slug){
    return get_api(`https://localhost:7129/api/lecturers/byslug/${slug}`)
}
