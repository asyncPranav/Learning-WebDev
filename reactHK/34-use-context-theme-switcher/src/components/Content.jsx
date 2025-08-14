import React from "react";
import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

const Content = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`content ${theme}`}>
      <h2>Heading</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam odio vitae
        eaque molestiae illo laudantium ipsum dignissimos, aliquid
        exercitationem hic numquam obcaecati sequi inventore corporis accusamus
        recusandae ducimus dolores! Quia voluptatem voluptates dignissimos
        dolores officiis maiores molestiae quidem. Unde aliquam, non accusantium
        nihil voluptatibus quisquam? Nihil eius odio itaque autem mollitia?
        Adipisci esse impedit illum non asperiores, molestias facere dolorum
        quos eveniet modi, quas, enim blanditiis voluptatibus! Ratione nam ex
        tenetur minus assumenda possimus blanditiis quod voluptatibus laborum,
        architecto nobis est pariatur eligendi voluptas natus debitis veniam
        expedita praesentium voluptatem! Eum dicta deleniti molestias explicabo,
        ad cupiditate dolor? Quia, temporibus.
      </p>
    </div>
  );
};

export default Content;
