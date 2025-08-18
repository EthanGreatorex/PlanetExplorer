import React, { useMemo, useEffect } from "react";
import { debounce } from "lodash";
import './planetSearch.scss';

interface Props {
  currentInput: string;
  setCurrentInput: (value: string) => void;
  debouncedInput: string;
  setDebouncedInput: (value: string) => void;
}

export default function PlanetSearch({ currentInput, setCurrentInput, debouncedInput, setDebouncedInput }: Props) {
  const debouncedSetInput = useMemo(
    () => debounce(setDebouncedInput, 200),
    [setDebouncedInput]
  );

  useEffect(() => {
    return () => {
      debouncedSetInput.cancel();
    };
  }, [debouncedSetInput]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // Update the input visualy straight away
    setCurrentInput(e.target.value)
    // Do not call a planet filter until after a delay
    debouncedSetInput(e.target.value);
  };

  return (
    <form className="form">
      <h3 className="form__title">Search for <span>Planets</span></h3>
      <input
        type="text"
        className="form__input"
        placeholder="Start typing..."
        value={currentInput}
        onChange={handleChange}
      />
    </form>
  );
}
