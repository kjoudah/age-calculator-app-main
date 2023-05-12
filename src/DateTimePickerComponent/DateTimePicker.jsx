export default function DateTimePicker() {
  return (
    <section className="flex flex-col w-full bg-white p-8 sm:py-12 sm:px-16 m-8 rounded-2xl rounded-br-[6rem] min-w-fit max-w-2xl">
      <form>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-smokeyGrey tracking-wider uppercase font-poppins700 text-xs">
              Day
            </label>
            <input
              placeholder="DD"
              className="border border-solid border-lightGrey rounded-lg w-20 h-12 p-4 text-black text-md font-poppins800 sm:text-xl sm:w-28"
              type="number"
            ></input>
            <span className="text-lightRed text-xxs collapse font-poppins400i sm:text-xs">
              Must be a valid day
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-smokeyGrey uppercase font-poppins700 text-xs">
              Month
            </label>
            <input
              placeholder="MM"
              className="border border-solid border-lightGrey rounded-lg w-20 h-12 p-4 text-black text-md font-poppins800 sm:text-xl sm:w-28"
              type="number"
            ></input>
            <span className="text-lightRed text-xxs collapse font-poppins400i sm:sm:text-xs">
              Must be a valid day
            </span>{' '}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-smokeyGrey uppercase font-poppins700 text-xs">
              Year
            </label>
            <input
              placeholder="YYYY"
              className="border border-solid border-lightGrey rounded-lg w-20 h-12 p-4 text-black text-md font-poppins800 sm:text-xl sm:w-28"
              type="number"
            ></input>
            <span className="text-lightRed text-xxs collapse font-poppins400i sm:sm:text-xs">
              Must be a valid day
            </span>{' '}
          </div>
        </div>

        <div className="relative border-t border-t-lightGrey h-1 w-full my-8 sm:my-12">
          <button
            className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-14 h-14 bg-purple rounded-full bg-[url(/src/assets/images/icon-arrow.svg)] bg-center bg-no-repeat bg-[length:50%] active:bg-black hover:bg-black sm:left-full sm:w-20 sm:h-20"
            aria-label="Submit"
          ></button>
        </div>
      </form>

      <div className="font-poppins700i text-4xl sm:text-7xl">
        <p className="">
          <span className="text-purple align-middle">--</span> years
        </p>
        <p>
          <span className="text-purple align-middle">--</span>
          months
        </p>
        <p>
          <span className="text-purple align-middle">--</span> days
        </p>
      </div>
    </section>
  );
}
