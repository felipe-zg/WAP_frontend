import styled from 'styled-components';

export const GameCardContainer = styled.div`
  perspective: 1000px;
`;

export const Card = styled.div<{ isFlipped: boolean }>`
  position: relative;
  width: 200px;
  height: 350px;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  transform: ${(props) => (props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

export const CardFace = styled.div`
  position: absolute;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
  justify-content: space-between;
`;

export const FrontFace = styled(CardFace)`
  z-index: 1;
`;

export const BackFace = styled(CardFace)`
  background-color: #ffcc00;
  opacity: 0.8;
  padding: 8px;
  transform: rotateY(180deg);
`;

export const GameImage = styled.img`
  width: 200px;
  height: 250px;
`;

export const GameTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 0 10px;
  color: #222;
`;

export const GamePrice = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 0 10px;
  color: #ffcc00;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #ffcc00;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #c00;
  }
`;