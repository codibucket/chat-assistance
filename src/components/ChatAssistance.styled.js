import styled from "styled-components";

export const ChatbotToggler = styled.button`
  position: fixed;
  bottom: 30px;
  right: 35px;
  border: none;
  height: 50px;
  width: 50px;
  display: flex;
  cursor: pointer;
  border-radius: 50%;
  background: var(--primary-color);
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  .material-symbols-outlined {
    position: absolute;
    color: #fff;
  }

  &.rotate {
    transform: rotate(90deg);
  }

  & span:last-child {
    opacity: 0;
  }

  &.rotate span:first-child {
    opacity: 0;
  }

  &.rotate span:last-child {
    opacity: 1;
  }
`;

export const Footer = styled.div``;
