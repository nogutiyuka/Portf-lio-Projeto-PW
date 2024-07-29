document.addEventListener('DOMContentLoaded', function () {
    const percForm = document.getElementById('perc');
    const resultDiv = document.getElementById('result');
    const seriesForm = document.getElementById('series-form');
    const seriesResultDiv = document.getElementById('series-result');
    const temperatureForm = document.getElementById('temperature-form');
    const temperatureResultDiv = document.getElementById('temperature-result');
    const bmiForm = document.getElementById('bmi-form');
    const bmiResultDiv = document.getElementById('bmi-result');

    /*Calculo de porcentagem*/
    percForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get the percentage and value from the form inputs
        const percentage = parseFloat(document.getElementById('size').value);
        const value = parseFloat(document.getElementById('value').value);

        // Validate inputs
        if (isNaN(percentage) || isNaN(value) || percentage < 0 || value < 0) {
            resultDiv.textContent = 'Por favor, insira valores válidos.';
            return;
        }

        // calcular a perc do valor
        const result = (percentage / 100) * value;

        // mostrar resultado
        resultDiv.textContent = `O resultado é R$ ${result.toFixed(2)}`;
    });

    /*Busca de series */
    seriesForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const seriesName = document.getElementById('series').value;
        if (!seriesName) return;

        fetchSeries(seriesName);
    });

    async function fetchSeries(seriesName) {
        const url = `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(seriesName)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            displaySeriesInfo(data);
        } catch (error) {
            console.error('Error fetching series:', error);
            seriesResultDiv.innerHTML = '<p>Erro ao buscar série.</p>';
        }
    }

    function displaySeriesInfo(data) {
        if (!data || !data.name) {
            seriesResultDiv.innerHTML = '<p>Série não encontrada.</p>';
            return;
        }

        seriesResultDiv.innerHTML = `
            <h3>${data.name}</h3>
            <p><strong>Gênero:</strong> ${data.genres.join(', ')}</p>
            <p><strong>Lançamento:</strong> ${data.premiered}</p>
            <p><strong>Sinopse:</strong> ${data.summary.replace(/<[^>]*>/g, '')}</p>
            <img src="${data.image ? data.image.medium : 'https://via.placeholder.com/210x295?text=No+Image'}" alt="${data.name}">
        `;
    }
    /*Conversão temperatura */
    temperatureForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const temperature = parseFloat(document.getElementById('temperature').value);
        const fromUnit = document.getElementById('from-unit').value;
        const toUnit = document.getElementById('to-unit').value;

        if (isNaN(temperature) || fromUnit === toUnit) {
            temperatureResultDiv.textContent = 'Por favor, insira valores válidos e selecione diferentes unidades.';
            return;
        }

        const convertedTemperature = convertTemperature(temperature, fromUnit, toUnit);
        temperatureResultDiv.textContent = `A temperatura convertida é ${convertedTemperature.toFixed(2)}° ${toUnit}`;
    });

    function convertTemperature(value, fromUnit, toUnit) {
        if (fromUnit === toUnit) return value;

        if (fromUnit === 'C' && toUnit === 'F') {
            return (value * 9 / 5) + 32;
        } else if (fromUnit === 'F' && toUnit === 'C') {
            return (value - 32) * 5 / 9;
        }

        return value;
    }
    /*Calculo de IMC*/
    bmiForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);

        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            bmiResultDiv.textContent = 'Por favor, insira valores válidos para peso e altura.';
            return;
        }

        const bmi = calculateBMI(weight, height);
        const category = getBMICategory(bmi);

        bmiResultDiv.textContent = `Seu IMC é ${bmi.toFixed(2)} (${category})`;
    });

    function calculateBMI(weight, height) {
        return weight / (height * height);
    }

    function getBMICategory(bmi) {
        if (bmi < 18.5) return 'Abaixo do peso';
        if (bmi < 24.9) return 'Peso normal';
        if (bmi < 29.9) return 'Sobrepeso';
        return 'Obesidade';
    }
});
