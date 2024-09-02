let prev = document.getElementById('prev');
prev.addEventListener('submit', function(event){
    event.preventDefault();

    let filme = document.getElementById('filme').value;

    const apiKey = '60d43bf0a5ce4c5619e56aaaefa43893';
    const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(filme)}`;

    fetch(searchURL)
        .then(response => response.json())
        .then(dados_filme => {
            if (dados_filme.results && dados_filme.results.length > 0) {
                const movieId = dados_filme.results[0].id;
                const detailsURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`;

                return fetch(detailsURL);
            } else {
                throw new Error("Filme não encontrado!");
            }
        })
        .then(response => response.json())
        .then(detalhes_filme => {
            document.getElementById('nome_filme').textContent = `Filme: ${detalhes_filme.title}`;
            document.getElementById('genero').textContent = `Gênero: ${detalhes_filme.genres.map(genre => genre.name).join(', ')}`;
            document.getElementById('duracao').textContent = `Duração: ${detalhes_filme.runtime} minutos`;
            document.getElementById('data_de_lancamento').textContent = `Data de Lançamento: ${detalhes_filme.release_date}`;
            document.getElementById('sinopse').textContent = `Sinopse: ${detalhes_filme.overview}`;
            const diretor = detalhes_filme.credits.crew.find(person => person.job === 'Director');
            document.getElementById('direcao').textContent = `Direção: ${diretor ? diretor.name : 'Não disponível'}`;
            document.getElementById('capa').innerHTML = `<img src="https://image.tmdb.org/t/p/w500${detalhes_filme.poster_path}" style= "width: 250px; height:350px;" alt="Capa do filme ${detalhes_filme.title}"/>`;
        })
        .catch(error => {
            alert("Erro de rede" +error);
        });
});

