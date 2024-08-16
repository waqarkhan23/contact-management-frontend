import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { contactValidation } from "../utils/contactValidation";
import { toast } from "react-toastify";
import axios from "axios";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/get-contact/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setContact(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const { name, number, email, address } = contact;

  const handleSubmit = async (values) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/update-contact/${id}`,
        {
          name: values.name,
          email: values.email,
          number: values.number,
          address: values.address,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      toast.success("Contact Updated Successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.errors[0].msg);
    }
  };

  return (
    <div>
      <h1>Edit Contact</h1>
      <div>
        <Formik
          initialValues={{
            name: name,
            email: email,
            number: number,
            address: address,
          }}
          enableReinitialize={true}
          validationSchema={contactValidation}
          onSubmit={handleSubmit}>
          <Form>
            <div className="my-2">
              <label
                htmlFor="name"
                className="text-sm font-bold text-gray-600 block">
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border bg-transparent border-gray-300 rounded mt-1"
              />
              <ErrorMessage
                className="text-red-600"
                name="name"
                component="div"
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="password"
                className="text-sm font-bold text-gray-600 block">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                className="w-full p-2 border border-gray-300 bg-transparent rounded mt-1"
              />
              <ErrorMessage
                className="text-red-600"
                name="email"
                component="div"></ErrorMessage>
            </div>
            <div className="my-2">
              <label
                htmlFor="number"
                className="text-sm font-bold text-gray-600 block">
                Number
              </label>
              <Field
                type="text"
                id="number"
                name="number"
                autoComplete="off"
                className="w-full p-2 border border-gray-300 bg-transparent rounded mt-1"
              />
              <ErrorMessage
                className="text-red-600"
                name="number"
                component="div"></ErrorMessage>
            </div>
            <div className="my-2">
              <label
                htmlFor="address"
                className="text-sm font-bold text-gray-600 block">
                Address
              </label>
              <Field
                type="text"
                id="address"
                name="address"
                autoComplete="off"
                className="w-full p-2 border border-gray-300 bg-transparent rounded mt-1"
              />
              <ErrorMessage
                className="text-red-600"
                name="address"
                component="div"></ErrorMessage>
            </div>

            <div className="my-2 px-4">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 rounded-md text-white text-sm font-bold">
                Add Contact
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditContact;
