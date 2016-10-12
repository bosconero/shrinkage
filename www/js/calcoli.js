function controllo() {
if(document.getElementById('rck').value==''){
alert("WARNING:"+"\n"+"\n"+ "Insert compressive strength") ;
document.getElementById('rck').focus();
} else{
controllo5()}
}
function controllo5(){
var cespo=document.getElementById('classesp').value;
var rck=document.getElementById('rck').value;
if(cespo=='XC1' && rck < 30){
alert("WARNING:"+"\n"+"\n"+ " Compressive strength lower than 30, minimum strength allowed for XC1");
document.getElementById('rck').value='';
document.getElementById('rck').focus();

}else if (cespo=='XC2' && rck < 30){
alert("WARNING:"+"\n"+"\n"+ " Compressive strength lower than 30, minimum strength allowed for XC2");
document.getElementById('rck').value='';
document.getElementById('rck').focus();
}else if (cespo=='XC3' && rck < 35) {
alert("WARNING: "+"\n"+"\n"+ "Compressive strength lower than 35, minimum strength allowed for XC3");
document.getElementById('rck').value='';
document.getElementById('rck').focus();
}else if(cespo=='XC4' && rck < 40){
alert("WARNING:"+"\n"+"\n"+ "Compressive strength lower than 40, minimum strength allowed for XC4");
document.getElementById('rck').value='';
document.getElementById('rck').focus();
}else if(cespo=='XF3' && rck < 30){
alert("WARNING:"+"\n"+"\n"+ "Compressive strength lower than 30, minimum strength allowed for XF3");
document.getElementById('rck').value='';
document.getElementById('rck').focus();
}else if (cespo=='XF4' && rck < 35){
alert("WARNING:"+"\n"+"\n"+ " Compressive strength lower than 35, minimum strength allowed for XF4");
document.getElementById('rck').value='';
document.getElementById('rck').focus();
} 
else {controllo1()

}
}

function controllo1(){
if(document.getElementById('digiucont').value==''){
alert("Insert distance between joints" );
document.getElementById('digiucont').focus();
} else{
controllo2()}
}
function controllo2(){
if(document.getElementById('umidita').value==''){
alert("Insert relative humidity") ;
document.getElementById('umidita').focus();
} else{
controllo3()}
}
function controllo3(){
if(document.getElementById('spesspav').value==''){
alert("Insert floor thickness") ;
document.getElementById('spesspav').focus();
} else{
ritiro()}
}

