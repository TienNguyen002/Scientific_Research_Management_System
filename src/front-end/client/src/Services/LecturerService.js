import { get_api } from "./Method";

export function getLecturers(pageSize = 10, pageNumber = 1) {
  return get_api(
    `https://localhost:7129/api/lecturers?PageSize=${pageSize}&PageNumber=${[
      pageNumber,
    ]}`
  );
}

export function getLecturersFilter(
  keyword = "",
  departmentId = "",
  pageSize = 11,
  pageNumber = 1,
  sortColumn = "",
  sortOrder = ""
) {
  let url = new URL(`https://localhost:7129/api/lecturers`);
  keyword !== "" && url.searchParams.append("Keyword", keyword);
  departmentId !== "" && url.searchParams.append("DepartmentId", departmentId);
  sortColumn !== "" && url.searchParams.append("SortColumn", sortColumn);
  sortOrder !== "" && url.searchParams.append("SortOrder", sortOrder);
  url.searchParams.append("PageSize", pageSize);
  url.searchParams.append("PageNumber", pageNumber);
  return get_api(url.href);
}

export function getLecturerBySlug(slug) {
  return get_api(`https://localhost:7129/api/lecturers/byslug/${slug}`);
}

export function getFilter() {
  return get_api(`https://localhost:7129/api/lecturers/get-filter`);
}
