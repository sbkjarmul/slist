import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Background from "@/presentation/components/Background";

describe("Background", () => {
  it("renders background component", () => {
    const { getByTestId } = render(<Background />);
    const background = getByTestId("background");
    expect(background).toBeInTheDocument();
  });
});
