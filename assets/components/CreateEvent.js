import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateEvent = () => {
    const [data, setData] = useState({
        name: "",
        organizer: "",
        description: "",
        category: "",
        streetname: "",
        city: "",
        venue: "",
        startDateTime: "",
        endDateTime: "",
        price: "",
        image: "",
        postalCode: "",
        tags: [],
    });

    const categories = ["music", "pets", "food"];

    const changeData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const changeCategory = (e) => {
        const categoryChosen = categories.find((c) => c === e.target.value);
        setData({
            ...data,
            category: categoryChosen,
        });
    };

    const submitData = async (e) => {
        e.preventDefault();

        await axios.post("api/events", data).catch((err) => console.log(err));

        document.querySelector("form").reset();

        const submitMessage = document.createElement("p");
        submitMessage.innerHTML = "New recipe added!";
        document.querySelector(".submitMessage").appendChild(submitMessage);
        console.log(data);
    };

    return (
        <>
            <div className="formFrame">
                <h2>Create Event</h2>
                <div className="submitMessage"></div>

                <form onSubmit={submitData}>
                    <div>
                        <div className="d-flex form-group my-1">
                            <input
                                className=" d-flex form-control"
                                type="text"
                                name="name"
                                id="name"
                                onChange={changeData}
                                placeholder="Event name"
                            />
                        </div>
                        <div className="form-group my-1">
                            <input
                                className="form-control"
                                type="text"
                                name="organizer"
                                id="organizer"
                                onChange={changeData}
                                placeholder="Organizer"
                            />
                        </div>
                        <div>
                            <textarea
                                className="form-control"
                                type="text"
                                name="description"
                                id="description"
                                onChange={changeData}
                                placeholder="Description"
                            />
                        </div>
                        <div className="category from-group row my-1">
                            <label
                                htmlFor="category"
                                className="col-sm-2 col-form-label"
                            >
                                Category
                            </label>
                            <div className="col-sm-10">
                                <select
                                    className="form-control my-1"
                                    name="category"
                                    id="category"
                                    onChange={changeCategory}
                                >
                                    {categories.map((c) => (
                                        <option
                                            className="form-control"
                                            key={c}
                                        >
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className="locationFrame">
                                <input
                                    className="form-control my-1"
                                    type="text"
                                    name="venue"
                                    id="venue"
                                    placeholder="Venue name: e.g. Löyly"
                                    onChange={changeData}
                                />
                                <input
                                    className="form-control my-1"
                                    type="text"
                                    name="streetname"
                                    id="streetname"
                                    placeholder="Street: e.g. Annankatu 1"
                                    onChange={changeData}
                                />
                                <input
                                    className="form-control my-1"
                                    type="text"
                                    name="postalcode"
                                    id="postalcode"
                                    placeholder="Postal Code: e.g 00100"
                                    onChange={changeData}
                                />

                                <input
                                    className="form-control my-1"
                                    type="text"
                                    name="city"
                                    id="city"
                                    placeholder="City: e.g. Helsinki"
                                    onChange={changeData}
                                />
                            </div>
                        </div>
                        <div className="form-group  my-3">
                            <label
                                htmlFor="startDateTime"
                                className="form-control"
                            >
                                Start date and time
                            </label>
                            <input
                                className="form-control"
                                type="datetime-local"
                                name="startDateTime"
                                id="startDateTime"
                                onChange={changeData}
                            />
                        </div>
                        <div className="form-group my-3">
                            <label
                                htmlFor="endDateTime"
                                className="form-control"
                            >
                                End date and time
                            </label>
                            <input
                                className="form-control"
                                type="datetime-local"
                                name="endDateTime"
                                id="endDateTime"
                                onChange={changeData}
                            />
                        </div>
                        <div>
                            <input
                                className="form-control my-1"
                                type="text"
                                name="price"
                                id="price"
                                onChange={changeData}
                                placeholder="Price"
                            />
                        </div>
                        <div>
                            <input
                                className="form-control my-1"
                                type="url"
                                name="image"
                                id="image"
                                onChange={changeData}
                                placeholder="Add image url"
                            />
                        </div>
                    </div>
                    <input
                        className="button form-control"
                        type="submit"
                        value="Add event"
                    />
                </form>
            </div>
        </>
    );
};

export default CreateEvent;
