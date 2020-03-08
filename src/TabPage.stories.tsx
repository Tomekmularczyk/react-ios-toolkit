import React from "react";
import { linkTo } from "@storybook/addon-links";
import { Welcome } from "@storybook/react/demo";
import { TabPage } from "./TabPage";

const containerStyles = {
  backgroundColor: "#bbbbbb",
  minHeight: "100vh"
};

export const Story = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const setOpen = () => setIsOpen(true);
  const setClosed = () => setIsOpen(false);

  return (
    <div style={containerStyles}>
      <button onClick={setOpen}>open</button>
      <TabPage isOpen={isOpen}>
        <button onClick={setClosed}>close</button>
        <Welcome showApp={linkTo("Button")} />
      </TabPage>
    </div>
  );
};

Story.story = {
  name: "default"
};

export default {
  title: "TabPage",
  component: Welcome
};

export const emoji = () => (
  <button>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </button>
);
