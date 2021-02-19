function newElement(){
    let inputText = document.getElementById("input").value
    if(inputText == ""){
        alert("preencha o campo de tarefas antes")
    }
    else{
        document.getElementById("input").value = ""
        let tarefa = document.createElement("li")
        let text = document.createElement("a")
        text.innerHTML = inputText
        tarefa.appendChild(text)
        
        //botao Del
        let botao = document.createElement("span")
        botao.setAttribute("onclick", "delElement(this)")
        botao.setAttribute("class", "btnDel")
        botao.innerHTML = "Del"
        tarefa.appendChild(botao)

        //botao Feito
        let botao2 = document.createElement("span")
        botao2.setAttribute("onclick", "feitoElement(this)")
        botao2.setAttribute("class", "btnFeito")
        botao2.innerHTML = "Feito"
        tarefa.appendChild(botao2)

        document.getElementById("minhaLista").appendChild(tarefa)
        //console.log(document.getElementById("minhaLista"))
    }
}

function delElement(tarefa){
    //console.log(tarefa) //mostra só o botao span
    let th = tarefa.parentNode
    th.remove()
    //console.log(th) //devido ao parentNode agora mostra o li
}

function feitoElement(botao){
    var tarefa = botao.parentNode
    if(botao.innerHTML == "Feito"){
        botao.setAttribute("class","btnNFeito")
        tarefa.setAttribute("class", "liFeito")
        botao.innerHTML = "Desfazer"
        //console.log(botao)
    }else{
        botao.setAttribute("class","btnFeito")
        tarefa.removeAttribute("class", "liFeito")
        botao.innerHTML = "Feito"
    }
}