import { SiteClient } from 'datocms-client'

export default async function RequestReceiver(request, response) {
    if (request.method === 'POST') {
        const TOKEN = "5cc78f48fb8f25296db65f68e1b04e";
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.item.create({
            itemType: "968417",     // ID do Modelo criado no Dato
            ...request.body,
        });

        response.status(200).json({
            erro: '',
            novaComunidade: registroCriado,
            comunidades: [],
        })
        return;
    }
    
    // if (request.method === 'GET') {
    //      fetch('https://graphql.datocms.com/', {
    //         method: "POST",
    //         headers: {
    //             'Authorization': 'bf095743b447f1da51a3c5e4cf0279',
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //         },
    //         body: JSON.stringify({ 'query': 'query { allCommunities { id title imageUrl creatorSlug } }' })
    //     })
    //     .then((response) => {
    //         return (response.json())
    //       })
    //     .then((respostaCompleta) => {
    //         console.log('respostaCompleta', respostaCompleta.json())
    //         response.status(200).json({
    //             erro: '',
    //             registroCriado: {},
    //             comunidades: respostaCompleta.data.allCommunities
    //         });
    //     })

    //     return;
    // }


    response.status(404).json({
        erro: 'Pagina/Verbo nao encontrado/implementado',
        registroCriado: {},
        comunidades: []
    })
}