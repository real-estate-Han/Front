import { render, screen } from "@testing-library/react";
import Home from "@pages/index";

describe("Homepage", () => {
  it("renders a home", () => {
    render(<Home />);
    const heading = screen.getByRole("dialog", {
      name: "매물별 아이템 리스트자리",
    });
  });
});
