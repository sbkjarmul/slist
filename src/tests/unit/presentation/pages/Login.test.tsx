import { render, screen } from "@testing-library/react";
import Login from "@/presentation/pages/Login";
import "@testing-library/jest-dom";
import content from "@/presentation/assets/content.json";

describe("Login component", () => {
  it("should render the login form", () => {
    render(<Login />);
    const emailInput = screen.getByText(content.login.email);
    const passwordInput = screen.getByText(content.login.password);
    const loginButton = screen.getByRole("button");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("should render the welcome text", () => {
    render(<Login />);
    const welcomeText = screen.getByText(content.login.welcomeText);
    expect(welcomeText).toBeInTheDocument();
  });
});
