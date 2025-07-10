import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "./Stack.css";

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number; // not used anymore
}

function CardRotate({ children }: CardRotateProps) {
  return <div className="card-rotate">{children}</div>;
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
  sensitivity = 300,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 100, damping: 18 },
  sendToBackOnClick = false,
  autoShuffle = true,
  autoShuffleDelay = 1000,
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
        perspective: 400,
      }}
    >
      {cards.map((card, index) => (
        <CardRotate
          key={card.id}
          onSendToBack={() => sendToBack(card.id)}
          sensitivity={sensitivity}
        >
          <motion.div drag="y" 
            className="card"
            onClick={() => sendToBackOnClick && sendToBack(card.id)}
            animate={{
              rotateZ: randomRotation ? (Math.random() - 0.5) * 2 : 0,
              scale: 1 + index * 0.02,
              transformOrigin: "center center",
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
      ))}
    </div>
  );
}
