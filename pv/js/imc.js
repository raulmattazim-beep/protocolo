$("#calculate").click(function (e) {

    const kilos = parseFloat(document.getElementById('kilos').value);
    const altura = parseFloat(document.getElementById('altura').value.replace(",", ""));

    if (document.getElementById("kilos").value.length == 0 || document.getElementById("altura").value.length == 0) {
        alert("empty")
    } else {
        const imc = calcularIMC(kilos, altura);
        const ideal = calcularPesoIdeal(kilos, altura);

        verificarIMC(imc, ideal);
    }

});



function calcularIMC(kilos, altura) {
    altura = altura / 100;
    return (kilos / (altura * altura));
}

function calcularPesoIdeal(kilos, altura) {
    var ideal = 52 + (0.67 * (altura - 152.4));
    var ajustado = ((kilos - ideal) * 0.25) + ideal;

    const arrayResult = [ideal, ajustado]
    return arrayResult;
}


function verificarIMC(imc, ideal, pesoPerser) {
    if (imc < 18.49) {
        resultadoIMC(
            imc, 
            "ABAIXO DO PESO!", 
            ideal, 
            'Você está abaixo do peso, é importante seguir uma rotina adequada para melhorar.', 
            '',
            'normal.png', 
            'https://www.youtube.com/embed/'
        )
    } else if (imc >= 18.5 && imc <= 24.99) {
        resultadoIMC(
            imc, 
            "QUADRO ADEQUADO!", 
            ideal, 
            'Seu quadro é adequado, porém, é importante que você tenha uma rotina adequada.', 
            '',
            'normal.png',  
            'https://www.youtube.com/embed/'
        )
    } else if (imc >= 25 && imc <= 29.99) {
        resultadoIMC(
            imc, 
            "SOBREPESO", 
            ideal, 
            'Seu quadro é de alerta para a evolução rápida para a obesidade.', 
            'Você precisa perder' + pesoPerser + 'kg',
            'sobrepeso.png', 
            'https://www.youtube.com/embed/'
        )
    } else if (imc >= 30 && imc <= 34.99) {
        resultadoIMC(
            imc, 
            "OBESIDADE GRAU 1!", 
            ideal, 
            'Seu quadro é extremamente perigoso, sua saúde pode estar em risco.', 
            'Você precisa perder' + pesoPerser + 'kg',
            'obesidade-grau-1.png', 
            'https://www.youtube.com/embed/')
    } else {
        resultadoIMC(
            imc, 
            "OBESIDADE GRAU 2!",
            ideal, 
            'Seu quadro é realmente drástico para sua saúde, busque orientação médica.', 
            'Você precisa perder' + pesoPerser + 'kg',
            'obesidade-grau-2.png', 
            'https://www.youtube.com/embed/'
        )
    }
}


function liberarBotao() {
    $('#kilos,#altura').on('keyup', function () {
        var kilos = $("#kilos").val();
        var altura = $("#altura").val().replace(",", "");
        if (kilos != '' && altura != '' && kilos >= 50 && altura >= 100) {
            $('#calculate').attr('disabled', false);
        } else {
            $('#calculate').attr('disabled', true);
        }
    });
}

function resultadoIMC(imc, faixa, ideal, descricao, pesoPerser, image, video) {
    imc = parseFloat(imc).toFixed(2);
    faixa = faixa;
    pesoIdeal = parseFloat(ideal[0]).toFixed(2);
    pesoIdealAjustado = parseFloat(ideal[1]).toFixed(2);
    pesoPerser = parseFloat(kilos - pesoIdealAjustado).toFixed(2);
    image = 'https://virada2023.com/imc-att/novo-emagrecimentoo/assets/' + image;

    console.log(
        'Imagem:' + image + '\n' +
        'IMC: ' + imc + "\n" + 
        'Faixa: ' + faixa + '\n' + 
        'Peso Ideal: ' + pesoIdeal + '\n' + 
        'Peso Ajustado: ' + pesoIdealAjustado + '\n' +
        'Descrição: ' + descricao + '\n'
    );

    $("#avaliacao").hide();
    $("#resultado").show();

    // Daqui para baixo mostra o resultado
    $("#resultado_titulo").text(faixa);
    // $("#resultado_imagem").attr("src", image);
    $("#video iframe").attr('src', video);
    // $("#resultado_descricao").text(descricao);

    $(".imc").text(imc);
    $(".pesoIdealAjustado").text(pesoIdealAjustado + ' kg');
    $(".attimage").attr("src", image);
    $(".descricao").text(descricao);
    
    if(imc >= 24.99) {
        $(".perder").text('Você precisa perder ' + pesoPerser + 'kg.');
        // console.log('maior que 25:' + imc);
    }

    if(imc >= 24.99) {
        $(".pesopraperder").text(pesoPerser + 'kg');
        // console.log('maior que 25:' + imc);
    }


    $(".tempo").text('1 a 2 Meses');

}