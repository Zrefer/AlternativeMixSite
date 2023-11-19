import { FC, useEffect, useRef } from "react";
import styles from "./user-icon.module.css";

const UserIcon: FC<{ playerName: string; extraClass?: string }> = ({
  playerName,
  extraClass,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.onload = () => {
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
    };

    image.src = `http://files.mix-servers.com/web/skins/${playerName}.png`;
  }, [playerName]);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.canvas} ${extraClass}`}
    ></canvas>
  );
};
export default UserIcon;
