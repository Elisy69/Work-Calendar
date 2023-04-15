import { format, getDayOfYear } from "date-fns";
const currentDate = getDayOfYear(new Date());

function Modal({ status, onSelect }) {
  return (
    <>
      <div
        className={`shadow-2xl flex flex-col content-center z-10 absolute w-96 h-96 bg-black opacity-40 top-[10rem] left-[10rem] rounded-2xl ${
          status ? "block" : "hidden"
        } `}
      >
        <h5 className="text-3xl self-center mb-20 mt-10">
          Choose the first day of work
        </h5>
        <button
          onClick={() => onSelect(-2)}
          className="self-center mb-6 text-2xl hover:text-rose-600"
        >
          Two days ago
        </button>
        <div className="self-center mb-6 text-2xl">
          <button
            onClick={() => onSelect(-1)}
            className="self-center mr-3 hover:text-rose-600"
          >
            Yesterday
          </button>
          <button
            onClick={() => onSelect(0)}
            className="self-center mr-3 hover:text-rose-600"
          >
            Today
          </button>
          <button
            onClick={() => onSelect(+1)}
            className="self-center hover:text-rose-600"
          >
            Tomorrow
          </button>
        </div>
        <button className="self-center text-2xl hover:text-rose-600">
          Choose date
        </button>
      </div>
      <div
        className={`absolute w-full h-full top-[0rem] left-[0rem] rounded-2xl backdrop-blur-3xl bg-black-500/30 ${
          status ? "block" : "hidden"
        }`}
      ></div>
    </>
  );
}

export default Modal;
