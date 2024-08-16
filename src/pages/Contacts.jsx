import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = () => {
    axios
      .get("http://localhost:5000/api/get-contacts", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.errors[0].msg);
      });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-contact/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      toast.success("Contact Deleted Successfully");
      fetchContacts();
    } catch (error) {
      toast.error(error.response.data.errors[0].msg);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <h1 className="pb-4">Contacts</h1>
      <div className="flex flex-wrap gap-5">
        {contacts.map((contact, index) => (
          <div className="card-client" key={index}>
            <button
              className="bin-button"
              onClick={() => handleDelete(contact._id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 39 7"
                className="bin-top">
                <line strokeWidth={4} stroke="white" y2={5} x2={39} y1={5} />
                <line
                  strokeWidth={3}
                  stroke="white"
                  y2="1.5"
                  x2="26.0357"
                  y1="1.5"
                  x1={12}
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 33 39"
                className="bin-bottom">
                <mask fill="white" id="path-1-inside-1_8_19">
                  <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
                </mask>
                <path
                  mask="url(#path-1-inside-1_8_19)"
                  fill="white"
                  d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                />
                <path strokeWidth={4} stroke="white" d="M12 6L12 29" />
                <path strokeWidth={4} stroke="white" d="M21 6V29" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 89 80"
                className="garbage">
                <path
                  fill="white"
                  d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                />
              </svg>
            </button>
            <div className="user-picture">
              <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
              </svg>
            </div>
            <p className="name-client">
              {contact.name}
              <span>{contact.number}</span>
            </p>
            <div className="social-media"></div>
            email: {contact.email}
            <br />
            Address: {contact.address}
            <div className="mt-4">
              <Link to={`/dashboard/edit-contact/${contact._id}`}>
                <button className="button">Update</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Contacts;
