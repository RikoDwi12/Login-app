import { useState } from "react";

const useInput = () => {
  const [input, setInput] = useState<string>();

  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);
  };

  const reset = () => {
    setInput(undefined);
  };

  return { input, handleInput, reset, setInput };
};

export default useInput;
