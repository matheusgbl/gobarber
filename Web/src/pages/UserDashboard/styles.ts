import styled, { css, keyframes } from 'styled-components';
import { shade } from 'polished';

import ArrowLeftIcon from '../../assets/ArrowLeftIcon.svg';
import ArrowRightIcon from '../../assets/ArrowRightIcon.svg';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-500px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

interface Visible {
  isVisible: boolean;
}

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 100px;
  }

  button {
    position: relative;
    background: transparent;
    border: 0;
    margin-left: auto;

    svg {
      color: #999591;
      height: 20px;
      width: 20px;

      &:hover {
        opacity: 0.8;
        color: #ff9000;
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 160px;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px solid #cecece;
  }

  div {
    display: flex;
    flex-direction: column;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: flex;
      color: #ff9000;
    }

    strong {
      color: #ff9000;
    }
  }

  .random-avatar {
    display: flex;
    padding: 14px 13px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    background: #ff9000;

    span {
      display: flex;
      font-size: 20px;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
  flex-direction: column;

  h2 {
    padding: 10px 20px;
    color: #fff;
  }

  button {
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 0.35rem;
    color: #eee;
    transition: all 0.25s;
    background: transparent;
    border: 1px solid #ff9000;
    transform: translate(0);

    &:after {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background: #ff9000;
      transition: all 1.25s;
      z-index: -1;
      border-radius: 8px;
    }

    &:hover {
      background: none;
    }

    &:hover:after {
      width: 100%;
    }
  }
`;

export const AnimationLeft = styled.div`
  animation: ${appearFromLeft} 2s;
`;

export const AnimationLeft1 = styled.div`
  animation: ${appearFromLeft} 2.5s;
`;

export const AnimationLeft2 = styled.div`
  animation: ${appearFromLeft} 3s;
`;

export const AnimationLeft3 = styled.div`
  animation: ${appearFromLeft} 3.5s;
`;

export const ServiceList = styled.li<Visible>`
  display: none;
  flex-direction: column;
  padding: 10px 20px;

  ${props =>
    props.isVisible &&
    css`
      display: flex;
    `}

  .select {
    margin-bottom: 20px;
  }
`;

export const DateAndHour = styled.div<Visible>`
  flex-wrap: wrap;
  display: none;
  width: 100%;

  h2 {
    width: 100%;
  }

  ${props =>
    props.isVisible &&
    css`
      display: flex;
    `}
`;

export const Hour = styled.div`
  width: 40%;
  margin-top: 20px;
  height: 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  .unavailable {
    background: transparent;
    cursor: not-allowed;
    pointer-events: none;

    &:hover {
      background: none;
    }
  }
  li {
    padding: 10px 20px;
    background: #28262e;
    margin: 10px 0;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    transition: background 0.4s;

    &:hover {
      background: #ff9000;
    }
  }
`;

export const Calendar = styled.aside`
  display: flex;
  width: 380px;
  margin-left: auto;
  margin-bottom: 20px;
  margin-top: -40px;

  .DayPicker {
    border-radius: 0.6rem;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 0.6rem;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    background: url(${ArrowLeftIcon}) no-repeat center;
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-NavButton--next {
    background: url(${ArrowRightIcon}) no-repeat center;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 1rem 0 0 0;
    padding: 16px;
    background-color: #28262e;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1rem;
    padding: 0 1rem;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Weekday {
    color: #666360;
  }

  .DayPicker-Day {
    width: 2.5rem;
    height: 2.5rem;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 0.6rem;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
    color: #fff;
  }

  .DayPicker-Day--disabled {
    color: #666360;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 0.6rem;
    color: #232129 !important;
  }
`;

export const BarberList = styled.div<Visible>`
  display: none;
  margin-top: 10px;
  width: 100%;
  overflow-x: auto;

  ::-webkit-scrollbar {
    background-color: #ccc;
    height: 12px;
    overflow: visible;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #28262e;
    outline: none;
  }

  ::-webkit-scrollbar:vertical {
    display: none;
  }

  ${props =>
    props.isVisible &&
    css`
      display: flex;
    `}
`;
