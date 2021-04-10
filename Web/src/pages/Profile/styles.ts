import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 25px;
        height: 25px;

        &:hover {
          width: 28px;
          height: 28px;
          color: #ff9000;
        }
      }
    }
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  align-self: center;

  img {
    width: 185px;
    height: 185px;
    border-radius: 50%;
    border: 2px solid #909090;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #ff9000;
    border: none;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    input {
      display: none;
    }
  }

  svg {
    width: 22px;
    height: 22px;
    color: #312e38;
    transition: transform 1.5s;

    &:hover {
      transform: rotate(360deg);
    }
  }

  .random-avatar {
    display: flex;
    width: 185px;
    height: 185px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    background: #ccc;

    span {
      display: flex;
      font-size: 40px;
      font-weight: bold;
      color: #312e38;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -100px auto 0;

  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
      color: #fff;
    }

    button {
      background: #ff9000;
      height: 56px;
      border-radius: 8px;
      border: 0;
      padding: 0 16px;
      color: #312e38;
      width: 100%;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color 0.5s;

      &:hover {
        background: ${shade(0.2, '#ff9000')};
      }
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.5s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;
