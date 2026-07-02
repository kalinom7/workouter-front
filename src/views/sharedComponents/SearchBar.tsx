import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";

export const SearchBar = ({
  searched,
  search,
  setSearch,
}: {
  searched: string;
  search: string;
  setSearch: (value: string) => void;
}) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <InputGroup>
        <InputGroupInput
          placeholder={`Search for ${searched}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></InputGroupInput>
        <InputGroupAddon align="inline-end">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <Button>Filter</Button>
    </div>
  );
};
