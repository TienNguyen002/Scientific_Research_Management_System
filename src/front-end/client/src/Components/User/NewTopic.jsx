import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style/user.scss";
import { getNewTopic } from "../../Services/TopicService"

const NewTopic = () => {
    const [topic, setTopic] = useState([]);

    useEffect(() => {
        getNewTopic().then((data) => {
            if (data) {
                setTopic(data);
            }
            else setTopic([]);
        })
    }, []);

    return (
        <>
            <div className="card">
                <h5 className="text-success text-center">Các đề tài được nghiệm thu mới nhất</h5>
                <div className="card-body">
                    {topic.map((item, index) => (
                        <div className="card-topic-content mt-1" key={index}>
                            <Link className="text-decoration-none" to={`/de-tai/${item.urlSlug}`}>
                                <h5>{item.title}</h5>
                            </Link>
                            <div className="card-desc">{item.description.substring(0, 50)}...</div>
                            <div className="card-department row">
                                <div className="card-department-name col">
                                    Khoa:
                                    <Link className="text-decoration-none px-2" to={`/khoa/${item.department?.urlSlug}`}>
                                        {item.department?.name}
                                    </Link>
                                </div>
                            </div>
                            <div className="col">
                                Lượt xem: {item.viewCount}
                            </div>
                        </div>
                    )
                    )}
                </div>
            </div>

        </>
    )
}

export default NewTopic;