function ritiro(){
document.getElementById('pinserimento').style.display="none";
document.getElementById('risultati').style.display="block";
var rck=document.getElementById('rck').value;
var distcont=document.getElementById('digiucont').value;
var umrel=document.getElementById('umidita').value;
var spess=document.getElementById('spesspav').value;
var cespo=document.getElementById('classesp').value;
var tgetto=document.getElementById('tipogetto').value;
if(document.getElementById('barriera').checked){
var strato="yes";
}else{
var strato="no";
}


if (tgetto=="direct discharge" && cespo=='XC1'){
var srit=700;}
if (tgetto=="direct discharge" && cespo=='XC2'){
srit=700;}
if (tgetto=="direct discharge" && cespo=='XC3'){
srit=650;}
if (tgetto=="direct discharge" && cespo=='XC4'){
srit=600;}
if (tgetto=="direct discharge" && cespo=='XF3'){
srit=600;}
if (tgetto=="direct discharge" && cespo=='XF4'){
srit=550;}
if (tgetto=="pumping concrete" && cespo=='XC1'){
srit=800;}
if (tgetto=="pumping concrete" && cespo=='XC2'){
srit=800;}
if (tgetto=="pumping concrete" && cespo=='XC3'){
srit=750;}
if (tgetto=="pumping concrete" && cespo=='XC4'){
srit=700;}
if (tgetto=="pumping concrete" && cespo=='XF3'){
srit=700;}
if (tgetto=="pumping concrete" && cespo=='XF4'){
srit=650;}

if(umrel<40){
umi=1.15;
}else if (umrel==40) {
umi=1.1 ;
}else if (umrel>40 && umrel<60){
umi=1.1-((umrel-40)*0.01);
}else if(umrel>=60 && umrel<80) {
umi=0.9-((umrel-60)*0.02);
}else if(umrel>80){
umi=0.45;
}
if(cespo=='XC1'){ var ac=0.6; }
if(cespo=='XC2'){ var ac=0.6; }
if(cespo=='XC3'){ var ac=0.55; }
if(cespo=='XC4'){ var ac=0.5; }
if(cespo=='XF3'){ var ac=0.5; }
if(cespo=='XF4'){ var ac=0.5; }

var spep=(100*spess)/50;

if (spep==5){
var fitt=1;
}else if (spep>5 && spep<=10){
var fitt=1-((spep-5)*0.03);
}else if(spep>10 && spep<=20){
var fitt=0.85-((spep-10)*0.02);
}else if(spep>20 && spep<=40){
var fitt=0.65-((spep-20)*0.01);
}else if(spep>40 && spep<=50){
var fitt=0.45-((spep-40)*0.005)
}

var ritirolastrax=((fitt*umi*srit)/1000)*distcont;
var ritirolastray=Math.round(ritirolastrax*100)/100;
if (strato=="yes"){
var ritirostrato=ritirolastray*12/100;
}else{
ritirostrato=0;}

ritirolastraz=ritirolastray+ritirostrato;
ritirolastra=Math.round(ritirolastraz*100)/100;
var boxalert=document.getElementById('boxalert');
boxalert.innerHTML="The theoretical shrinkage of the young concrete for the sawn joints of <span style='font-weight:bold;color:#ff2200;'>"+distcont+" m </span> it will be about <br /> <span style='font:bold 20px arial;color:#ff2200;display:block;width:100%;text-align:center;'>"+ritirolastra+" mm </span>";
var alertd=document.getElementById('alert2');
if (ritirolastra>1.7){
alert("Theoretical shrinkage of "+ritirolastra+"\n"+"\n"+"RECALCULATE THE JOINTS DISTANCE TO GET A SHRINKAGE OF NOT MORE THAN 1.7 mm");
fineintro();
document.getElementById('digiucont').value='';
document.getElementById('digiucont').focus();
}
var modelast=5700*Math.sqrt(rck);     
var modelas=Math.round(modelast);         // modulo elastico calcestruzzo
var rck2=Math.pow(rck,2)   ;
var resistrazionex=0.27*Math.pow(rck2,1/3);  
var resistrazione=Math.round(resistrazionex*100)/100;   //resistenza a trazione
var fattrit=(fitt*umi*srit)/1000000; //d4
var sollmediatrazionex=(fattrit*modelas*(100*spess))/1500; 
var sollmediatrazione=Math.round(sollmediatrazionex*100)/100;//sollecitazione media a trazione
moduloelastico.innerHTML="Modulus of Elasticity: <span style='font:bold 16px; color:#ff2200;'>"+modelas+" N/mm<sup>2</sup> </span>";
resistenzaatrazione.innerHTML="Resistance in traction : <span style='font:bold 16px; color:#ff2200;'>"+resistrazione+" N/mm<sup>2</sup></span>";
resistenzamediaatrazione.innerHTML="Average tensile stress : <span style='font:bold 16px; color:#ff2200;'>"+sollmediatrazione+" N/mm<sup>2</sup></span>";


}
function init(){
document.getElementById('intro').style.display="block";
document.getElementById('risultati').style.display="none";
document.getElementById('pinserimento').style.display="none";
}
function fineintro(){
document.getElementById('intro').style.display="none";
document.getElementById('pinserimento').style.display="block";
document.getElementById('risultati').style.display="none";
}
function esci(){
 navigator.app.exitApp();
}
function ripeti(){
window.location="index.html";
}
function gocalcolo(){
 window.location = "shrinkage.html";

}
function inviamail(){
var pac=document.getElementById('classesp').value;
var contr=document.getElementById('digiucont').value;
var getto=document.getElementById('tipogetto').value;
var cls=document.getElementById('rck').value;
var spessore=document.getElementById('spesspav').value;
if(document.getElementById('barriera').checked){
var strimp="yes";
}else{
var strimp="no";
}


var mess="CALCULATION DATA %0d%0a -------------------------%0d%0a%0d%0a Exposure class                       : "+pac+"%0d%0aconcrete compressive strength: "+cls+" N/mmq%0d%0aFloor thickness                        : "+spessore+" cm%0d%0aDistance between joints          : "+contr+" ml%0d%0aType of casting                         : "+getto+"%0d%0aWaterproofed subfloor             :"+strimp+"%0d%0a%0d%0a%0d%0aRESULTS%0d%0a----------------------%0d%0aTheoretical young concrete shrinkage of "+ritirolastra+" mm.;%0d%0a" ;
var oggetto="Shrinkage calculation of young concrete. Construction site:"  ;
document.location.href = "mailto:?"+"Subject=" + oggetto + "&Body=" + mess; 
}
