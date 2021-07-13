import styled from 'styled-components'

const MainGrid = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 16px;

  .profileArea {
    display: none;
    @media(min-width: 860px) {
      display:block;
    }
  }
  @media(min-width: 860px) {
    max-width: 1110px;
    display: grid;
    grid-template-columns: 160px 1fr 312px;
    grid-template-areas: "profileArea welcomeArea profileRelationsArea";

  }
`;

export default MainGrid;