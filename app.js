$method1=document.getElementById("calc_impedance")
$method2=document.getElementById("calc_dimensions")
$form=document.querySelector(".form")
$results=document.querySelector(".results")
//David M posar
const er_fr4=4.2, er_f_vidrio=4.7, er_pvc=4, er_duroid=2.2, er_mylar=3.2, er_polL=2.26, er_polR=2.56
let d=undefined, w=undefined, z=undefined

$method1.addEventListener('click', ()=>{
    $type=document.getElementById("line").value 
    disabled()
    addField(1)
    newVariables(1)
    console.log($type)
})
$method2.addEventListener('click', ()=>{
    $type=document.getElementById("line").value 
    disabled()
    addField(2)
    newVariables(2)
    console.log($type)
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
            <label for="caracteristic_impedance">Introduzca la impedancia caracteristica:</label>
            <input type="text" id="caracteristic_impedance">
        </div>
        <div class="button">
            <button id="resolve2">Enviar</button>
        </div>
        `
    }
}
function newVariables(m){
    $w=document.getElementById("width")
    $d=document.getElementById("height")
    $z=document.getElementById("caracteristic_impedance")
    $action=document.getElementById("resolve")
    $action2=document.getElementById("resolve2")
    if(m==1){
        $action.addEventListener('click', ()=>{
            w = $w.value
            d = $d.value
            let m=1;
            effective_permittivity(2.3,d,w,z,m)
        })
    }else if(m==2){
        $action2.addEventListener('click', ()=>{
            z = $z.value
            let m=2;
            effective_permittivity(2.3,d,w,z,m)
        })
    }
}
function effective_permittivity(er, d, w, z, m){
    let ee = ((er + 1)/2) + ((er - 1)/2)*(1/Math.sqrt(1 + 12*(d/w)))
    let a=(z/60)*Math.sqrt((er + 1)/2) + ((er - 1)/(er + 1))*(0.23 + 0.11/er)
    let b=(377*Math.PI)/(2*z*Math.sqrt(er))
    console.log(ee, er, a, b)
    if(m==1){
        calc_impedance(ee,w,d)
    }else if(m==2){
        calc_dimensions(er,a,b)
    }
}
function calc_impedance(ee,w,d){
    if(w/d < 1){
        z=(60/Math.sqrt(ee))*Math.log((8*d)/w + w/4*d)
    }else if(w/d >= 1){
        z=(120*Math.PI)/(Math.sqrt(ee)*(w/d + 1.393 + 0.667*Math.log(w/d + 1.444)))
    }
    $results.innerHTML = `
            <div class="show-results">
                <p>Z<sub>0</sub>=<span>${z}</span></p>
            </div>
        `
    console.log(`Resultado z0= ${w/d}${z}`)
}
function calc_dimensions(er,a,b){
    let uno = (8*Math.pow(Math.E, a))/(Math.pow(Math.E, 2*a) - 2)
    let dos = (2/Math.PI)*(b - 1 - Math.log(2*b - 1) + ((er - 1)/(2*er))*(Math.log(b - 1) + 0.39 - (0.61/er)));
    if(uno<2){
        $results.innerHTML = `
            <div class="show-results">
                <p>w=<span>(${uno})d</span></p>
                <p>d=w/<span>(${uno})</span></p>
            </div>
        `
    }else if(dos>=2){
        $results.innerHTML = `
            <div class="show-results">
                <p>w=<span>(${dos})*d</span></p>
                <p>d=w/<span>(${dos})</span></p>
            </div>
        `
    }
}