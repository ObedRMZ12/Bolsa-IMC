// Capturar el formulario
const form = document.getElementById('imcForm');
const resultSection = document.getElementById('resultSection');

// Elementos del resultado
const userName = document.getElementById('userName');
const imcValue = document.getElementById('imcValue');
const imcClassification = document.getElementById('imcClassification');
const imcRecommendation = document.getElementById('imcRecommendation');

// Evento al enviar el formulario
form.addEventListener('submit', function(e) {
    e.preventDefault();
    calcularIMC();
});

// Función para calcular el IMC
function calcularIMC() {
    // Capturar los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    // Validar que los datos sean correctos
    if (!nombre || isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        alert('Por favor, ingresa datos válidos');
        return;
    }

    // Calcular el IMC usando la fórmula: IMC = peso / altura²
    const imc = peso / (altura * altura);
    const imcRedondeado = imc.toFixed(2);

    // Clasificar el resultado
    let clasificacion = '';
    let recomendacion = '';
    let claseCSS = '';

    if (imc < 18.5) {
        clasificacion = 'Peso Bajo';
        claseCSS = 'bajo';
        recomendacion = 'Tu IMC indica un peso por debajo del rango saludable. Te recomendamos consultar con un nutricionista para desarrollar un plan alimenticio que te ayude a alcanzar un peso saludable de manera segura. Considera incluir más calorías nutritivas en tu dieta y realizar ejercicio para ganar masa muscular.';
    } else if (imc >= 18.5 && imc <= 24.9) {
        clasificacion = 'Peso Normal';
        claseCSS = 'normal';
        recomendacion = '¡Excelente! Tu IMC está dentro del rango saludable. Mantén tus buenos hábitos alimenticios y continúa realizando actividad física regular. Una dieta equilibrada y ejercicio moderado te ayudarán a mantener tu peso ideal y buena salud.';
    } else {
        clasificacion = 'Sobrepeso';
        claseCSS = 'sobrepeso';
        recomendacion = 'Tu IMC indica sobrepeso. Te recomendamos adoptar una dieta balanceada reduciendo el consumo de grasas saturadas y azúcares, e incrementar la actividad física. Considera caminar 30 minutos diarios y consultar con un profesional de la salud para un plan personalizado.';
    }

    // Mostrar los resultados
    userName.textContent = `Hola, ${nombre}`;
    imcValue.textContent = imcRedondeado;
    imcClassification.textContent = clasificacion;
    imcClassification.className = `imc-classification ${claseCSS}`;
    imcRecommendation.textContent = recomendacion;

    // Mostrar la sección de resultados con animación
    resultSection.classList.add('show');

    // Hacer scroll suave hacia los resultados
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Permitir calcular con Enter en los inputs
const inputs = document.querySelectorAll('input');
inputs.forEach((input, index) => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            } else {
                form.dispatchEvent(new Event('submit'));
            }
        }
    });
});