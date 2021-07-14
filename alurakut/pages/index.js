import React from 'react';
import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/aluraukutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar(props) {
  console.log(props);
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.gitHubUser}.png`} />
      <hr />
      <a className="boxLink" href={`https://github.com/${props.gitHubUser}`}>
        @{props.gitHubUser}
      </a>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
};

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      <ul>
      {props.items.map((item) => {
        return (
          <li key={item.id}>
            <a href={`/users/${item.title}`}>
              <img className="lgpd" src={item.avatar_url}></img>
              <span>{item.login}</span>
            </a>
          </li>
        )
      })}
    </ul>
    </ProfileRelationsBoxWrapper>
  )
};

export default function Home() {

  const user = 'giuberti';
  const pessoasFavs = ['juunegreiros', 'omariosouto', 'peas', 'marcobrunodev', 'felipefialho'];
  const novaComunidade = {
    id: -1,
    title: 'Odeio acordar cedo',
    image: 'http://placehold.it/300x300',
  }

  const [comunidades, setComunidades] = React.useState([novaComunidade]);

  const [amigos, setAmigos] = React.useState([]);

  React.useEffect(() => {
    fetch('https://api.github.com/users/juunegreiros/followers?per_page=6')
      .then((resp) => {
        if (resp.ok)
          return (resp.json());
        throw new Error(resp.status);
      })
      .then((result) => {
        setAmigos(result)
      })
      .catch((erro) => {
        console.error(erro)
      })
  }, []);

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar gitHubUser={user} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">
              Bem Vindo
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">
              O que você deseja fazer?
            </h2>
            <form onSubmit={
              function handleCriarComunidade(evt) {
                evt.preventDefault();
                console.log(evt)

                const formData = new FormData(evt.target);

                const novaComunidade = {
                  id: new Date().toISOString(),
                  title: formData.get('titleComumnity'),
                  image: formData.get('imageComumnity'),
                }

                const comunidadesAtualizadas = [...comunidades, novaComunidade];
                setComunidades(comunidadesAtualizadas);
                console.log(comunidades);
              }
            }>
              <div>
                <input
                  placeholder="Qual será o nome da sua comunidade?"
                  name="titleComumnity"
                  type="text"
                  aria-label="Qual será o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para ser usada como capa"
                  name="imageComumnity"
                  aria-label="Coloque uma URL para ser usada como capa"
                />
              </div>
              <div>
                <button>
                  Criar Comunidade
                </button>
              </div>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: "profileRelationsArea" }}>
          <ProfileRelationsBox title="Amigos" items={amigos} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((comunidade) => {
                return (
                  <li key={comunidade.id}>
                    <a href={`/users/${comunidade.title}`}>
                      <img src={comunidade.image}></img>
                      <span>{comunidade.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas das Comunidades ({pessoasFavs.length})
            </h2>
            <ul>
              {pessoasFavs.map((pessoa) => {
                return (
                  <li key={pessoa}>
                    <a href={`/users/${pessoa}`}>
                      <img className="lgpd" src={`https://github.com/${pessoa}.png`}></img>
                      <span>{pessoa}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
