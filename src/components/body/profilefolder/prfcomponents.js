import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  
  height: 100%;
  width: 70vw;
  margin: auto;
  
  grid-template-areas:
    "nav nav nav"
    "sidebar content content"
    "sidebar content content"
    "main main main"
    "footer footer footer";
  grid-template-rows: 0fr 0.5fr 0.5fr 1.5fr 0fr;
  grid-template-columns: 0.8fr 1.2fr 0.8fr;
  text-align: center;
  gap: 30px;

  @media only screen and (max-width: 700px) {
    width: 70vw;
    min-width: 300px;
    
    grid-template-areas:
      "nav"
      "sidebar"
      "content"
      "content"
      "main"
      "footer";
    grid-template-rows: 0.2fr 4fr 3fr 1.25fr 5fr 0.2fr;
    grid-template-columns: 1fr;
  }
  
`;

export const Main = styled.div`
  height: 100%;
  grid-area: main;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  // background-color: #000;
  // margin: 13px;
  border-radius: 17px;
  border: 2px solid #193c46;
  width: 96.5%;
`;
export const SideBar = styled.div`
  
  display: flex;
  // background: #ff7;
  grid-area: sidebar;
  padding: 0.25rem;
  
  justify-content: center;
  
  // margin: 13px;
  border-radius: 17px;
  border: 2px solid #193c46;
`;
export const ContentBox = styled.div`
  display: flex;
  // margin: 13px
  // gap: 0.5rem;
  align-items: center;
  justify-content: center;
  grid-area: content;
  // background-color: #22d;
  border-radius: 17px;
  border: 2px solid #193c46;

  @media only screen and (max-width: 600px) {
  flex-direction: column;
  border-radius: 17px;
  }
`;

export const Content1 = styled.div`
  padding: 0.25rem;
  
  // background-color: #D9D9D9;
  width: 95%;
  
  justify-content: center;
  align-items: center;
  
  
  align-items: center;
  
  
`;
export const Content2 = styled.div`
  background-color: blue;
`;
