import React from "react";
import { linkTo } from "@storybook/addon-links";
import { Welcome } from "@storybook/react/demo";
import { Screen } from "./Screen";

const containerStyles = {
  backgroundColor: "#bbbbbb",
  minHeight: "100vh"
};

const innerBlockStyles = {
  backgroundColor: "#dddddd",
  minHeight: "100vh",
  margin: "auto 50px",
  padding: "0 2rem"
};

export const Story = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const setOpen = () => setIsOpen(true);
  const setClosed = () => setIsOpen(false);

  return (
    <div style={containerStyles}>
      <div style={innerBlockStyles}>
        <button onClick={setOpen}>open</button>
      </div>
      <Screen isOpen={isOpen}>
        <button onClick={setClosed}>close</button>
        <Welcome showApp={linkTo("Button")} />
      </Screen>
    </div>
  );
};

Story.story = {
  name: "default"
};

export default {
  title: "Screen",
  component: Welcome
};

export const emoji = () => (
  <button>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </button>
);
