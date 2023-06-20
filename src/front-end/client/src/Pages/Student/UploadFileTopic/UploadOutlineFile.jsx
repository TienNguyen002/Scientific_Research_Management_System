import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getTopicBySlug,
  uploadOutlineFile,
} from "../../../Services/TopicService";
import { isEmptyOrSpaces, isInteger } from "../../../Utils/Utils";
import { Button, Form } from "react-bootstrap";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileWord } from "@fortawesome/free-regular-svg-icons";

const UploadOutlineFile = () => {
  const [topic, setTopic] = useState([]),
    navigate = useNavigate(),
    { enqueueSnackbar } = useSnackbar(),
    [validated, setValidated] = useState(false);

  let { slug, slug2 } = useParams();
  slug = slug ?? 0;
  slug2 = slug2 ?? 0;

  useEffect(() => {
    document.title = "Phân công đề tài";
    GetTopic();
    async function GetTopic() {
      const data = await getTopicBySlug(slug2);
      if (data) {
        setTopic(data);
      } else setTopic([]);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      let data = new FormData(e.target);
      uploadOutlineFile(data).then((data) => {
        if (data) {
          enqueueSnackbar("Đăng file thuyết minh thành công", {
            variant: "success",
            autoHideDuration: 2000,
          });
          navigate(`/sinh-vien/${slug}/quan-ly-de-tai`);
        } else {
          enqueueSnackbar("Đã xảy ra lỗi khi đăng file", {
            variant: "error",
            autoHideDuration: 2000,
          });
        }
      });
    }
  };

  return (
    <>
      <div className="col-10">
        <div className="department-wrapper">
          <h3 className="text-success py-3">Đăng file thuyết minh</h3>
          <Form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            noValidate
            validated={validated}
          >
            <Form.Control type="hidden" name="urlSlug" value={topic.urlSlug} />
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Tên đề tài
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="title"
                  title="Title"
                  disabled
                  value={topic.title}
                />
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Ngày nghiệm thu
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="endDate"
                  title="End Date"
                  disabled
                  value={topic.endDate}
                />
              </div>
            </div>

            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">Khoa</Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  name="departmentId"
                  title="department Id"
                  disabled
                  value={topic.department?.name}
                ></Form.Control>
              </div>
            </div>
            {!isEmptyOrSpaces(topic.outlineUrl) && (
              <div className="row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                  File thuyết minh hiện tại
                </Form.Label>
                <div className="col-sm-10">
                  {topic.outlineUrl === null ? (
                    <div>Chưa có file thuyết minh</div>
                  ) : (
                    <Link
                      to={`https://localhost:7129/${topic.outlineUrl}`}
                      className="text-decoration-none text-danger"
                    >
                      <FontAwesomeIcon
                        icon={faFileWord}
                        fontSize={50}
                        className="text-danger px-2"
                      />
                      Tải File
                    </Link>
                  )}
                </div>
              </div>
            )}
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                Chọn File
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="file"
                  name="outlineFile"
                  accept="docx/*"
                  title="Outline File"
                  onChange={(e) =>
                    setTopic({
                      ...topic,
                      outlineFile: e.target.files[0],
                    })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  File không được bỏ trống.
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="text-center">
              <Button variant="success" type="submit">
                Đăng file
              </Button>
              <Link
                to={`/sinh-vien/${slug}/quan-ly-de-tai`}
                className="btn btn-danger ms-2"
              >
                Hủy và quay lại
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default UploadOutlineFile;
