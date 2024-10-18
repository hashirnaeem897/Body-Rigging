import * as THREE from "three";
import { FolderApi, Pane, TabApi } from "tweakpane";

export const Body = (body: THREE.SkinnedMesh) => {
  const pane = new Pane();
  const Input = (
    name: string,
    index: number,
    min: number,
    max: number,
    inputPane: TabApi,
    page: number
  ) => {
    inputPane.pages[page].addInput(body.skeleton.bones[index].rotation, "x", {
      label: name,
      min: min,
      max: max,
      step: 0.1,
    });
  };
  const NormalInput = (
    name: string,
    index: number,
    min: number,
    max: number,
    inputPane: FolderApi,
    axis: keyof THREE.Euler
  ) => {
    inputPane.addInput(body.skeleton.bones[index].rotation, axis, {
      label: name,
      min: min,
      max: max,
      step: 0.1,
    });
  };
  
  //======================Folder=========================//
  const head = pane.addFolder({ title: "Head", expanded: false });
  const back = pane.addFolder({ title: "Back", expanded: false });
  const leg = pane.addFolder({ title: "Leg", expanded: false });
  const arm = pane.addFolder({ title: "Arm", expanded: false });
  //======================Tab=========================//
  const armgroup = arm.addTab({
    pages: [{ title: "Left Arm" }, { title: "Right Arm" }],
  });
  const leggroup = leg.addTab({
    pages: [{ title: "Left Leg" }, { title: "Right Leg" }],
  });
  //======================Left Leg=========================//
  Input("Tigh", 60, -Math.PI * 0.5, 0, leggroup, 0);
  Input("Knee", 61, -Math.PI * 0.7, 0, leggroup, 0);
  Input("Foot", 62, 0, Math.PI * 0.4, leggroup, 0);

  //======================Right Leg=========================//
  Input("Tigh", 55, -Math.PI * 0.5, 0, leggroup, 1);
  Input("Knee", 56, -Math.PI * 0.7, 0, leggroup, 1);
  Input("Foot", 57, 0, Math.PI * 0.4, leggroup, 1);
  //======================Left Arm=========================//
  Input("ShoulderY", 31, 0, Math.PI * 0.5, armgroup, 0);
  Input("ShoulderX", 32, -Math.PI * 0.1, Math.PI * 0.3, armgroup, 0);
  Input("Elbow", 33, 0, Math.PI * 0.5, armgroup, 0);
  Input("Hand", 34, -Math.PI * 0.2, Math.PI * 0.3, armgroup, 0);
  //======================Right Arm=========================//
  Input("ShoulderY", 7, 0, Math.PI * 0.5, armgroup, 1);
  Input("ShoulderX", 8, -Math.PI * 0.1, Math.PI * 0.3, armgroup, 1);
  Input("Elbow", 9, 0, Math.PI * 0.5, armgroup, 1);
  Input("Hand", 10, -Math.PI * 0.2, Math.PI * 0.3, armgroup, 1);
  //======================Head=========================//
  NormalInput("HeadX", 5, -Math.PI * 0.3, Math.PI * 0.3, head, "y");
  NormalInput("HeadY", 5, -Math.PI * 0.2, Math.PI * 0.2, head, "x");
  //======================Back=========================//
  NormalInput("Back", 1, 0, Math.PI * 0.5, back, "x");
};

//1
//5head
// 7 8 9 10 right hand
// 31 32 33 34 left hand
// 55 56 57 right leg
// 60 61 62 left leg
