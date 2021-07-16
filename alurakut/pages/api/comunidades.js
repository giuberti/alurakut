import { SiteClient } from 'datocms-client'

export default async function RequestReceiver (request, response) {
    if (request.method === 'POST') {
        const TOKEN = "5cc78f48fb8f25296db65f68e1b04e";
        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.item.create({
            itemType: "968417",     // ID do Modelo criado no Dato
            ...request.body,
//            title: 'Fluminense caiu',
  //          imageUrl: 'https://www.lance.com.br/galerias/wp-content/uploads/2020/09/1-656x474.jpeg',
    //        creatorSlug: 'giuberti'
        });
    
        response.status(200).json({
            registroCriado: registroCriado
        })
        return;
    }

    response.status(404).json({
        registroCriado: registroCriado
    })
}