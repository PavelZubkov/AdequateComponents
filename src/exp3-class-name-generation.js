import { useAdequateComponent } from "./adequate";
import React from "react";

function Button() {
  const button = useAdequateComponent(Button);
  return (
    <button.root as="button" type="button">
      <button.text as="span">Click me</button.text>
    </button.root>
  );
};
function Input() {
  const input = useAdequateComponent(Input);
  return (
    <input.label as="label">
      <input.root as="input" type="text" />
    </input.label>
  )
}
function SayHello() {
  const sayHello = useAdequateComponent(SayHello);
  return (
    <sayHello.root as="div">
      <sayHello.input as={Input} />
      <sayHello.button as={Button} />
    </sayHello.root>
  )
}

/*
  output example
  <div class="SayHello">
    <label class="SayHello_input input_label">
      <input class="input" type="text" />
    </label>
    <button class="SayHello_button button" type="button">
      Click me
    </button>
  </div>
 */
export default SayHello;
