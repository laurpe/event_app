import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EventsOnMap = () => {
  const [APIData, setAPIData] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch events
  useEffect(() => {
    const fetchLocalEvents = async () => {
      setLoading(true);
      const response = await axios.get("/api/events");
      setAPIData(response.data);
      setLoading(false);
    };
    fetchLocalEvents();
  }, []);

  // create addressArray
  const addressArray = APIData.map((event) => {
    return {
      streetname: event.streetname,
      postalCode: event.postalCode,
      city: event.city,
    };
  });

  // create url array
  const urlArray = addressArray.map((address) => {
    const url =
      "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" +
      address.streetname +
      address.postalCode +
      address.city;
    return url;
  });

  async function makeRequests(links) {
    for (const link of links) {
      await setTimeout(() => {
        axios.get(link).then((res) => {
          console.log(res);
        });
        console.log(link);
      }, 2000);
    }
  }

  makeRequests(urlArray);
  // Date time format

  const dateTimeFormat = (dateString) => {
    // get day of the week (Mon)
    let dayOfWeek = new Date(dateString).toDateString().slice(0, 4);

    // get time(12:00)
    let time = new Date(dateString)
      .toLocaleTimeString()
      .slice(0, 5)
      .replaceAll(".", ":");

    // get date (06.06.2022)
    let date = new Date(dateString).toLocaleDateString().replaceAll("/", ".");

    // shorten timezone (EEST)
    let timeZone = new Date(dateString)
      .toLocaleDateString("en-FI", {
        day: "2-digit",
        timeZoneName: "short",
      })
      .slice(4);

    //combine all together
    let fulldate =
      dayOfWeek + "" + time + " " + date + " " + "(" + timeZone + ")";
    return fulldate;
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {APIData.map((event) => {
          return (
            <div key={event.id} className="col">
              <div className="card shadow-sm">
                <img
                  className="card-img-top"
                  src={
                    event?.image ||
                    "https://images.unsplash.com/photo-1472653431158-6364773b2a56?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469"
                  }
                  alt="image name"
                />
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p>{event?.price}</p>
                  <p className="text-danger">
                    {dateTimeFormat(event.startDateTime)}
                  </p>
                  <p>{event?.venue}</p>
                  <Link
                    to={`events/${event.id}`}
                    className="btn btn-primary mx-1"
                  >
                    See more
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsOnMap;
