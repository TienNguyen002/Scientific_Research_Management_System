import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faEnvelope,
  faGlobeOceania,
  faInfoCircle,
  faMapLocation,
  faPhone,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { sendFeedback, getFeedbackById } from "../../Services/FeedbackService";
import { useSnackbar } from "notistack";

const Contact = () => {
  const initialState = {
    id: 0,
    username: "",
    content: ""
  },
  [feedback, setFeedback] = useState(initialState),
  { enqueueSnackbar } = useSnackbar();

  let {id} = useParams();
  id = id ?? 0;

  useEffect(() => {
    document.title = "Liên hệ";
    GetFeedback();
    async function GetFeedback(){
      const data = await getFeedbackById(id);
      console.log(data);
      if(data){
        setFeedback(data);
      } else setFeedback([]);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    data.forEach((x) => console.log(x))
    sendFeedback(data).then((data) => {
      if (data) {
        console.log(data);
        enqueueSnackbar("Đã gửi thành công", {
          variant: "success",
          autoHideDuration: 2000,
        });
        setFeedback(initialState);
      } else {
        enqueueSnackbar("Đã xảy ra lỗi khi gửi", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    });
  };

  return (
    <>
      <div className="container pt-5">
        <div className="row card mt-3">
          <div className="row">
            <div className="col-6">
              <div className="card-header">
                <FontAwesomeIcon icon={faQuestionCircle} />
                <span className="text-success">Gửi ý kiến của bạn tại đây</span>
              </div>

              <div className="card-body">
                <Form
                  method="post"
                  encType="multipart/form-data"
                  onSubmit={handleSubmit}
                >
                  <Form.Control type="hidden" name="id" value={feedback.id} />
                  <div className="row mb-3">
                    <Form.Label className="col-sm-2 col-form-label">
                      Tên người dùng
                    </Form.Label>
                    <div className="col-sm-10">
                      <Form.Control
                        type="text"
                        name="username"
                        title="Username"
                        value={feedback.username || ""}
                        required
                        onChange={(e) => setFeedback({...feedback, username: e.target.value})}
                      />
                      <Form.Control.Feedback type="invalid">
                      Tên người dùng không được bỏ trống
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <Form.Label className="col-sm-2 col-form-label">
                      Nội dung
                    </Form.Label>
                    <div className="col-sm-10">
                      <Form.Control
                        as="textarea"
                        rows={7}
                        type="text"
                        name="content"
                        title="Content"
                        required
                        value={feedback.content || ""}
                        onChange={(e) => setFeedback({...feedback, content: e.target.value})}
                      />
                      <Form.Control.Feedback type="invalid">
                        Nội dung không được bỏ trống
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="text-center">
                    <Button variant="success" type="submit">
                      Gửi phản hồi
                    </Button>
                  </div>
                </Form>
              </div>
            </div>

            <div class="col-6">
              <div class="card-header">
                <FontAwesomeIcon icon={faMapLocation} />
                <span class="text-success">Bản đồ</span>
              </div>
              <div class="card-body">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.2877902405253!2d108.44201621412589!3d11.95456563961217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317112d959f88991%3A0x9c66baf1767356fa!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyDEkMOgIEzhuqF0!5e0!3m2!1svi!2s!4v1633261535076!5m2!1svi!2s"
                  width="100%"
                  height="360px"
                  frameborder="0"
                  style={{ border: 0 }}
                  allowfullscreen=""
                  aria-hidden="false"
                  tabindex="0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="row card">
          <div className="card-header">
            <FontAwesomeIcon icon={faInfoCircle} className="text-primary" />
            <span className="text-primary">
              Thông tin liên hệ, hãy liên hệ với chúng tôi
            </span>
          </div>
          <div className="card-body">
            <div className="col">
              <div className="card_item pt-3">
                <FontAwesomeIcon icon={faAddressCard} />
                Địa chỉ:
                <Link
                  to={"https://www.google.com/maps"}
                  target="_blank"
                  className="text-decoration-none"
                >
                  1 Đường Phù Đổng Thiên Vương, Phường 8, Thành phố Đà Lạt, Lâm
                  Đồng
                </Link>
              </div>

              <div className="card_item pt-3">
                <FontAwesomeIcon icon={faEnvelope} />
                Email:
                <Link
                  to={"mailto:info@dlu.edu.vn"}
                  className="text-decoration-none"
                >
                  info@dlu.edu.vn
                </Link>
              </div>

              <div className="card_item pt-3">
                <FontAwesomeIcon icon={faPhone} />
                Phone:
                <Link to={"tel:0263 3822 246"} className="text-decoration-none">
                  0263 3822 246
                </Link>
              </div>

              <div className="card_item pt-3">
                <FontAwesomeIcon icon={faGlobeOceania} />
                Facebook:
                <Link
                  to={"https://www.facebook.com/DalatUni/"}
                  target="_blank"
                  className="text-decoration-none"
                >
                  Trường Đại học Đà Lạt
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
