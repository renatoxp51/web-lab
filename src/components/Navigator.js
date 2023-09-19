import styled from "styled-components"

function Navigator(){

const Nav = styled.nav`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #BF4F74;
  color: #BF4F74;
  margin: 0 1em;
  padding: 0.25em 1em;
  display: flex;
  
`

    return(
        <div>
            <Nav>
                <ul >
                    <li>Home</li>
                    <li>Agendar</li>
                    <li>Atualizar</li>
                    <li>Agenda</li>
                </ul>
            </Nav>
        </div>
    )
}

export default Navigator