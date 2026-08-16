import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import { Button } from "@/components/ui/button";

test("renders button text", async () => {
  const screen = await render(<Button>Save</Button>);
  await expect.element(screen.getByText("Save")).toBeInTheDocument();
});
