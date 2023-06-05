import { get_api } from "./Method";

export function getStudents(pageSize = 11, pageNumber = 1) {
  return get_api(
    `https://localhost:7129/api/students?PageSize=${pageSize}&PageNumber=${pageNumber}`
  );
}

export function getStudentsFilter(
  keyword = "",
  departmentId = "",
  pageSize = 11,
  pageNumber = 1,
  sortColumn = '',
  sortOrder = ''
) {
    let url = new URL(`https://localhost:7129/api/students`);
    keyword !== '' && url.searchParams.append('Keyword', keyword);
    departmentId !== '' && url.searchParams.append('DepartmentId', departmentId);
    sortColumn !== '' && url.searchParams.append('SortColumn', sortColumn);
    sortOrder !== '' && url.searchParams.append('SortOrder', sortOrder);
    url.searchParams.append('PageSize', pageSize);
    url.searchParams.append('PageNumber', pageNumber);
    return get_api(url.href);
}

export function getStudentBySlug(slug) {
  return get_api(`https://localhost:7129/api/students/byslug/${slug}`);
}

export function getFilter() {
  return get_api(`https://localhost:7129/api/students/get-filter`);
}
