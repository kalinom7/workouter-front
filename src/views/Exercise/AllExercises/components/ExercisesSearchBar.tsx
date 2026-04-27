import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export const ExercisesSearchBar = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <InputGroup>
        <InputGroupInput
          placeholder="Search for exercise"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></InputGroupInput>
        <InputGroupAddon align="inline-end">searchIcon</InputGroupAddon>
      </InputGroup>
      <Button>Filter</Button>
    </div>
  );
};
