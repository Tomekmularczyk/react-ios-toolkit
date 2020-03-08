import React from "react";
import ReactDOM from "react-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  innerRef?: React.MutableRefObject<HTMLDivElement | null>;
}

const TRANSITION_DURATION = 0.3;

function useBodyScrollLock(
  isPageOpen: boolean,
  pageRef: React.RefObject<HTMLDivElement>
) {
  React.useEffect(() => {
    const node = pageRef.current;

    if (isPageOpen && node) {
      disableBodyScroll(node);
    }

    return () => {
      if (node) {
        enableBodyScroll(node);
      }
    };
  }, [isPageOpen, pageRef]);
}

function useOuterContainer() {
  const ref = React.useRef<HTMLDivElement>();
  React.useEffect(() => {
    ref.current = document.createElement("div");
    document.body.appendChild(ref.current);

    const node = ref.current;
    return () => {
      document.body.removeChild(node);
    };
  }, []);

  return ref.current;
}

function usePageTransition(isOpen: boolean) {
  React.useEffect(() => {
    const mainContainer = document.getElementById("root");
    if (mainContainer) {
      mainContainer.style.transition = `all ${TRANSITION_DURATION}s ease-out`;
    }
    return () => {
      if (mainContainer) {
        mainContainer.style.removeProperty("transition");
      }
    };
  }, []);

  React.useEffect(() => {
    const mainContainer = document.getElementById("root");
    if (isOpen && mainContainer) {
      mainContainer.style.transform = "translate(-100vw)";
    }

    return () => {
      if (mainContainer) mainContainer.style.removeProperty("transform");
    };
  }, [isOpen]);
}

export const TabPage = ({ children, isOpen, innerRef }: Props) => {
  const pageRef = React.useRef<HTMLDivElement | null>(null);
  const container = useOuterContainer();
  useBodyScrollLock(isOpen, pageRef);
  usePageTransition(isOpen);

  if (container) {
    return ReactDOM.createPortal(
      <div
        style={{
          position: "fixed",
          overflowY: "scroll",
          backgroundColor: "white",
          width: "100vw",
          top: 0,
          height: "100vh",
          transition: `left ${TRANSITION_DURATION}s ease-out`,
          left: isOpen ? 0 : "100vw",
          /* Fixes iOS vertical scroling through containers with horizontal scroll
             https://stackoverflow.com/questions/41681251/overflow-x-scroll-inside-a-fixed-div-prevents-vertical-scrolling-on-ios */
          WebkitOverflowScrolling: "touch"
        }}
        ref={el => {
          pageRef.current = el;
          if (innerRef) {
            innerRef.current = el;
          }
        }}
      >
        {children}
      </div>,
      container
    );
  }

  return null;
};
