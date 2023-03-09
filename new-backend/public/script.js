for(let btn of document.querySelectorAll("td.btn")){
    btn.addEventListener("click", function(e){
        let tr = e.target.parentElement;
        let class_id = tr.children[1].textContent;
        class_id = !isNaN(class_id) ? class_id : `${tr.children[2].textContent}||${tr.children[4].textContent}`;
        if(e.target.textContent === "+"){
            fetch(`/add?class_id=${class_id}`, {method: "PUT"});
        } else {
            fetch(`/remove?class_id=${class_id}`, {method: "DELETE"});
        }
        e.target.textContent = e.target.textContent === "+" ? "-" : "+";
    });
}