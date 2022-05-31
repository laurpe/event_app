import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import Button from "@mui/material/Button";

const EventList = (props) => {
  // States
  const [APIData, setAPIData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // fetch events

  useEffect(() => {
    const fetchLocalEvents = async () => {
      setLoading(true);
      const response = await axios.get("/api/events");
      setAPIData(response.data);
      setFilteredData(response.data);
      setLoading(false);
    };

    fetchLocalEvents();
  }, []);

  // create category array from APIData
  const categoryItems = [...new Set(APIData.map((event) => event.category))];

  // Date time format
  const findDay = (dateString) => {
    let eventDate = new Date(dateString);
    let eventDateString = new Date(
      dateString
    ).toString(); /* convert date object to string to insert into jsx */
    let currentDate = new Date();
    const timeDiff = eventDate.getTime() - currentDate.getTime();
    const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    if (diffDays == 0) {
      return "Today";
    } else if (diffDays == 1) {
      return "Tomorrow";
    } else {
      return new Date(dateString).toString();
    }
  };

  // handle search
  const handleSearch = (searchValue) => {
    // set search state to the searchValue
    setSearch(searchValue);
    if (search === "") {
      setFilteredData(APIData);
    } else {
      // filter out APIData using filter method
      const result = APIData.filter((event) => {
        return Object.values(event)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilteredData(result);
    }
  };

  // handle filter

  const handlePriceFilter = (filterPrice) => {
    const filteredPriceItems = APIData.filter((eventItem) => {
      return eventItem.price === "free";
    });
    setFilteredData(filteredPriceItems);
  };

  // handle Category filter

  const handleCategoryFilter = (currentCategory) => {
    const result = APIData.filter((event) => {
      return event.category === currentCategory;
    });
    setFilteredData(result);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      {/* search  */}
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search for events"
        aria-label="Search"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <div className="container my-3">
        Filters
        <FilterListIcon />
        <button
          type="button"
          className="btn btn-outline-primary mx-1 my-1"
          variant="outlined"
          size="small"
          onClick={() => setFilteredData(APIData)}
        >
          All
        </button>
        <button
          type="button"
          className="btn btn-outline-primary mx-1 my-1"
          variant="outlined"
          size="small"
          onClick={() => handlePriceFilter("free")}
        >
          Free
        </button>
        {/* <select name="category" id="category">
          {categoryItems.map((cat) => {
            return (
              <option
                key={cat}
                value={cat}
                onClick={() => handleCategoryFilter(cat)}
              >
                {cat}
              </option>
            );
          })}
        </select> */}
        {categoryItems.map((cat) => {
          return (
            <button
              type="button"
              className="btn btn-outline-primary mx-1 my-1"
              key={cat}
              onClick={() => handleCategoryFilter(cat)}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {filteredData.map((event) => {
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
                  <p className="text-danger">{findDay(event.startDateTime)}</p>
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
        }) ||
          APIData.map((event) => {
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
