import {
  differenceInYears,
  differenceInMonths,
  differenceInCalendarDays,
  isValid,
  isExists,
} from 'date-fns';
import { useState } from 'react';

export default function DateTimePicker() {
  const now = new Date();

  const [formErrors, setFormErrors] = useState({
    day: '',
    month: '',
    year: '',
  });

  const [formValues, setFormValues] = useState({
    day: '',
    month: '',
    year: '',
  });

  const [result, setResult] = useState({
    day: '--',
    month: '--',
    year: '--',
  });

  const validDay = (day) => Number.isInteger(day) && day >= 1 && day <= 31;
  const validMonth = (month) =>
    Number.isInteger(month) && month >= 1 && month <= 12;
  const validYear = (year) => Number.isInteger && year <= now.getFullYear;

  const validDate = (day, month, year) =>
    isValid(new Date(year, month - 1, day));

  const onInputChange = (e) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fieldsAreEmpty = (formValues) => {
    return Object.keys(formValues).some((key) => formValues[key].length == 0);
  };

  const invalidFieldValues = (formValues) => validDay(Number(formValues.day));
  // validDay(formValues.day) &&
  // validMonth(formValues.month) &&
  // validYear(formValues.year) &&
  // validDate(formValues.day, formValues.month, formValues.year);

  // console.log(
  //   diffInYears,
  //   diffInMonths - diffInYears * 12,
  // diffInDays -
  //   (Math.floor(diffInYears * 365) +
  //     Math.floor((diffInMonths - diffInYears * 12) * 31))
  // );

  const invalidDate = (formValues) => {};

  const calculateAge = (formValues) => {};

  const returnErrorMessageForDayField = (formValues) => {
    let errorMessage = '';
    let value = formValues.day;

    if (value.length == 0) {
      errorMessage = 'This field is required';
    } else if (Number(value) < 1 || Number(value) > 31) {
      errorMessage = 'Must be a valid day';
    } else {
      errorMessage = '';
    }

    return errorMessage;
  };

  const returnErrorMessageForMonthField = (formValues) => {
    let errorMessage = '';
    let value = formValues.month;

    if (value.length == 0) {
      errorMessage = 'This field is required';
    } else if (Number(value) < 1 || Number(value) > 12) {
      errorMessage = 'Must be a valid month';
    } else {
      errorMessage = '';
    }

    return errorMessage;
  };

  const returnErrorMessageForYearField = (formValues) => {
    let errorMessage = '';
    let value = formValues.year;
    if (value.length == 0) {
      errorMessage = 'This field is required';
    } else if (value > now.getFullYear()) {
      errorMessage = 'Must be in the past';
    } else {
      errorMessage = '';
    }

    return errorMessage;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // if (fieldsAreEmpty(formValues)) {
    //   Object.keys(formValues)
    //     .filter((key) => formValues[key].length == 0)
    //     .forEach((key) => {
    //       setFormErrors((prevState) => ({
    //         ...prevState,
    //         [key]: 'This field is required',
    //       }));
    //     });
    // } else if (validDay(Number(formValues.day))) {
    //   // show error message for particular field
    //   console.log('invalid');
    // } else if (invalidDate(formValues)) {
    //   // show invalid date error
    // } else {
    //   // make calculation
    //   calculateAge(formValues);

    setFormErrors((prevState) => ({
      ...prevState,
      day: returnErrorMessageForDayField(formValues),
      month: returnErrorMessageForMonthField(formValues),
      year: returnErrorMessageForYearField(formValues),
    }));

    // if (isExists(formValues.year, formValues.month - 1, formValues.day)) {
    //   setFormErrors({
    //     day: 'Must be a valid date',
    //     month: '',
    //     year: '',
    //   });
    // } else {
    //   const birthday = new Date(
    //     Number(formValues.year),
    //     Number(formValues.month - 1),
    //     Number(formValues.day)
    //   );
    //   const diffInYears = differenceInYears(now, birthday);
    //   const diffInMonths = differenceInMonths(now, birthday);
    //   const diffInDays = differenceInCalendarDays(now, birthday);

    //   setResult({
    //     year: diffInYears,
    //     month: diffInMonths - diffInYears * 12,
    //     day:
    //       diffInDays -
    //       (Math.floor(diffInYears * 365) +
    //         Math.floor((diffInMonths - diffInYears * 12) * 31)),
    //   });

    //   setFormErrors({
    //     day: '',
    //     month: '',
    //     year: '',
    //   });
    // }
  };

  return (
    <section className="flex flex-col w-full bg-white p-8 sm:py-12 sm:px-16 m-8 rounded-2xl rounded-br-[6rem] min-w-fit max-w-2xl">
      <form>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-1">
            <label
              className={`tracking-wider uppercase font-poppins700 text-xs ${
                formErrors.day ? 'text-lightRed' : 'text-smokeyGrey'
              }`}
            >
              Day
            </label>
            <input
              name="day"
              onChange={onInputChange}
              min="1"
              max="31"
              placeholder="DD"
              maxLength="2"
              className={`border border-solid  rounded-lg w-20 h-12 p-4 text-black text-md font-poppins800 sm:text-xl sm:w-28 ${
                formErrors.day ? 'border-lightRed' : 'border-lightGrey'
              } `}
              type="number"
            ></input>
            <span className="text-lightRed text-xxs font-poppins400i ">
              {formErrors.day}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <label
              className={`tracking-wider uppercase font-poppins700 text-xs ${
                formErrors.month ? 'text-lightRed' : 'text-smokeyGrey'
              }`}
            >
              Month
            </label>
            <input
              name="month"
              placeholder="MM"
              onChange={onInputChange}
              className={`border border-solid  rounded-lg w-20 h-12 p-4 text-black text-md font-poppins800 sm:text-xl sm:w-28 ${
                formErrors.month ? 'border-lightRed' : 'border-lightGrey'
              } `}
              type="number"
            ></input>
            <span className="text-lightRed text-xxs  font-poppins400i ">
              {formErrors.month}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label
              className={`tracking-wider uppercase font-poppins700 text-xs ${
                formErrors.year ? 'text-lightRed' : 'text-smokeyGrey'
              }`}
            >
              Year
            </label>
            <input
              name="year"
              placeholder="YYYY"
              onChange={onInputChange}
              className={`border border-solid  rounded-lg w-20 h-12 p-4 text-black text-md font-poppins800 sm:text-xl sm:w-28 ${
                formErrors.year ? 'border-lightRed' : 'border-lightGrey'
              } `}
              type="number"
            ></input>
            <span className="text-lightRed text-xxs  font-poppins400i ">
              {formErrors.year}
            </span>{' '}
          </div>
        </div>

        <div className="relative border-t border-t-lightGrey h-1 w-full my-8 sm:my-12">
          <button
            onClick={onSubmit}
            type="button"
            className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-14 h-14 bg-purple rounded-full bg-[url(/src/assets/images/icon-arrow.svg)] bg-center bg-no-repeat bg-[length:50%] active:bg-black hover:bg-black sm:left-full sm:w-20 sm:h-20"
            aria-label="Submit"
          ></button>
        </div>
      </form>

      <div className="font-poppins700i text-4xl sm:text-7xl">
        <p className="">
          <span className="text-purple align-middle">{result.year}</span> years
        </p>
        <p>
          <span className="text-purple align-middle">{result.month} </span>
          months
        </p>
        <p>
          <span className="text-purple align-middle">{result.day}</span> days
        </p>
      </div>
    </section>
  );
}
