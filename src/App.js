import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const fetchData = (url) => {
  return axios.get(url).then((res) => {
    return res.data;
  });
};
function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    cardDataFetch();
  }, []);

  const clickHandlerPrev = () => {
    setCurrentPage((c) => c - 1);
    cardDataFetch(currentPage - 1);
  };
  const clickHandlerNext = () => {
    setCurrentPage((c) => c + 1);
    cardDataFetch(currentPage + 1);
  };

  const cardDataFetch = (pageNo = 1) => {
    fetchData(`https://reqres.in/api/users?page=${pageNo}&per_page=3`).then(
      (res) => {
        setData(res.data);
      }
    );
  };
  console.log("Hi", currentPage);
  const cardStyle = {
    width: "18rem",
    marginRight: "3rem",
  };
  const pageStyle = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <>
      <div className="App">
        <br />
        <button
          className="button"
          onClick={clickHandlerPrev}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <button className="button" onClick={clickHandlerNext}>
          Next
        </button>
        <br />
        <h3> Page No: {currentPage}</h3>
        <div style={pageStyle}>
          {data.length === 0 ? <h1>NO Data</h1> : null}
          {data.map((el) => (
            <div className="card" key={el.id} style={cardStyle}>
              <img className="card-img-top" alt="img" src={el.avatar} />
              <div className="card-body">
                <h5 className="card-title">
                  {el.first_name} {el.last_name}{" "}
                </h5>
                <p className="card-text"> {el.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
