import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <TailSpin height="80" width="80" color="#a21caf" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
