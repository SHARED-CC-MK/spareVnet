import React from 'react'

function Drawer({ children, isOpen, setIsOpen }) {
    return (
        <main
          className={
            " fixed overflow-hidden z-auto bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
            (isOpen
              ? " transition-opacity opacity-100 duration-500 translate-x-0  "
              : " transition-all delay-500 opacity-0 translate-x-full  ")
          }
        >
          <section
            className={
              " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
              (isOpen ? " translate-x-0 " : " translate-x-full ")
            }
          >
            <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
              {/* <header className="p-4 font-bold text-lg">Inventory</header> */}
              {children}
            </article>
          </section>
          <section
            className=" w-screen h-full cursor-pointer "
            onClick={() => {
              setIsOpen(false);
            }}
          ></section>
        </main>
      );
}

export default Drawer

/*
import React from "react";
import { clsx } from "clsx";

const openClassNames = {
  right: "translate-x-0",
  left: "translate-x-0",
  top: "translate-y-0",
  bottom: "translate-y-0"
};

const closeClassNames = {
  right: "translate-x-full",
  left: "-translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full"
};

const classNames = {
  right: "inset-y-0 right-0",
  left: "inset-y-0 left-0",
  top: "inset-x-0 top-0",
  bottom: "inset-x-0 bottom-0"
};

const Drawer = ({ open, setOpen, side = "right" }) => {
  return (
    <div
      id={`dialog-${side}`}
      className="relative z-10"
      aria-labelledby="slide-over"
      role="dialog"
      aria-modal="true"
      onClick={() => setOpen(!open)}
    >
      <div
        className={clsx(
          "fixed inset-0 bg-gray-500 bg-opacity-75 transition-all",
          {
            "opacity-100 duration-500 ease-in-out visible": open
          },
          { "opacity-0 duration-500 ease-in-out invisible": !open }
        )}
      ></div>
      <div className={clsx({ "fixed inset-0 overflow-hidden": open })}>
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={clsx(
              "pointer-events-none fixed max-w-full",
              classNames[side]
            )}
          >
            <div
              className={clsx(
                "pointer-events-auto relative w-full h-full transform transition ease-in-out duration-500",
                { [closeClassNames[side]]: !open },
                { [openClassNames[side]]: open }
              )}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <div
                className={clsx(
                  "flex flex-col h-full overflow-y-scroll bg-white p-20 shadow-xl bg-blue-400 rounded-lg"
                )}
              >
                content
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;


*/
