import React from "react";
import TopView from "./TopView";
import NewTopic from "./NewTopic";

const Item = () => {
    return(
        <div className="container">
            <div className="title">
                <h2 className="text-danger text-center mt-5 mb-3">Danh sách đề tài</h2>
            </div>
            <div className="top-topic row">
                <div className="col-6">
                    <TopView/>
                </div>
                <div className="col-6">
                    <NewTopic/>
                </div>
            </div>
        </div>
    )
}

export default Item;