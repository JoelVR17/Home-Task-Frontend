import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1 className="font-black text-center text-4xl text-white">
        Page not Found
      </h1>
      <p className="mt-10 text-center text-white">
        Do you want to go home?
        <Link className="text-fuchsia-500 mx-5 font-bold" to={`/`}>
          Projects
        </Link>
      </p>
    </>
  );
};

export default NotFound;
