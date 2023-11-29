import { FC, useLayoutEffect, useRef } from "react";

import SteveSkin from "../../../public/images/steve-skin.png";
import { loadImage } from "../../utils/utils";
import styles from "./user-icon.module.css";

const UserIcon: FC<{ playerName: string; extraClass?: string }> = ({
  playerName,
  extraClass,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    loadImage(`http://files.mix-servers.com/web/skins/${playerName}.png`, {
      altSrc: SteveSkin,
    })
      .then((image) => {
        if (!image) return;

        const headSize = image.width / 8;

        const scaleX = canvas.width / headSize;
        const scaleY = canvas.height / headSize;
        ctx.drawImage(
          image,
          headSize,
          headSize,
          headSize,
          headSize,
          0,
          0,
          headSize * scaleX,
          headSize * scaleY
        );
      })
      .catch();
  }, [playerName]);

  return (
    <canvas ref={canvasRef} className={`${styles.canvas} ${extraClass}`} />
  );
};
export default UserIcon;
