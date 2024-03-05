import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getDepartmentsFilter } from "../../Services/DepartmentService";
import { Link } from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style/user.scss";
import Loading from "../../Components/Shared/Loading";
import DepartmentFilter from "../../Components/Shared/Filter/Department/DepartmentFilter";
import { useSelector } from "react-redux";
import Pager from "../../Components/Shared/Pager";

const Department = () => {
  const [departments, setDepartments] = useState([
      {
        items: [],
        metadata: [],
      },
    ]),
    [isVisibleLoading, setIsVisibleLoading] = useState(true),
    [metadata, setMetadata] = useState({}),
    [pageNumber, setPageNumber] = useState(1),
    departmentFilter = useSelector((state) => state.departmentFilter);

  let ps = 6;
  function updatePageNumber(inc) {
    setPageNumber((curentVal) => curentVal + inc);
  }

  useEffect(() => {
    document.title = "Danh sách Khoa";
    getDepartmentsFilter(departmentFilter.keyword, ps, pageNumber).then(
      (data) => {
        if (data) {
          setData(data);
        } else {
          setDepartments([]);
        }
        setIsVisibleLoading(false);
      }
    );

    function setData(props) {
      setDepartments(props.items);
      setMetadata(props.metadata);
    }
  }, [departmentFilter, ps, pageNumber]);

  return (
    <>
      <div>
        <DepartmentFilter />
        {isVisibleLoading ? (
          <Loading />
        ) : (
          <div className="row department-item">
            {departments.length > 0 ? (
              departments.map((item, index) => (
                <div className="col-6" key={index}>
                  <div className="item-card mt-3 text-center">
                    <div className="d-flex card-content">
                      <FontAwesomeIcon
                        icon={faHome}
                        fontSize={50}
                        className="px-3 text-success text-center"
                      />
                      <Link
                        className="text-success text-decoration-none"
                        to={`/khoa/${item.urlSlug}`}
                      >
                        <div className="text-name">{item.name}</div>
                      </Link>
                    </div>
                    <div>
                      <Link to={`/khoa/${item.urlSlug}`}>
                        <Button>Xem chi tiết</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="text-warning text-center py-3">
                Không tìm thấy đơn vị khoa
              </h2>
            )}
          </div>
        )}

        <Pager metadata={metadata} onPageChange={updatePageNumber} />
      </div>
    </>
  );
};

export default Department;
