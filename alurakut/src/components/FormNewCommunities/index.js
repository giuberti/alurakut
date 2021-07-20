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