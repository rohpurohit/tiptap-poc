import * as React from "react";
import styled from "styled-components";
import Figma from "../embeds/Figma";

const Img = styled(Image)`
  margin: 4px;
  width: 18px;
  height: 18px;
`;

function matcher(Component) {
  return (url) => {
    console.log("Component", Component);
    // @ts-expect-error not aware of static
    const regexes = [
      new RegExp(
        "https://([w.-]+.)?figma.com/(file|proto)/([0-9a-zA-Z]{22,128})(?:/.*)?$"
      ),
    ];

    for (const regex of regexes) {
      const result = url.match(regex);

      if (result) {
        return result;
      }
    }

    return false;
  };
}
const embeds = [
  {
    title: "Figma",
    keywords: "design svg vector",
    icon: () => <Img src="/images/figma.png" alt="Figma" />,
    component: Figma,
    matcher: matcher(Figma),
  },
];

export default embeds;
