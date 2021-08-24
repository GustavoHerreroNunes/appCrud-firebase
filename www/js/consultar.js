var app = {

   //Construtor do app
    initialize: function() {
        console.info("Iniciando...");
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    //Quando todas as estruturas cordova tiverem inicializado
    onDeviceReady: function() {
        console.info("Device Ready");
        app.buscar();
    },

    //Busca e lista os registros da tabela 'clientes'
    buscar: function(){
        try{
            console.log("Busca Iniciada");
            var db = firebase.firestore();
            var collCadastros = db.collection('cadastros');
            
            collCadastros.get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let rowContent ="<tr>" +
                                    "<td>" + doc.data().nome + "</td>" +
                                    "<td>" + doc.data().telefone + "</td>" +
                                    "<td>" + doc.data().origem + "</td>" +
                                    "<td>" + doc.data().data_contato + "</td>" +
                                    "<td class='text-wrap'>" + doc.data().observacao + "</td>" +
                                    "<td class='table-borderless'><a href='./editar.html?telefone=" + doc.data().telefone + "'><img src='./img/editar.png' alt='Editar Registro' width='25' height='25'></a></td>" +
                                    "<td class='table-borderless'><a href='./excluir.html?telefone=" + doc.data().telefone + "'><img src='./img/excluir.png' alt='Excluir Registro' width='25' height='25'></a></td>" +
                                    "</tr>";
                    
                    document.getElementById("TableData").innerHTML += rowContent;
                })
            })
            .catch((error) => {
                console.log("Erro ao consultar documento: " + error);
            })
        }catch(error){
            console.log("Erro ao buscar: " + error);
        }

    }
}

app.initialize();