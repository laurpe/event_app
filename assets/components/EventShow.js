import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const EventShow = () => {
  const [id, setId] = useState(useParams().id);
  const [event, setEvent] = useState([]);

  useEffect(() => {
    axios
      .get(`http://api.hel.fi/linkedevents/v1/event/${id}`)
      .then(function (response) {
        const data = response.data;
        setEvent(data);
        console.log({ data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="container border mt-5">
      {/* <img
        src={
          data?.images[0]?.url ||
          "https://images.unsplash.com/photo-1472653431158-6364773b2a56?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469"
        }
        alt={data?.images[0]?.alt_text || "image name"}
      /> */}
      {/* <h2>{data.name.fi}</h2> */}
      <img src="" alt="" />
      <p>{data.short_description.fi}</p>
      <p>{data.start_time}</p>
      <p>{data.end_time}</p>
    </div>
  );
};

export default EventShow;
