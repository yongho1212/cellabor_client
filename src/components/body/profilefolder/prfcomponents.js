import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  height: 200vh;
  width: 70vw;
  margin: auto;
  grid-template-areas:
    "nav nav nav"
    "sidebar content content"
    "sidebar content content"
    "main main main"
    "footer footer footer";
  // grid-template-rows: 0.2fr 2fr 1.25fr 1.25fr 0.2fr;
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
  
  grid-area: main;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  background-color: #D9D9D9;
  margin: 13px;
  border-radius: 17px;
  width: 95%;
`;
export const SideBar = styled.div`
  background: #D9D9D9;
  grid-area: sidebar;
  padding: 0.25rem;
  display: flex;
  justify-content: center;
  
  margin: 13px;
  border-radius: 17px;
`;
export const ContentBox = styled.div`
  display: flex;
  margin: 5px;
  gap: 0.5rem;
  align-items: center;
  grid-area: content;
  
  @media only screen and (max-width: 600px) {
  flex-direction: column;
  border-radius: 17px;
  }
`;

export const Content1 = styled.div`
  padding: 0.25rem;
  
  background-color: #D9D9D9;
  width: 95%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 17px;
  margin: 11px;
  align-items: center;
  
  
`;
export const Content2 = styled.div`
  background-color: blue;
`;
