$method1=document.getElementById("calc_impedance")
$method2=document.getElementById("calc_dimensions")
$form=document.querySelector(".form")
$results=document.querySelector(".results")
$result=document.querySelector(".result")
$image=document.querySelector(".image")
//David M posar
const array = [{
    name:'silver',
    mr:1,
    c:0
},{
    name:'gold',
    mr:1,
    c:0
},{
    name:'aluminium',
    mr:1,
    c:0
},{
    name:'iron',
    mr:200,
    c:0
},{
    name:'nickel',
    mr:100,
    c:0
},{
    name:'brass',
    mr:1,
    c:0
},{
    name:'zinc',
    mr:1,
    c:0
},{
    name:'tungsten',
    mr:1,
    c:0
},{
    name:'copper',
    mr:1,
    c:0
}]
let d=undefined, w=undefined, z=undefined
const mu=4*Math.PI*Math.pow(10,-7), eo=8.85*Math.pow(10,-12)

$method1.addEventListener('click', ()=>{
    $type=document.getElementById("line").value 
    $dielectric=document.getElementById("dielectric").value 
    //disabled()
    if($type=="microstrip"){
        $image.innerHTML = `
        <img src="https://i.ibb.co/mvP5wNw/microstrip.png" alt="microstrip" border="0"> 
        `
        addFieldMicro(1)
        newVariablesMicro(1)
    }else if($type=="coaxiales"){
        $image.innerHTML = `
        <img src="https://i.ibb.co/fvyC3Fr/coaxial.gif" alt="coaxial" border="0">
        `
        addFieldCoax(1)
        newVariablesCoax(1)

    }else if($type=="bifiliar"){
        $image.innerHTML = `
        <img src="https://i.ibb.co/Z6w7H3b/bifilar.png" alt="bifilar" border="0"> 
        `
        addFieldBifi(1)
        newVariablesBifi(1)
    }
    console.log($type)
})
$method2.addEventListener('click', ()=>{
    $type=document.getElementById("line").value 
    //disabled()
    if($type=="microstrip"){
        $image.innerHTML = `
        <img src="https://i.ibb.co/mvP5wNw/microstrip.png" alt="microstrip" border="0"> 
        `
        addFieldMicro(2)
        newVariablesMicro(2)
    }else if($type=="coaxiales"){
        $image.innerHTML = `
        <img src="https://i.ibb.co/fvyC3Fr/coaxial.gif" alt="coaxial" border="0">
        `
        addFieldCoax(2)
        newVariablesCoax(2)
    }else if($type=="bifiliar"){
        $image.innerHTML = `
        <img src="https://i.ibb.co/Z6w7H3b/bifilar.png" alt="bifilar" border="0"> 
        `
        addFieldBifi(2)
        newVariablesBifi(2)
    }
    console.log($type)
})
function disabled(){
    $method2.setAttribute('disabled','disabled')
    $method1.setAttribute('disabled','disabled')
}
function addFieldMicro(m){
    if(m==1){
        $form.innerHTML = `
        <div class="for_impedance">
            <div class="new-input">
                <label for="width">Introduzca el ancho de la pista (w):</label>
                <div class="sep"><input type="text" id="width"><span>cm</span></div>
            </div>
            <div class="new-input">
                <label for="height">Introduzca el ancho del dieléctrico (h):</label>
                <div class="sep"><input type="text" id="height"><span>cm</span></div>
            </div>
        </div>
        <div class="button">
            <button id="resolve">Enviar</button>
        </div>
        `
    }else if(m==2){
        $form.innerHTML = `
        <div class="for_dimensions">
            <label for="caracteristic_impedance">Introduzca la impedancia caracteristica (Z<sub>0</sub>):</label>
            <input type="text" id="caracteristic_impedance">
        </div>
        <div class="button">
            <button id="resolve">Enviar</button>
        </div>
        `
    }
}
function newVariablesMicro(m){
    $w=document.getElementById("width")
    $d=document.getElementById("height")
    $z=document.getElementById("caracteristic_impedance")
    $action=document.getElementById("resolve")
    if(m==1){
        $action.addEventListener('click', ()=>{
            $dielectric=document.getElementById("dielectric").value 
            if($dielectric=='otro'){
                $dielectric=document.getElementById("otro").value
            }
            w = $w.value
            d = $d.value
            let m=1;
            effective_permittivity($dielectric,d,w,z,m)
        })
    }else if(m==2){
        $action.addEventListener('click', ()=>{
            $dielectric=document.getElementById("dielectric").value 
            if($dielectric=='otro'){
                $dielectric=document.getElementById("otro").value
            }
            z = $z.value
            let m=2;
            effective_permittivity($dielectric,d,w,z,m)
        })
    }
}
function effective_permittivity(er, d, w, z, m){
    let ee = ((er + 1)/2) + ((er - 1)/2)*(1/Math.sqrt(1 + 12*(d/w)))
    let a=(z/60)*Math.sqrt((er + 1)/2) + ((er - 1)/(er + 1))*(0.23 + 0.11/er)
    let b=(377*Math.PI)/(2*z*Math.sqrt(er))
    console.log(ee, er, a, b, d, w)
    if(m==1){
        calcImpedanceMicro(ee,w,d)
    }else if(m==2){
        calcDimensionsMicro(er,a,b)
    }
}
function calcImpedanceMicro(ee,w,d){
    if(w/d < 1){
        z=(60/Math.sqrt(ee))*Math.log((8*d)/w + w/4*d)
    }else if(w/d >= 1){
        z=(120*Math.PI)/(Math.sqrt(ee)*(w/d + 1.393 + 0.667*Math.log(w/d + 1.444)))
    }else{
        z="Dimensiones no permitidas."
    }
    $result.innerHTML = `
            <div class="show-results">
                <p>Z<sub>0</sub>=<span>${z.toFixed(2)}</span></p>
            </div>
        `
    console.log(`relacion w/d=  ${w/d}, resultado z0= ${z}`)
}
function calcDimensionsMicro(er,a,b){
    let uno = (8*Math.pow(Math.E, a))/(Math.pow(Math.E, 2*a) - 2)
    let dos = (2/Math.PI)*(b - 1 - Math.log(2*b - 1) + ((er - 1)/(2*er))*(Math.log(b - 1) + 0.39 - (0.61/er)));
    console.log(uno, dos)
    if(uno<2.1){
        $result.innerHTML = `
            <div class="show-results">
                <p>w=<span>(${uno})*d</span></p>
                <p>d=w/<span>(${uno})</span></p>
            </div>
        `
    }else if(dos>=2){
        $result.innerHTML = `
            <div class="show-results">
                <p>w=<span>(${dos})*d</span></p>
                <p>d=w/<span>(${dos})</span></p>
            </div>
        `
    }else{
        $result.innerHTML = `
            <div class="show-results">
                <p>Impedancias no permitida, intente con otros valores o materiales.</p>
            </div>
        `
    }
}
function addFieldBifi(m){
    if(m==1){
        $form.innerHTML = `
        <div class="for_impedance">
            <div class="new-input">
                <label for="dist">Introduzca la distancia entre los conductores (d):</label>
                <div class="sep"><input type="text" id="dist"><span>cm</span></div>
            </div>
            <div class="new-input">
                <label for="radius">Introduzca el radio de los conductores (a):</label>
                <div class="sep"><input type="text" id="radius"><span>cm</span></div>
            </div>
        </div>
        <div class="button">
            <button id="resolve">Enviar</button>
        </div>
        `
    }else if(m==2){
        $form.innerHTML = `
        <div class="for_dimensions">
            <div class="new-input">
                <label for="caracteristic_impedance">Introduzca la impedancia caracteristica (Z<sub>0</sub>):</label>
                <input type="text" id="caracteristic_impedance">
            </div>
        </div>
        <div class="button">
            <button id="resolve2">Enviar</button>
        </div>
        `
    }
}
function newVariablesBifi(m){
    $d=document.getElementById("dist")
    $a=document.getElementById("radius")
    $z=document.getElementById("caracteristic_impedance")
    $action=document.getElementById("resolve")
    $action2=document.getElementById("resolve2")
    if(m==1){
        $action.addEventListener('click', ()=>{
            $dielectric=document.getElementById("dielectric").value 
            if($dielectric=='otro'){
                $dielectric=document.getElementById("otro").value
            }
            d = $d.value
            a = $a.value
            calcImpedanceBifi($dielectric,d,a)
        })
    }else if(m==2){
        $action2.addEventListener('click', ()=>{
            $dielectric=document.getElementById("dielectric").value
            if($dielectric=='otro'){
                $dielectric=document.getElementById("otro").value
            } 
            z = $z.value
            calcDimensionsBifi($dielectric,z)
        })
    }
}
function calcImpedanceBifi(er,d,a){
    $mr=document.getElementById("conductive").value
    array.forEach(element => {
        if($mr==element.name){
            mr=element.mr
        }
    })
    if($mr=='otro'){
        mr=document.getElementById("otroC").value
    }
    m=mr*mu
    l=(m/Math.PI)*Math.log(d/a)
    c=(Math.PI*er*eo)/Math.log(d/a)
    z=Math.sqrt(l/c)
    console.log(`mr= ${mr}, er=${er}, l=${l}, c=${c}, a=${a}, d=${d}, z0=${z}`)
    $result.innerHTML = `
    <div class="show-results">
        <p>Z<sub>0</sub>=<span>${z.toFixed(2)}</span></p>
    </div>
`
}
function calcDimensionsBifi(er,z){
    $mr=document.getElementById("conductive").value
    array.forEach(element => {
        if($mr==element.name){
            mr=element.mr
        }
    })
    if($mr=='otro'){
        mr=document.getElementById("otroC").value
    }
    m=mr*mu
    l=(Math.pow(z,2)*Math.PI*Math.PI*er*eo)
    c=Math.sqrt(l/m)
    ad=Math.pow(Math.E,c)
    console.log(`mr= ${mr}, er=${er}, l=${l}, c=${c}, z0=${z}, d/a=${ad}`)
    $result.innerHTML = `
    <div class="show-results">
        <p>w=<span>(${ad.toFixed(2)})*d</span></p>
        <p>d=w/<span>(${ad.toFixed(2)})</span></p>
    </div>
    `
}
function addFieldCoax(m){
    if(m==1){
        $form.innerHTML = `
        <div class="for_impedance">
            <div class="new-input">
                <label for="radius">Introduzca el radio del conductor (a):</label>
                <div class="sep"><input type="text" id="radius"><span>cm</span></div>
            </div>
            <div class="new-input">
                <label for="radius_dielectric">Introduzca el radio del dieléctrico (d):</label>
                <div class="sep"><input type="text" id="radius_dielectric"><span>cm</span></div>
            </div>
        </div>
        <div class="button">
            <button id="resolve">Enviar</button>
        </div>
        `
    }else if(m==2){
        $form.innerHTML = `
        <div class="for_dimensions">
            <div class="new-input">
                <label for="caracteristic_impedance">Introduzca la impedancia caracteristica (Z<sub>0</sub>):</label>
                <input type="text" id="caracteristic_impedance">
            </div>
        </div>
        <div class="button">
            <button id="resolve2">Enviar</button>
        </div>
        `
    }
}
function newVariablesCoax(m){
    $d=document.getElementById("radius_dielectric")
    $a=document.getElementById("radius")
    $z=document.getElementById("caracteristic_impedance")
    $action=document.getElementById("resolve")
    $action2=document.getElementById("resolve2")
    if(m==1){
        $action.addEventListener('click', ()=>{
            $dielectric=document.getElementById("dielectric").value 
            if($dielectric=='otro'){
                $dielectric=document.getElementById("otro").value
            }
            d = $d.value
            a = $a.value
            calcImpedanceCoax($dielectric,d,a)
        })
    }else if(m==2){
        $action2.addEventListener('click', ()=>{
            $dielectric=document.getElementById("dielectric").value 
            if($dielectric=='otro'){
                $dielectric=document.getElementById("otro").value
            }
            z = $z.value
            calcDimensionsCoax($dielectric,z)
        })
    }
}
function calcImpedanceCoax(er,d,a){
    $mr=document.getElementById("conductive").value
    array.forEach(element => {
        if($mr==element.name){
            mr=element.mr
            console.log(element)
        }
    })
    if($mr=='otro'){
        mr=document.getElementById("otroC").value
    }
    m=mr*mu
    l=(m/2*Math.PI)*Math.log(d/a)
    c=(2*Math.PI*er*eo)/Math.log(d/a)
    z=Math.sqrt(l/c)
    console.log(`mr= ${mr}, er=${er}, l=${l}, c=${c}, a=${a}, d=${d}, z0=${z}`)
    $result.innerHTML = `
    <div class="show-results">
        <p>Z<sub>0</sub>=<span>${z.toFixed(2)}</span></p>
    </div>
`
}
function calcDimensionsCoax(er, z){
    $mr=document.getElementById("conductive").value
    array.forEach(element => {
        if($mr==element.name){
            mr=element.mr
        }
    })
    if($mr=='otro'){
        mr=document.getElementById("otroC").value
    }
    m=mr*mu
    l=(4*Math.pow(z,2)*Math.PI*Math.PI*er*eo)
    c=Math.sqrt(l/m)
    ad=Math.pow(Math.E,c)
    console.log(`mr= ${mr}, er=${er}, l=${l}, c=${c}, z0=${z}, d/a=${ad}`)
    $result.innerHTML = `
    <div class="show-results">
        <p>w=<span>(${ad.toFixed(2)})*d</span></p>
        <p>d=w/<span>(${ad.toFixed(2)})</span></p>
    </div>
    `
}