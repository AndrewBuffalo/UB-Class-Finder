let ts = new Date().toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric"});
document.getElementById("time").value = ts;

function showLeastAvailable(){
    for(let i = 1; i <= 5; i++)
        if(document.getElementById(i).hasAttribute("hidden")){
            document.querySelector(`br[name=br${i}]`).removeAttribute("hidden");
            return document.getElementById(i).removeAttribute("hidden");
        }
    console.log("No more available");
}
const selects = [...document.querySelectorAll("select")];
selects.forEach(el=>{el.addEventListener("change", function(e){
    if(e.target.value != "")
        return showLeastAvailable(),1;
    e.target.setAttribute("hidden", "true");
    document.querySelector(`br[name=br${e.target.id}]`).removeAttribute("hidden");
})});