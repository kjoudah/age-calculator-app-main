import {
  differenceInYears,
  differenceInMonths,
  differenceInCalendarDays,
  isExists,
} from 'date-fns';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAnimate } from 'framer-motion';

import * as yup from 'yup';

export default function DateTimePicker() {
  const now = new Date();
  const [scope, animate] = useAnimate();

  const schema = yup.object({
    day: yup
      .number()
      .required('This field is required')
      .typeError('This field is required')
      .min(1, 'Must be a valid day')
      .max(31, 'Must be a valid day'),
    month: yup
      .number()
      .required('This field is required')
      .typeError('This field is required')
      .min(1, 'Must be a valid month')
      .max(12, 'Must be a valid month'),

    year: yup
      .number()
      .required('This field is required')
      .typeError('This field is required')
      .max(now.getFullYear(), 'Must be in the past'),
  });

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [result, setResult] = useState({
    day: '--',
    month: '--',
    year: '--',
  });

  const validDate = (day, month, year) => {
    return isExists(Number(year), Number(month - 1), Number(day));
  };

  const animateDateNumber = (number, changeState) => {
    animate(0, number, {
      duration: 3,
      onUpdate: value => {
        changeState(value);
      },
    });
  };

  const onSubmit = () => {
    if (!validDate(getValues('day'), getValues('month'), getValues('year'))) {
      setError('invalidDate', {
        type: 'invalidDate',
        message: 'Must be a valid date',
      });
    } else {
      clearErrors();
      const birthday = new Date(
        getValues('year'),
        getValues('month') - 1,
        getValues('day')
      );
      const diffInYears = differenceInYears(now, birthday);
      const diffInMonths = differenceInMonths(now, birthday);
      const diffInDays = differenceInCalendarDays(now, birthday);

      const finalResultYears = diffInYears;
      const finalResultMonths = diffInMonths - diffInYears * 12;
      const finalResultDays =
        diffInDays -
        (Math.floor(diffInYears * 365) +
          Math.floor((diffInMonths - diffInYears * 12) * 31));

      animateDateNumber(finalResultYears, value => {
        setResult(prevState => ({
          ...prevState,
          year: value.toFixed(),
        }));
      });

      animateDateNumber(finalResultMonths, value => {
        setResult(prevState => ({
          ...prevState,
          month: value.toFixed(),
        }));
      });

      animateDateNumber(finalResultDays, value => {
        setResult(prevState => ({
          ...prevState,
          day: value.toFixed(),
        }));
      });
    }
  };

  const dayValidation = {
    required: true,
    min: 1,
    max: 31,
    validate: validDate,
  };

  const monthValidation = { required: true, min: 1, max: 12 };

  const yearValidation = { required: true, max: now.getFullYear() };

  return (
    <section className="loading-transition flex flex-col w-full bg-white p-8 sm:py-12 sm:px-16 m-8 rounded-2xl rounded-br-[6rem] min-w-fit max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-1">
            <label
              className={`tracking-wider uppercase font-poppins700 text-xs sm:text-lg ${
                errors?.day ? 'text-lightRed' : 'text-smokeyGrey'
              }`}
            >
              Day
            </label>
            <input
              name="day"
              {...register('day', dayValidation)}
              placeholder="DD"
              maxLength="2"
              className={`border border-solid  rounded-lg w-20 h-12 p-4 text-black text-md font-poppins800 sm:text-xl sm:w-28 ${
                errors?.day ? 'border-lightRed' : 'border-lightGrey'
              } `}
              type="number"
            ></input>
            <span className="text-lightRed text-xs font-poppins400i">
              {errors?.day?.message}
            </span>
            <span className="text-lightRed text-xs font-poppins400i">
              {errors?.invalidDate?.message}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <label
              className={`tracking-wider uppercase font-poppins700 text-xs  sm:text-lg ${
                errors?.month ? 'text-lightRed' : 'text-smokeyGrey'
              }`}
            >
              Month
            </label>
            <input
              {...register('month', monthValidation)}
              name="month"
              placeholder="MM"
              className={`border border-solid  rounded-lg w-20 h-12 p-4 text-black text-md font-poppins800 sm:text-xl sm:w-28 ${
                errors?.month ? 'border-lightRed' : 'border-lightGrey'
              } `}
              type="number"
            ></input>

            <span className="text-lightRed text-xs font-poppins400i">
              {errors?.month?.message}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label
              className={`tracking-wider uppercase font-poppins700 text-xs  sm:text-lg ${
                errors?.year ? 'text-lightRed' : 'text-smokeyGrey'
              }`}
            >
              Year
            </label>
            <input
              name="year"
              {...register('year', yearValidation)}
              placeholder="YYYY"
              className={`border border-solid  rounded-lg w-20 h-12 p-4 text-black text-md font-poppins800 sm:text-xl sm:w-28 ${
                errors?.year ? 'border-lightRed' : 'border-lightGrey'
              } `}
              type="number"
            ></input>

            <span className="text-lightRed text-xs font-poppins400i">
              {errors?.year?.message}
            </span>
          </div>
        </div>

        <div className="relative border-t border-t-lightGrey h-1 w-full my-8 sm:my-12">
          <button
            type="submit"
            className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-14 h-14 bg-purple rounded-full bg-[url(/src/assets/images/icon-arrow.svg)] bg-center bg-no-repeat bg-[length:50%] active:bg-black hover:bg-black sm:left-full sm:w-20 sm:h-20"
            aria-label="Submit"
          ></button>
        </div>
      </form>

      <div ref={scope} className="font-poppins700i text-4xl sm:text-7xl">
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
