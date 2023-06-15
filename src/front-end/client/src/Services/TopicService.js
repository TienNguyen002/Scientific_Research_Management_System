import { get_api, delete_api, post_api, put_api } from "./Method";

export function getTopics(pageNumber = 1, pageSize = 5) {
  return get_api(
    `https://localhost:7129/api/topics?PageSize=${pageSize}&PageNumber=${pageNumber}&SortOrder=ASC`
  );
}

export function getTopicsNotRegis(pageNumber = 1, pageSize = 5) {
  return get_api(
    `https://localhost:7129/api/topics?StatusId=1&PageSize=${pageSize}&PageNumber=${pageNumber}&SortOrder=ASC`
  );
}

export function getTopicBySlug(slug) {
  return get_api(`https://localhost:7129/api/topics/byslug/${slug}`);
}

export function getTopicsByStudentSlug(slug) {
  return get_api(
    `https://localhost:7129/api/topics?Students=${slug}&PageSize=11&PageNumber=1`
  );
}

export function getTopicsByLecturerSlug(slug) {
  return get_api(
    `https://localhost:7129/api/topics?LecturerSlug=${slug}&PageSize=11&PageNumber=1`
  );
}

export function getTopicsByDepartmentSlug(slug) {
  return get_api(
    `https://localhost:7129/api/topics?DepartmentSlug=${slug}&PageSize=11&PageNumber=1`
  );
}

export function getFilter() {
  return get_api(`https://localhost:7129/api/topics/get-filter`);
}

export function getTopicsFilterNotRegis(
  keyword = "",
  departmentId = "",
  lecturerId = "",
  statusId = 1,
  year = "",
  month = "",
  pageSize = 11,
  pageNumber = 1,
  sortColumn = "",
  sortOrder = ""
) {
  let url = new URL(`https://localhost:7129/api/topics`);
  keyword !== "" && url.searchParams.append("Keyword", keyword);
  departmentId !== "" && url.searchParams.append("DepartmentId", departmentId);
  lecturerId !== "" && url.searchParams.append("LecturerId", lecturerId);
  url.searchParams.append("StatusId", statusId);
  month !== "" && url.searchParams.append("RegistrationMonth", month);
  year !== "" && url.searchParams.append("RegistrationYear", year);
  sortColumn !== "" && url.searchParams.append("SortColumn", sortColumn);
  sortOrder !== "" && url.searchParams.append("SortOrder", sortOrder);
  url.searchParams.append("PageSize", pageSize);
  url.searchParams.append("PageNumber", pageNumber);
  return get_api(url.href);
}

export function getDoneTopicsFilter(
  keyword = "",
  departmentId = "",
  pageSize = 11,
  pageNumber = 1,
  sortColumn = "",
  sortOrder = ""
) {
  let url = new URL(`https://localhost:7129/api/topics/done`);
  keyword !== "" && url.searchParams.append("Keyword", keyword);
  departmentId !== "" && url.searchParams.append("DepartmentId", departmentId);
  sortColumn !== "" && url.searchParams.append("SortColumn", sortColumn);
  sortOrder !== "" && url.searchParams.append("SortOrder", sortOrder);
  url.searchParams.append("PageSize", pageSize);
  url.searchParams.append("PageNumber", pageNumber);
  return get_api(url.href);
}

export function getTopicsFilter(
  keyword = "",
  departmentId = "",
  pageSize = 11,
  pageNumber = 1,
  sortColumn = "",
  sortOrder = "ASC"
) {
  let url = new URL(`https://localhost:7129/api/topics`);
  keyword !== "" && url.searchParams.append("Keyword", keyword);
  departmentId !== "" && url.searchParams.append("DepartmentId", departmentId);
  sortColumn !== "" && url.searchParams.append("SortColumn", sortColumn);
  sortOrder !== "" && url.searchParams.append("SortOrder", sortOrder);
  url.searchParams.append("PageSize", pageSize);
  url.searchParams.append("PageNumber", pageNumber);
  return get_api(url.href);
}

export function getAdminTopicsFilter(
  keyword = "",
  departmentId = "",
  lecturerId = "",
  year = "",
  month = "",
  pageSize = 11,
  pageNumber = 1,
  sortColumn = "",
  sortOrder = "ASC"
) {
  let url = new URL(`https://localhost:7129/api/topics`);
  keyword !== "" && url.searchParams.append("Keyword", keyword);
  departmentId !== "" && url.searchParams.append("DepartmentId", departmentId);
  lecturerId !== "" && url.searchParams.append("LecturerId", lecturerId);
  month !== "" && url.searchParams.append("RegistrationMonth", month);
  year !== "" && url.searchParams.append("RegistrationYear", year);
  sortColumn !== "" && url.searchParams.append("SortColumn", sortColumn);
  sortOrder !== "" && url.searchParams.append("SortOrder", sortOrder);
  url.searchParams.append("PageSize", pageSize);
  url.searchParams.append("PageNumber", pageNumber);
  return get_api(url.href);
}

export function deleteTopic(id) {
  return delete_api(`https://localhost:7129/api/topics/${id}`);
}

export function increaseView(slug){
  return put_api(`https://localhost:7129/api/topics/view/${slug}`)
}
