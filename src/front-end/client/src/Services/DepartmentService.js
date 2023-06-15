import { get_api, delete_api, post_api, put_api } from "./Method"

export function getDepartments(){
    return get_api(`https://localhost:7129/api/departments/all`)
}

export function getDepartmentById(id = 0){
  if(id > 0)
    return get_api(`https://localhost:7129/api/departments/${id}`)
  return null;
}

export function getDepartmentBySlug(slug){
    return get_api(`https://localhost:7129/api/departments/byslug/${slug}`)
}

export function getDepartmentsFilter(
    keyword = "",
    pageSize = 11,
    pageNumber = 1,
    sortColumn = "",
    sortOrder = ""
  ) {
    let url = new URL(`https://localhost:7129/api/departments`);
    keyword !== "" && url.searchParams.append("Keyword", keyword);
    sortColumn !== "" && url.searchParams.append("SortColumn", sortColumn);
    sortOrder !== "" && url.searchParams.append("SortOrder", sortOrder);
    url.searchParams.append("PageSize", pageSize);
    url.searchParams.append("PageNumber", pageNumber);
    return get_api(url.href);
  }

export function addDepartment(formData){
  return post_api(`https://localhost:7129/api/departments`, formData)
}

export function updateDepartment(id, formData){
  return put_api(`https://localhost:7129/api/departments/${id}`, formData)
}

export function deleteDepartment(id){
  return delete_api(`https://localhost:7129/api/departments/${id}`)
}