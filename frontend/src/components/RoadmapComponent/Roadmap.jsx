import React from "react";
import { RoadmapContainer, RoadmapItem, RoadmapSeparator } from "./styles";

const Roadmap = () => {
  return (
    <RoadmapContainer>
      <RoadmapItem>Home</RoadmapItem>
      <RoadmapSeparator>/</RoadmapSeparator>
      <RoadmapItem>Profile</RoadmapItem>
      <RoadmapSeparator>/</RoadmapSeparator>
      <RoadmapItem>Edit Profile</RoadmapItem>
    </RoadmapContainer>
  );
};

export default Roadmap;
