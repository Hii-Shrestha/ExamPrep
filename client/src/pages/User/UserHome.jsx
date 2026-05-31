import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;

const UserHome = () => {
  const examineId = localStorage.getItem('userId');
  const [data, setData] = React.useState(0);   // exams count
  const [reslt, setreslt] = useState(0);       // passed count
  const [examMsg, setExamMsg] = useState("");  // message for exams
  const [resultMsg, setResultMsg] = useState(""); // message for result

  const handlefetch = async () => {
    try {
      const response = await fetch(`${API_URL}/api/dashboard/exams/${examineId}`);
      const result = await response.json();
      console.log("Exams API Response:", result);

      if (typeof result.message === "number") {
        setData(result.message);
      } else {
        setData(0);
        setExamMsg(result.message || "");
      }

      const res = await axios.get(`${API_URL}/api/dashboard/examinee-result/${examineId}`);
      console.log("Result API Response:", res.data);

      if (typeof res.data.message === "number") {
        setreslt(res.data.message);
      } else {
        setreslt(0);
        setResultMsg(res.data.message || "");
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);

  return (
    <div>
      <div className='container-fluid p-0'>
        <div className="row ">
          <div className="col-sm-12 ">
            <div
              className="card p-2"
              style={{
                border: "1px solid #6f42c1",
                minHeight: "170px",
                width: "100%",
              }}
            >
              <div className="row mb-4">
                {/* Total Exams Card */}
                <div className="col-sm-4">
                  <div className=" shadow p-4 bg-light text-center" style={{
                    border: "1px solid #6f42c1",
                  }}>
                    <u style={{ color: "#6f42c1" }}>
                      <h5 className="fw-bold" style={{ height: "48px", color: "#6f42c1" }}>
                        <i className="fa-solid fa-file-lines me-2"></i>Total Exams
                      </h5>
                    </u>
                    <h5>{examMsg ? examMsg : data}</h5>
                  </div>
                </div>

                {/* Result Card: Passed & Failed */}
                <div className="col-sm-4">
                  <div className=" shadow p-4 bg-light text-center" style={{
                    border: "1px solid #6f42c1",
                  }}>
                    <u style={{ color: "#6f42c1" }}>
                      <h6 className="fw-bold" style={{ height: "30px", color: "#6f42c1" }}>
                        <i className="fa-solid fa-chart-line me-2"></i>Result Summary
                      </h6>
                    </u>
                    <h6 className="fw-bold text-success mb-1">
                      <i className="fa-solid fa-circle-check me-2"></i>
                      Passed : {resultMsg ? resultMsg : reslt}
                    </h6>
                    <h6 className="fw-bold text-danger">
                      <i className="fa-solid fa-circle-xmark me-2"></i>
                      Failed: {data - reslt >= 0 ? data - reslt : 0}
                    </h6>
                  </div>
                </div>

                {/* Performance */}
                <div className="col-sm-4">
                  <div className=" shadow  h-100 p-4 bg-light text-center" style={{
                    border: "1px solid #6f42c1",
                  }}>
                    <u style={{ color: "#6f42c1" }}>
                      <h6 className="fw-bold" style={{ height: "30px", color: "#6f42c1" }}>
                        <i className="fa-solid fa-chart-line me-2"></i>Overall Performance
                      </h6>
                    </u>
                    <div className="progress" style={{ height: "20px" }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${(data > 0 ? (reslt / data) * 100 : 0)}%` }}
                        aria-valuenow={data > 0 ? (reslt / data) * 100 : 0}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {(data > 0 ? (reslt / data) * 100 : 0).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Exam Marks Table */}

      </div>
    </div>
  )
}

export default UserHome
