import { get_api, delete_api } from "./Method";

export function getInfoDashboard() {
  return get_api(`https://localhost:7129/api/dashboard`);
}

export function getFeedback(
  keyword = "",
  year = "",
  month = "",
  pageSize = 11,
  pageNumber = 1,
  sortColumn = "",
  sortOrder = ""
) {
    let url = new URL(`https://localhost:7129/api/feedbacks`);
  keyword !== "" && url.searchParams.append("Keyword", keyword);
  month !== "" && url.searchParams.append("CreateMonth", month);
  year !== "" && url.searchParams.append("CreateYear", year);
  sortColumn !== "" && url.searchParams.append("SortColumn", sortColumn);
  sortOrder !== "" && url.searchParams.append("SortOrder", sortOrder);
  url.searchParams.append("PageSize", pageSize);
  url.searchParams.append("PageNumber", pageNumber);
  return get_api(url.href);
}

export function getFeedbackFilter() {
  return get_api(`https://localhost:7129/api/feedbacks/get-filter`);
}

export function deleteFeedback(id) {
  return delete_api(`https://localhost:7129/api/feedbacks/${id}`);
}
