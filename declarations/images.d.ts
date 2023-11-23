declare module "*.jpg" {
  const value: string; // Или можно использовать тип 'any', если вы не знаете точный тип изображения
  export default value;
}
declare module "*.jpg" {
  const value: string; // Или можно использовать тип 'any', если вы не знаете точный тип изображения
  export default value;
}
declare module "*.png" {
  const value: string; // Или можно использовать тип 'any', если вы не знаете точный тип изображения
  export default value;
}

declare module "*.svg" {
  import React = require("react");
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
