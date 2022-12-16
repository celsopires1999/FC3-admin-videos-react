import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from "@mui/material";
import { CastMember } from "../types/CastMember";
import { Category } from "../types/Category";
import { Genre } from "../types/Genre";

type Entities = Category | Genre | CastMember;

type Props = {
  name: string;
  label: string;
  options?: Entities[];
  value: Entities[];
  isDisabled: boolean;
  isLoading: boolean;
  handleChange: (value: any) => void;
};

export const AutocompleteFields = ({
  name,
  label,
  options,
  value,
  isDisabled,
  isLoading,
  handleChange,
}: Props) => {
  const renderOptions = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: Entities
  ) => (
    <li {...props} key={option.id}>
      {option.name}
    </li>
  );

  const isIdEqual = (option: Entities, value: Entities): boolean =>
    option.id === value.id;

  const handleOnChange = (_e: React.ChangeEvent<{}>, value: Entities[]) => {
    handleChange({
      target: { name, value },
    } as any);
  };

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <TextField {...params} label={label} data-testid={`${name}-input`} />
  );

  return (
    <Autocomplete
      multiple
      value={value}
      options={options || []}
      loading={isLoading}
      filterSelectedOptions
      renderInput={renderInput}
      onChange={handleOnChange}
      renderOption={renderOptions}
      data-testid={`${name}-search`}
      isOptionEqualToValue={isIdEqual}
      getOptionLabel={(option) => option.name}
      disabled={isDisabled || isLoading || !options}
    />
  );
};
