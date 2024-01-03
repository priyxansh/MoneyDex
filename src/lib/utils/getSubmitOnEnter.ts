import { KeyboardEventHandler } from "react";
import { UseFormReturn } from "react-hook-form";

/**
 * Returns a function that submits a form when the enter key is pressed.
 *
 * @returns A function that submits a form when the enter key is pressed.
 */

export const getSubmitOnEnter: (
  form: UseFormReturn<any>,
  onSubmit: (args?: any) => any
) => KeyboardEventHandler<HTMLFormElement> = (form, onSubmit) => {
  return (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };
};
