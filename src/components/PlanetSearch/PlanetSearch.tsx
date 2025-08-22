import { useRef } from 'react';
import './planetSearch.scss';

interface Props {
  onUpdate: (input: string) => void;
}

export default function PlanetSearch({ onUpdate }: Props) {
  const debounce = useRef<number | undefined>(undefined);

  /**
   * Handles the change event for the input field.
   * @param e The change event from the input field.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    window.clearTimeout(debounce.current);

    debounce.current = window.setTimeout(() => onUpdate(e.target.value), 200);
  };

  return (
    <form className="form">
      <h3 className="form__title">
        Search for <span>Planets</span>
      </h3>
      <input
        type="text"
        className="form__input"
        placeholder="Search for planet names, climate and terrain..."
        onChange={handleChange}
      />
    </form>
  );
}
