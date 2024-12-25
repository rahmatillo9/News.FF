import { useState } from "react";

const useGetInputValues = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const resetValues = () => {
    setValues(initialValues);
  };

  return { values, handleChange, resetValues };
};

export default useGetInputValues;
