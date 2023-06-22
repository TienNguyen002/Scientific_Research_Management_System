import { get_api, delete_api, post_api, put_api } from "./Method";

export function getTopics(pageNumber = 1, pageSize = 5) {
  return get_api(
    `https://localhost:7129/api/topics?PageSize=${pageSize}&PageNumber=${pageNumber}&SortOrder=ASC`
  );
}

export function getTopicBySlug(slug) {
  return get_api(`https://localhost:7129/api/topics/byslug/${slug}`);
}

export function getTopicsByStudentSlug(slug, pageNumber, pageSize) {
  return get_api(
    `https://localhost:7129/api/topics?Students=${slug}&PageSize=${pageSize}&PageNumber=${pageNumber}`
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

export function getTopicsFilter(
  keyword = "",
  departmentId = "",
  lecturerId = "",
  statusId = "",
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
  statusId !== "" && url.searchParams.append("StatusId", statusId);
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
  return post_api(`https://localhost:7129/api/topics/view/${slug}`)
}

export function getTopicById(id) {
  return get_api(`https://localhost:7129/api/topics/${id}`);
}

export function addOrUpdateTopic(formData){
  return post_api(`https://localhost:7129/api/topics`, formData)
}

export function assignmentTopic(formData){
  return post_api(`https://localhost:7129/api/topics/assignment`, formData)
}

export function registerTopic(id, slug){
  return post_api(`https://localhost:7129/api/topics/register/${id}?StudentSlug=${slug}`)
}

export function getTopTopic(){
  return get_api(`https://localhost:7129/api/topics/top/3`)
}

export function getNewTopic(){
  return get_api(`https://localhost:7129/api/topics/new/3`)
}

export function uploadOutlineFile(formData){
  return post_api(`https://localhost:7129/api/topics/outlineFile`, formData)
}

export function uploadResultFile(formData){
  return post_api(`https://localhost:7129/api/topics/resultFile`, formData)
}
