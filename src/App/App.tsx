import React, { useState, useEffect } from 'react';
import './App.scss';
import { data } from '../data'
import { SingleCard, SingleCardProps, CardType } from '../SingleCard'

type SelectedCardType = Pick<SingleCardProps, 'id' | 'src' | 'flipped'>

export const App = () => {
  const [cards, setCards] = useState<CardType[]>([])
  const [selectedCard, setSelectedCard] = useState<SelectedCardType[]>([])
  const [disableCard, setDisableCard] = useState<boolean>(false)

  const handleShuffle = () => {
    const shuffledCards = [...data, ...data].sort(() => Math.random() - 0.5).map((cards, index) => ({ ...cards, id: index+1}))
    setCards(shuffledCards)
  }

  const handleClick = (id: number) => {
    if (!disableCard) {
      const filteredCard = cards.filter(card => card.id === id).map(card => ({ ...card, matched: true }))
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.id === filteredCard[0]?.id) {
            return { ...card, matched: true }
          }
          return card
        })
      })
      setSelectedCard(prev => {
        if (prev) {
          return [...prev, filteredCard].flat()
        }
        return filteredCard
      })
    }
  }

  useEffect(() => {
    const comparingCards = () => {
      if (selectedCard && selectedCard.length === 2) {
        setDisableCard(true)
        if (selectedCard[0].src === selectedCard[1].src) {
          console.log('matched')
          setDisableCard(false)
          setSelectedCard([])
        } else {
          console.log('not matched')
          setTimeout(() => {
            setCards(prevCards => {
              return prevCards.map(card => {
                if (card.src === selectedCard[0].src || card.src === selectedCard[1].src) {
                  return { ...card, matched: false }
                }
                return card
              })
            })
            setDisableCard(false)
          }, 800);
          setSelectedCard([])
        }
      }
    }
    comparingCards()
  }, [selectedCard, cards])
  return (
    <div className="App">
      <h2>Memory Game App</h2>
      <button onClick={handleShuffle}>New game</button>
      <div className="cards-grid">
        {cards?.map(card => (
          <SingleCard
            key={card.id}
            {...card}
            handleClick={handleClick}
            flipped={card.matched}
          />
        ))}
      </div>
    </div>
  );
}
