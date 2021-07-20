export default async function RequestReceiver(request, response) {
    console.log(request.method);
    if (request.method === 'GET') {

        fetch('https://api.github.com/users/paes/followers?per_page=6')
            .then((resp) => {
                if (resp.ok)
                    return (resp.json());
                throw new Error(resp.status);
            })
            .then((result) => {
                console.log('result',result);
                response.status(200).json({
                     erro: '',
                })
                return;
            })
            .catch((erro) => {
                console.error(erro)
                return;
            })
    }

    response.status(404).json({
         erro: 'Pagina/Verbo nao encontrado/implementado',
    })
}
