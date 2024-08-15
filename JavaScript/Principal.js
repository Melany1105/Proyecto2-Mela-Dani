document.addEventListener('DOMContentLoaded', function () {

    // Manejo del menú
    document.getElementById('menuButton').addEventListener('click', function () {
        document.getElementById('Menu').classList.toggle('open');
    });

    document.getElementById('closeButton').addEventListener('click', function () {
        document.getElementById('Menu').classList.remove('open');
    });

    // Manejo del texto animado
    const animatedText = document.querySelector('.animated-text');

    function handleScroll() {
        const rect = animatedText.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (isVisible) {
            animatedText.classList.add('show');
        } else {
            animatedText.classList.remove('show');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecuta la función al cargar la página

    // Configuración del gráfico
    var chartDom = document.getElementById('graficoCircular');
    var myChart = echarts.init(chartDom);

    // Datos de la variable JavaScript
    const data = {
        "categories": ["Nike", "Adidas", "Puma"],
        "percentages": [70, 20, 10]
    };

    // Adaptar los datos al tipo de gráfico
    let pieData = data.categories.map((category, index) => {
        return { value: data.percentages[index], name: category };
    });

    // Opción para el gráfico
    var option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Brands',
                type: 'pie',
                radius: ['40%', '70%'], // ['radio interno', 'radio externo']
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: 'outside'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: pieData // Usa los datos adaptados
            }
        ]
    };

    myChart.setOption(option);

    // Función para hacer que el gráfico sea responsivo
    window.addEventListener('resize', function () {
        myChart.resize();
    });

});
