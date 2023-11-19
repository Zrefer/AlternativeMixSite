declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.svg" {
  import React = require("react");
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
