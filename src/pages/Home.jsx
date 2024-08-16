import bgImg from "../assets/bgImg.jpg";
const Home = () => {
  const styles = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url(${bgImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "89.5vh",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
  };

  return (
    <div style={styles}>
      <h1 className="text-3xl  font-bold">Contact Management Sys.</h1>
      <p>
        Start collecting your contacts in a very smater way. we provide very
        smarter and easier way to manage your contacts
      </p>
    </div>
  );
};

export default Home;
