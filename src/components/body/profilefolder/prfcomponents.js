import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  margin: auto;
  grid-template-areas:
    "nav nav nav"
    "sidebar content content"
    "sidebar content content"
    "sidebar main main"
    "footer footer footer";
  grid-template-rows: 0.2fr 2fr 1.25fr 1.25fr 0.2fr;
  grid-template-columns: 0.8fr 1.2fr 0.8fr;
  

  @media only screen and (max-width: 850px) {
    width: 100%;
    min-width: 300px;
    /* width: 100%; */
    grid-template-areas:
      "nav"
      "sidebar"
      "main"
      "content"
      "content"
      "footer";
    grid-template-rows: 0.2fr 4fr 3fr 1.25fr 5fr 0.2fr;
    grid-template-columns: 1fr;
  }
  text-align: center;
  gap: 10px;
`;

export const Main = styled.div`
  color: white;
  grid-area: main;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
  margin: 5px
`;
export const SideBar = styled.div`
  background: #9aaab7;
  grid-area: sidebar;
  padding: 0.25rem;
  display: flex;
  justify-content: center;
  // align-items: center;
  margin: 5px;
`;
export const ContentBox = styled.div`
  display: flex;
  margin: 5px;
  gap: 0.5rem;
  align-items: center;
  grid-area: content;
  justify-content: space-around;
  @media only screen and (max-width: 600px) {
  flex-direction: column;
  }
`;

export const Content1 = styled.div`
  padding: 0.25rem;
  overflow-x: hidden;
  background-color: red;
  width: 100%;
  height: 100%;
  margin: 5px;
  justify-content: center;
  align-items: center;
  
`;
export const Content2 = styled.div`
  background-color: blue;
`;
