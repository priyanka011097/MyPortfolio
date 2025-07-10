import { motion, useMotionValue } from "framer-motion";
import { useState, useEffect } from "react";
import "./Stack.css";

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  sendToBackOnClick?: boolean;
  cardsData?: { id: number; img: string }[];
  animationConfig?: { stiffness: number; damping: number };
  autoShuffle?: boolean;
  autoShuffleDelay?: number;
}

export default function Stack({
  randomRotation = false,
  sensitivity = 500,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 20, damping: 120 },
  sendToBackOnClick = false,
  autoShuffle = true,
  autoShuffleDelay = 2000,
}: StackProps) {
  const [cards, setCards] = useState(
    cardsData.length
      ? cardsData
      : [
          {
            id: 1,
            img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
          },
          {
            id: 2,
            img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
          },
          {
            id: 3,
            img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
          },
          {
            id: 4,
            img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
          },
          {
            id: 5,
            img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
          },
          {
            id: 6,
            img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
          },
          {
            id: 7,
            img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
          },
          {
            id: 8,
            img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
          },
        ]
  );

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  // 🔁 Auto Shuffle Logic
  useEffect(() => {
    if (!autoShuffle) return;

    const interval = setInterval(() => {
      setCards((prev) => {
        if (prev.length === 0) return prev;
        const newCards = [...prev];
        const lastCard = newCards.pop();
        if (lastCard) newCards.unshift(lastCard);
        return newCards;
      });
    }, autoShuffleDelay);

    return () => clearInterval(interval);
  }, [autoShuffle, autoShuffleDelay]);

  return (
    <div
      className="stack-container"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 200,
      }}
    >
      {cards.map((card, index) => {
        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              className="card"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: randomRotation ? (Math.random() - 0.5) * 2 : 0,
                scale: 1 + index * 0.02,
                transformOrigin: "110% 60%",
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
              }}
            >
              <img
                src={card.img}
                alt={`card-${card.id}`}
                className="card-image"
              />
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
