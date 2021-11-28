$tipe=document.getElementById("line").value 
$method1=document.getElementById("calc_impedance")
$method2=document.getElementById("calc_dimensions")
$form=document.querySelector(".form")
//David M posar
const er_fr4=4.2, er_f_vidrio=4.7, er_pvc=4, er_duroid=2.2, er_mylar=3.2, er_polL=2.26, er_polR=2.56
let d, w

$method1.addEventListener('click', ()=>{
    disabled()
    addField(1)
    newVariables()

})
$method2.addEventListener('click', ()=>{
    disabled()
    addField(2)
    newVariables()
})
function disabled(){
    $method2.setAttribute('disabled','disabled')
    $method1.setAttribute('disabled','disabled')
}
function addField(m){
    if(m==1){
        $form.innerHTML = `
        <div class="for_impedance">
            <label for="width">Introduzca el ancho de la pista:</label>
            <input type="text" id="width">
            <label for="height">Introduzca el ancho del dieléctrico:</label>
            <input type="text" id="height">
        </div>
        <div class="button">
            <button id="resolve">Enviar</button>
        </div>
        `
    }else if(m==2){
        $form.innerHTML = `
        <div class="for_dimensions">
            <label for="caracteristic_impedance">Introduzca el ancho de la pista:</label>
            <input type="text" id="caracteristic_impedance">
        </div>
        <div class="button">
            <button id="resolve">Enviar</button>
        </div>
        `
    }
}
function newVariables(){
    $w=document.getElementById("width")
    $d=document.getElementById("height")
    $z=document.getElementById("caracteristic_impedance")
    $action=document.getElementById("resolve")
    $action.addEventListener('click', ()=>{
        w = $w.value
        d = $d.value
        effective_permittivity(2.3,d,w)
    })
}
function effective_permittivity(er, d, w){
    let ee = ((er + 1)/2) + ((er - 1)/2)*(1/Math.sqrt(1 + 12*(d/w)))
    console.log(ee, er)
}
effective_permittivity(2.3, 1, 1.5392)
console.log($tipe)