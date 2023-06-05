import { get_api } from "./Method"

export function getTopics(pageNumber = 1, pageSize = 5){
    return get_api(`https://localhost:7129/api/topics?PageSize=${pageSize}&PageNumber=${pageNumber}&SortOrder=ASC`)
}

export function getTopicsNotRegis(pageNumber = 1, pageSize = 5){
    return get_api(`https://localhost:7129/api/topics?StatusId=1&PageSize=${pageSize}&PageNumber=${pageNumber}&SortOrder=ASC`)
}

export function getTopicBySlug(slug){
    return get_api(`https://localhost:7129/api/topics/byslug/${slug}`)
}

export function getTopicsByStudentSlug(slug){
    return get_api(`https://localhost:7129/api/topics?Students=${slug}&PageSize=11&PageNumber=1`)
}

export function getTopicsByLecturerSlug(slug){
    return get_api(`https://localhost:7129/api/topics?LecturerSlug=${slug}&PageSize=11&PageNumber=1`)
}

export function getTopicsByDepartmentSlug(slug){
    return get_api(`https://localhost:7129/api/topics?DepartmentSlug=${slug}&PageSize=11&PageNumber=1`)
}