import { get_api } from "./Method"

export function getLecturers(pageSize = 10, pageNumber = 1){
    return get_api(`https://localhost:7129/api/lecturers?PageSize=${pageSize}&PageNumber=${[pageNumber]}`)
}

export function getLecturerBySlug(slug){
    return get_api(`https://localhost:7129/api/lecturers/byslug/${slug}`)
}
