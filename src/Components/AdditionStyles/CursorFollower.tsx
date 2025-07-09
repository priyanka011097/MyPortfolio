import React, { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  time: number;
  hue: number;
}

const CursorFollower: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<TrailPoint[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const MAX_AGE = 100; // Trail lasts 0.8s
    let hue = 0;

    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const handleMouseMove = (e: MouseEvent) => {
      points.current.push({
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
        hue,
      });
      hue = (hue + 2) % 360;
    };

    const animate = () => {
      const now = Date.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const recentPoints = points.current.filter((p) => now - p.time < MAX_AGE);
      points.current = recentPoints;

      if (recentPoints.length > 1) {
        ctx.beginPath();
        ctx.moveTo(recentPoints[0].x, recentPoints[0].y);

        for (let i = 1; i < recentPoints.length - 1; i++) {
          const p1 = recentPoints[i];
          const p2 = recentPoints[i + 1];
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;

          const age = now - p2.time;
          const alpha = 1 - age / MAX_AGE;

          ctx.strokeStyle = `hsla(${p2.hue}, 70%, 70%, ${Math.min(
            1,
            alpha * 1.5
          )})`;
          ctx.shadowColor = `hsla(${p2.hue}, 100%, 70%, ${Math.min(
            1,
            alpha * 2
          )})`;
          ctx.lineWidth = 3;
          ctx.shadowBlur = 55;

          ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
        }

        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
};

export default CursorFollower;
