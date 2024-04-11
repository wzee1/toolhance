"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

import Link from "next/link";
import Image from "next/image";
import toolURL1 from "../../public/wrench.png";
import toolURL2 from "../../public/menu.svg";
import toolURL3 from "../../public/hammer.png";

import { Button } from "./button";

export const ContainerScroll = ({
  users,
  titleComponent,
}: {
  users: {
    name: string;
    designation: string;
    image: string;
    badge?: string;
  }[];
  titleComponent: string | React.ReactNode;
}) => {
  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[70rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card
          rotate={rotate}
          translate={translate}
          scale={scale}
          users={users}
        />
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale
}: {
  rotate: any;
  scale: any;
  translate: any;
  users: {
    name: string;
    designation: string;
    image: string;
    badge?: string;
  }[];
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate, // rotate in X-axis
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-4xl mt-[-6.75rem] sm:mt-[-7rem] md:mt-[-2.5rem] lg:mt-[-3.25rem] mx-auto h-[30rem] md:h-[35rem] w-full border-4 border-[#6C6C6C] p-6 bg-[#222222] rounded-[30px] shadow-2xl relative z-[100] grid grid-cols-1 grid-rows-10 place-items-center gap-5"
    >
      <div className="bg-gray-100 h-full w-full rounded-2xl grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden p-4 row-span-9">
        {tools.map(tool => (
          <div
            className="h-full w-full rounded-lg bg-gradient-to-b  from-blue-300 to-blue-700 p-1 hover:p-0 transition-all"
            key={tool.name}
          >
          <div
            className="grid grid-cols-2 grid-rows-2 lg:flex lg:flex-col lg:justify-around place-items-center bg-gray-900 rounded-md p-3.5 h-full"
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl text-white">
              {tool.name}
            </h2>

            <Image
              src={tool.imageURL}
              alt="Image"
              height={50}
              width={50}
              className="md:scale-125 lg:scale-150 row-span-2 col-start-2 row-start-1"
              />

            <Link href={`/tools/${tool.name}`}>
              <Button className="col-start-1 row-start-2 bg-white text-black hover:bg-blue-500 hover:text-white">
                Try It Out
              </Button>
            </Link>
          </div>
        </div>
        ))}
      </div>

      <Link href="/tools" className="mx-auto row-start-10">
        <Button className="text-md bg-white text-black hover:bg-blue-500 hover:text-white">
          Browse All Tools
        </Button>
      </Link>
    </motion.div>
    );
  };

const tools = [
  { name: 'Tool #1', imageURL: toolURL1 },
  { name: 'Tool #2', imageURL: toolURL2 },
  { name: 'Tool #3', imageURL: toolURL3 },
]