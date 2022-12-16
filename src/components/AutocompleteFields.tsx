import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from "@mui/material";
import { CastMember } from "../types/CastMember";
import { Category } from "../types/Category";
import { Genre } from "../types/Genre";

type Entity = Category | Genre | CastMember;

type Props = {
  name: string;
  label: string;
  value: Entity[];
  isLoading: boolean;
  isDisabled: boolean;
  options?: Entity[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AutocompleteFields = ({
  value,
  isLoading,
  isDisabled,
  options,
  label,
  name,
  handleChange,
}: Props) => {
  const getOptionsLabel = (option: Entity): string => option.name;

  const isOptionEqualToValue = (option: Entity, value: Entity): boolean =>
    option.id === value.id;

  const renderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: Entity
  ) => (
    <li {...props} key={option.id}>
      {option.name}
    </li>
  );

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <TextField {...params} label={label} data-testid={`${name}-input`} />
  );

  const handleOnChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: Entity[]
  ) => {
    handleChange({
      target: { name, value },
    } as any);
  };

  return (
    <Autocomplete
      multiple
      value={value}
      loading={isLoading}
      filterSelectedOptions
      options={options ?? []}
      onChange={handleOnChange}
      renderInput={renderInput}
      renderOption={renderOption}
      getOptionLabel={getOptionsLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      disabled={isDisabled || isLoading || !options}
    />
  );
};
