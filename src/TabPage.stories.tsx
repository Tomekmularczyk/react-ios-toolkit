import React from "react";
import { linkTo } from "@storybook/addon-links";
import { Welcome } from "@storybook/react/demo";
import { TabPage } from "./TabPage";

export default {
  title: "TabPage",
  component: Welcome
};

export const Story = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const setOpen = () => setIsOpen(true);
  const setClosed = () => setIsOpen(false);

  return (
    <>
      <button onClick={setOpen}>open</button>
      <TabPage isOpen={isOpen}>
        <button onClick={setClosed}>close</button>
        <Welcome showApp={linkTo("Button")} />
      </TabPage>
    </>
  );
};

Story.story = {
  name: "default"
};
