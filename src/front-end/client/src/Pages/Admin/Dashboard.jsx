import React, { useEffect } from "react";
import "./style/admin-page.scss"
import Widget from "./Widget";
import Featured from "../../Components/Admin/Shared/Featured";
import Chart from "../../Components/Admin/Shared/Chart";

const Dashboard = () => {
    useEffect(() => {
        document.title = "Dashboard";
      }, []);

    return(
        <div className="dashboard">
            <div className="dashboard-widget">
                <Widget type="topic"/>
                <Widget type="department"/>
                <Widget type="student"/>
                <Widget type="lecturer"/>
            </div>
            <div className="dashboard-chart">
                <Featured/>
                <Chart/>
            </div>
        </div>
    )
}

export default Dashboard;