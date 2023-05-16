var score=0;
function reqListener1() {
    if(document.getElementById("question1").value == "{pinisshady}")
    {
    score=score+80;
    var lblName = document.getElementById("score");
    lblName.innerHTML=score;
    document.getElementById("question1").value="done";
    }
    else if(document.getElementById("question2").value == "{TH15_15_A_GP}")
    {
    score=score+80;
    var lblName = document.getElementById("score");
    lblName.innerHTML=score;
    document.getElementById("question2").value="done";
    }
    else if(document.getElementById("question3").value == "{PIN_IS_HJPLWE}")
    {
    score=score+80;
    var lblName = document.getElementById("score");
    lblName.innerHTML=score;
    document.getElementById("question3").value="done";
    }
    else if(document.getElementById("question4").value == "{618836257}")
    {
    score=score+80;
    var lblName = document.getElementById("score");
    lblName.innerHTML=score;
    document.getElementById("question4").value="done";
    }
    else if(document.getElementById("question5").value == "{10}")
    {
    score=score+80;
    var lblName = document.getElementById("score");
    lblName.innerHTML=score;
    document.getElementById("question5").value="done";
    }
  }
  function hint(){
    score=score-20;
    var lblName = document.getElementById("score");
    lblName.innerHTML=score;
  }
//   var player=GetPlayer();
// nextOn=function(){
// var actNext=player.GetVar("activateNext");
// actNext++;
// player.SetVar("activateNext",actNext);
// }
function myFunction() {
  window.open("https://drive.google.com/drive/folders/1UiRSNgZvgNG2J4XEs52z2fi8mUJv7_Hu?usp=share_link","_blank");
}
function myFunction1() {
  window.open("https://drive.google.com/file/d/10Wxo3v6IL5dRkh7rAMJzfFDtVZ1QHHSl/view?usp=share_link","_blank");
}
function myFunction2() {
  window.open("https://drive.google.com/file/d/11oJqcveoiyQVWlG2VuQ8XjFbY6Q_U6w0/view?usp=share_link","_blank");
}
// function myFunction1() {
//   window.location.href="question3.html";  
// }
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "/quests");
  oReq.send();
