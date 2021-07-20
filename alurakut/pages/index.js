import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import styled from 'styled-components';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/aluraukutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar(props) {
  console.log('ProfileSideBar', props);
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} />
      <hr />
      <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
        @{props.githubUser}
      </a>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
};

function ProfileRelationsBox(props) {
  console.log('ProfileRelationsBox', props);
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      <ul>
        {props.items.map((item) => {
          return (
            <li key={item.id}>
              <a href={`/users/${item.login}`}>
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

export default function Home(props) {

  const currentUser = props.githubUser;

  console.log('currentUser', currentUser);

  const pessoasFavs = ['juunegreiros', 'omariosouto', 'peas', 'marcobrunodev', 'felipefialho'];

  const [comunidades, setComunidades] = React.useState([]);
  const [amigos, setAmigos] = React.useState([]);

  React.useEffect(() => {
    // Fetch com GET
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

    // POST
    fetch('https://graphql.datocms.com/', {
      method: "POST",
      headers: {
        'Authorization': 'bf095743b447f1da51a3c5e4cf0279',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 'query': 'query { allCommunities { id title imageUrl creatorSlug } }' })
    })
      .then((response) => {
        return (response.json())
      })
      .then((respostaCompleta) => {
        const comunidadesDato = respostaCompleta.data.allCommunities;
        console.log(comunidadesDato);
        setComunidades(comunidadesDato);
      })
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={currentUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={currentUser} />
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
                  title: formData.get('titleComumnity'),
                  imageUrl: formData.get('imageComumnity'),
                  creatorSlug: currentUser,
                }

                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(novaComunidade)
                })
                  .then(async (response) => {
                    const dados = await response.json();
                    console.log(dados.registroCriado);
                    const novaComunidade = dados.registroCriado;
                    const comunidadesAtualizadas = [...comunidades, novaComunidade];
                    setComunidades(comunidadesAtualizadas);
                  })


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
                    <a href={`/communities/${comunidade.id}`}>
                      <img src={comunidade.imageUrl}></img>
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

export async function getServerSideProps(context) {
  const tokenAValidar = nookies.get(context).USER_TOKEN;

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: tokenAValidar
      }
  })
  .then((resposta) => resposta.json())

  console.log(tokenAValidar, isAuthenticated);
  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(tokenAValidar); // githubUser = jwt.decode(tokenAValidar).githubUser;

  return ({
    props: {
      githubUser
    }
  });
}