import React from "react";
import { Button } from "flowbite-react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">For Further Details</h2>
        <p className="text-gray-500 my-2">Checkout LinkedIn Profile</p>
        <Button
          gradientMonochrome="teal"
          className="rounded-bl-none rounded-tr-none"
        >
          <a
            href="https://www.linkedin.com/in/muhammad-umar-amjad/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="/public/UMAR AMJAD.png"
          className="rounded-tl-3xl rounded-br-3xl "
        />
      </div>
    </div>
  );
};

export default CallToAction;
