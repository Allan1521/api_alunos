document.querySelector('.busca').addEventListener('submit', async (event) => {
    //async ativa requisiçôes asicronas
    //impede a ação do formulário que será recarregar a página
    event.preventDefault();
    let input = document.querySelector('#searchInput').value;
    //se input for diferente de vazio !== '' ele valida a busca
    if (input !== '') {
        clearInfo();
        /* Requisições */
        showWarning('carregando...')
        //fetch - busca informações e await fica aguradando resposta, espera pelo "promess" uma promessa ou seja uma resposta. Se ocorrer tudo bem ele trás as informações/dados senão ele trás um erro que pode ser tratado. 
        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&units=metric&lang=pt_br&appid=354632c34635955d17ec73ae38783de0
        `);
        let json = await results.json();



        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg

            });
        } else {
            clearInfo();
            showWarning('Cidade não encontrada')
        }

    }else{
        clearInfo;
    }
    //console.log(json);
    //console.log(encondeURI(input))
})

function showInfo(json) {
    //Retirando a mensagem da tela antes de exibir os resultados
    showWarning('');

    //alterando o display do elemento .aviso para que ele seja exibido na tela
    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;

    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`

    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`

    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}.png`)
 console.log(json.tempIcon)
}
function showWarning(msg) {
    // usamos .innerHTML para passar uma mensagem dentro do html 
    document.querySelector('.aviso').innerHTML = msg;
}
function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}