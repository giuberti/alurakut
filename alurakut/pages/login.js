import React from 'react';
// webHook do ReactJS
import {useRouter} from 'next/router'
import nookies from 'nookies'

export default function LoginPage() {

    const router = useRouter();
    const [githubUser, setGithubUser] = React.useState([]);

    return (
        <main>
            <div className="loginScreen">
                <section className="logoArea">
                    <img src="https://alurakut.vercel.app/logo.svg" />
                    <p><strong>Aprenda</strong> assim como eu!</p>
                    <p><strong>Aprenda</strong> assim como eu!</p>
                    <p><strong>Aprenda</strong> assim como eu!</p>
                </section>
                <section className="formArea">
                    <form className="box" onSubmit={(infosDoEvento) => {
                            infosDoEvento.preventDefault();
                            console.log("usuario a logar", githubUser)
                            fetch('https://alurakut.vercel.app/api/login', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ githubUser: githubUser}),
                            })
                            .then(async (respostaDoServer) => {
                                const dadosResposta = await respostaDoServer.json();
                                console.log(dadosResposta.token);
                                nookies.set(null, 'USER_TOKEN', dadosResposta.token, {
                                    path: '/',
                                    maxAge: 86400*7,    // 1 semana
                                });
                                router.push('/');
                            })

                        }}>
                        <p>
                            Acesse com seu usuario do <strong>GitHub</strong><br/>
                            {githubUser.length === 0
                                    ? 'Preencha o campo!'
                                    : ''
                            }
                        </p>
                        <input
                            type="text" 
                            placeholder="Usuário"
                            name='loginUser'
                            value={githubUser}
                            onChange={(infosDoEvento) => {
                                console.log(infosDoEvento.target.value);
                                setGithubUser(infosDoEvento.target.value);
                            }}
                        ></input>
                        <button type="submit">
                            Login
                        </button>
                    </form>
                    <footer className="box">
                    <p>
                    Ainda não é membro? <br />
                    <a href="/login">
                        <strong>
                        ENTRAR JÁ
                    </strong>
                    </a>
                    </p>
                </footer>
                </section>
                <footer className="footerArea">
                    <p>© 2021 alura.com.br - Projeto de Estudo em ReactJS e NextJS</p>
                </footer>
            </div>
        </main>
    )
}