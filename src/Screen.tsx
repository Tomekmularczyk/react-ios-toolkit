import React from "react";
import ReactDOM from "react-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

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

function useOuterContainer(): HTMLDivElement {
  const ref = React.useRef<HTMLDivElement>();

  if (!ref.current) {
    ref.current = document.createElement("div");
    document.body.appendChild(ref.current);
  }

  React.useEffect(() => {
    return () => {
      const node = ref.current;
      if (node) {
        document.body.removeChild(node);
      }
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
      mainContainer.style.transform = "translate(-20vw)";
    }

    return () => {
      if (mainContainer) mainContainer.style.removeProperty("transform");
    };
  }, [isOpen]);
}

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
}
export const Screen = ({ children, isOpen }: Props) => {
  const pageRef = React.useRef<HTMLDivElement | null>(null);
  const container = useOuterContainer();
  useBodyScrollLock(isOpen, pageRef);
  usePageTransition(isOpen);

  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        overflowY: "scroll",
        backgroundColor: "white",
        width: "100vw",
        top: 0,
        height: "100vh",
        transition: `transform ${TRANSITION_DURATION}s ease-out`,
        transform: isOpen ? "translate(0)" : "translate(100vw)",
        /* Fixes iOS vertical scroling through containers with horizontal scroll
             https://stackoverflow.com/questions/41681251/overflow-x-scroll-inside-a-fixed-div-prevents-vertical-scrolling-on-ios */
        WebkitOverflowScrolling: "touch"
      }}
      ref={pageRef}
    >
      {children}
    </div>,
    container
  );
};
