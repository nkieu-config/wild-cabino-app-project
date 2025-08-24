import { getCountries } from "@/app/_lib/db/data-service";
import { Country } from "@/app/_lib/types/types";

interface SelectCountryProps {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
}

async function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
}: SelectCountryProps) {
  const countries: Country[] = await getCountries();
  const defaultFlag =
    countries.find((c) => c.name === defaultCountry)?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${defaultFlag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
