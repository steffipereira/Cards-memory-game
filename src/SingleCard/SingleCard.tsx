import React from 'react';
import './SingleCard.scss';

export type CardType = {
  src: string
  id: number
  matched?: boolean
}

export type SingleCardProps = CardType & {
  handleClick: (id: number) => void
  flipped?: boolean
}

export const SingleCard = ({ src, id, flipped, handleClick }: SingleCardProps) => {
  return (
    <div className="card" key={id}>
      <div className={flipped ? 'flipped' : 'not-flipped'}>
        <img src="./img/cover.png" className="front" alt="cover-front" onClick={() => handleClick(id)}  />
        <img src={src} className="back" alt="cover-back"  />
      </div>
    </div>
  );
}
