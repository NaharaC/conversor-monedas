const obtenerInputs = () => {
    const inputCLP = document.getElementById("cantidadCLP").value
    const selectIndicador = document.getElementById("selectIndicador").value
    return [parseFloat(inputCLP), selectIndicador]
}

async function conversor (cantidadCLP, indicador) {
    try {
        const res = await fetch(`https://mindicador.cl/api/${indicador}`)
        const data = await res.json()
        const valorCLP = data.serie[0].valor
        const resultado = cantidadCLP/valorCLP
        return resultado.toFixed(2)
    } catch {
        document.getElementById("result").innerHTML = "Lo siento, estamos teniendo problemas con la página"
    }
}

async function mostrarResultado (resultado) {
    document.getElementById("result").innerHTML = `Resultado: $${resultado}`
}

async function onPressButton () {
    const [valorCantidad, valorIndicador] = obtenerInputs()
    const valorConvertido = await conversor (valorCantidad, valorIndicador)
    mostrarResultado(valorConvertido)
}

const button = document.getElementById("button")
button.addEventListener("click", () => {
    onPressButton()
})

