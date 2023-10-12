import { InputElement } from "@/presentation/types/shared.types";
import { setCursorOnEnd } from "@/presentation/utils/shared.utils";

describe("setCursorOnEnd", () => {
  it("should set the cursor position to the end of the input value", () => {
    const input: InputElement = document.createElement("input");
    input.value = "Hello, world!";

    const event = {
      currentTarget: input,
    } as React.FormEvent<HTMLInputElement>;

    setCursorOnEnd(event);

    expect(input.selectionStart).toBe(input.value.length);
    expect(input.selectionEnd).toBe(input.value.length);
  });
});
