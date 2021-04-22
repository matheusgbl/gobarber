import styled from 'styled-components';
import { shade } from 'polished';

import ArrowLeftIcon from '../../assets/ArrowLeftIcon.svg';
import ArrowRightIcon from '../../assets/ArrowRightIcon.svg';

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
      text-decoration: none;
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
`;

export const Service = styled.div`
  width: 100%;
  flex: 1;
  padding: 15px 15px;
  background: #28262e;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  cursor: pointer;
  transition: opacity 0.4s;
  margin-bottom: 20px;

  &:hover {
    opacity: 0.8;
  }

  h1 {
    color: #fff;
    align-items: center;
    justify-content: center;
    margin: 0;
    display: flex;

    svg {
      margin-left: auto;
    }
  }
`;

export const ServiceList = styled.li`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  display: none;
`;

export const CalendarSelectDate = styled.div`
  width: 100%;
  flex: 1;
  padding: 15px 15px;
  background: #28262e;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  cursor: pointer;
  transition: opacity 0.4s;
  margin-bottom: 20px;

  &:hover {
    opacity: 0.8;
  }

  h1 {
    color: #fff;
    align-items: center;
    justify-content: center;
    margin: 0;
    display: flex;

    svg {
      margin-left: auto;
    }
  }
`;

export const DateAndHour = styled.div`
  flex-wrap: wrap;
  display: flex;
  width: 100%;
`;

export const Hour = styled.div`
  width: 60%;
  display: none;

  h2 {
    color: #fff;
  }
`;

export const HourList = styled.div`
  display: none;
  ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(7, 2fr);
    margin-left: 15px;
  }
  li {
    padding: 10px 20px;
    background: #28262e;
    margin: 10px auto;
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
  display: none;
  /* display: flex; */
  width: 380px;
  margin-left: auto;
  margin-bottom: 20px;

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

export const Barber = styled.div`
  width: 100%;
  flex: 1;
  padding: 15px 15px;
  background: #28262e;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  cursor: pointer;
  transition: opacity 0.4s;

  &:hover {
    opacity: 0.8;
  }

  h1 {
    color: #fff;
    align-items: center;
    justify-content: center;
    margin: 0;
    display: flex;

    svg {
      margin-left: auto;
    }
  }
`;

export const BarberList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
`;