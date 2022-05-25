import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const EventShow = () => {
  const [id, setId] = useState(useParams().id);
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://api.hel.fi/linkedevents/v1/event/${id}`)
      .then(function (response) {
        const data = response.data;
        console.log(data);
        setEvent(data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className=" container px-3 mt-5">
      <img
        src={
          event?.images[0]?.url ??
          "https://images.unsplash.com/photo-1472653431158-6364773b2a56?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469"
        }
        alt={event?.images[0]?.alt_text ?? "image name"}
      />
      <h2>{event?.name.fi || event?.name?.sv}</h2>
      <p>
        {event?.offers[0]?.is_free
          ? "free"
          : event?.offers[0]?.price.en
          ? event?.offers[0]?.price.en
          : ""}
      </p>
      {/* <p>Provider: {event?.provider.en}</p> */}
      <h3>About this event</h3>
      <p>
        {event.description.en || event.description.fi || event.description.sv}
      </p>
      {/* date and time, location  */}
      <div>
        <p>Start time: {event.start_time}</p>
        <p>End time:{event.end_time}</p>
        <p>Location: </p>
      </div>
      {/* <p>More info here: {event?.info_url.en}</p> */}
      <h3>Tags</h3>
      <h3>Share with friends</h3>
    </div>
  );
};

export default EventShow;
