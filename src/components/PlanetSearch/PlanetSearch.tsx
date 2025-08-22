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

  // This will update the debouncedInput state after 200ms
  const debouncedSetInput = useMemo(
    () => debounce(setDebouncedInput, 200),
    [setDebouncedInput]
  );

  // This will cancel the useMemo if it's state changes or is unmounted
  useEffect(() => {
    return () => {
      debouncedSetInput.cancel();
    };
  }, [debouncedSetInput]);


  // This is called each time the user makes a change inside the input field
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
        placeholder="Search for planet names, climate and terrain..."
        value={currentInput}
        onChange={handleChange}
      />
    </form>
  );
}
