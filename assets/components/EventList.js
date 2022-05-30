import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EventList = (props) => {
  // States
  const [eventList, setEventList] = useState([]);
  const [filteredData, setFilteredData] = useState(eventList);
  const [filterParam, setFilterParam] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // handle search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredEvents = () => {
    if (search === "") {
      return eventList;
    }
    return eventList.filter((event) => {
      return event.name.toLowerCase().includes(search.toLowerCase().trim());
    });
  };

  useEffect(() => {
    // fetch events
    const fetchLocalEvents = async () => {
      const response = await axios.get("/api/events");
      setEventList(response.data);
      setFilteredData(response.data);
      setLoading(false);
    };

    fetchLocalEvents();
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      {/* search  */}
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={search}
        onChange={handleSearch}
      />
      <div>
        <button>All</button>
        <button>Free</button>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {filteredEvents().map((event, _) => {
          return (
            <div key={event.id} className="col">
              <div className="card shadow-sm">
                <img
                  className="card-img-top"
                  src={
                    // event?.images[0]?.url ||
                    event?.image ||
                    "https://images.unsplash.com/photo-1472653431158-6364773b2a56?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469"
                  }
                  // alt={event?.images[0].alt_text || "image name"}
                />
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>

                  <p>{event?.price}</p>
                  <p className="text-danger">
                    {props.dateTimeFormat(event.startDateTime)}
                  </p>
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

export default EventList;
