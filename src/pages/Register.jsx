import { Link, useNavigate } from "react-router-dom";
import bgImg from "../assets/bgImg.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "../utils/YupValidator";

const Register = () => {
  const navigate = useNavigate();
  const styles = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url(${bgImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "90vh",
  };

  const handleSubmit = async (values) => {
    console.log(values);
    await axios
      .post("http://localhost:5000/api/register", values)
      .then((res) => {
        console.log(res.data);
        toast.success("Account Created Succefully", {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
        });
        navigate("/login");
      })

      .catch((err) => {
        toast.error(err.response.data.errors[0].msg);
      });
  };
  return (
    <>
      <div
        className=" bg-gray-100  flex flex-col gap-4 justify-center"
        style={styles}>
        <div className="max-w-md w-full mx-auto ">
          <div className="text-3xl font-bold text-gray-300  text-center">
            Register
          </div>
        </div>
        <div
          className="max-w-md w-full mx-auto mt-4p-8 border mb-4 border-gray-300 p-3"
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {() => (
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
                    className="w-full p-2 border border-gray-300 rounded mt-1 bg-transparent"
                  />
                  <ErrorMessage
                    className="text-red-600"
                    name="name"
                    component="div"
                  />
                </div>

                <div className="my-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-bold text-gray-600 block">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-2 border bg-transparent border-gray-300 rounded mt-1"
                  />
                  <ErrorMessage
                    className="text-red-600"
                    name="email"
                    component="div"
                  />
                </div>

                <div className="my-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-bold text-gray-600 block">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="off"
                    className="w-full p-2 border border-gray-300 bg-transparent rounded mt-1"
                  />
                  <ErrorMessage className="text-red-600" name="password">
                    {(message) => (
                      <div
                        className="text-red-600"
                        dangerouslySetInnerHTML={{ __html: message }}
                      />
                    )}
                  </ErrorMessage>
                </div>

                <div className="my-2 px-4">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 rounded-md text-white text-sm font-bold">
                    Register
                  </button>
                </div>
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" style={{ color: "blue" }}>
                    Login
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Register;
