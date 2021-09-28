var app = {

    //Construtor do app
    initialize: function(){
        console.info("Iniciando...");
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    //Quando todas as estruturas cordova tiverem inicializado
    onDeviceReady: function(){
        console.info("Device Ready");
        document.getElementById("btnEditar").addEventListener('click', app.editar);
        app.buscar();
    },

    //Busca os dados do documento a ser editado e os apresenta na tela
    buscar: function(){
        //Captando parâmetro telefone da url
        var string_url = window.location.href;
        var url = new URL(string_url);
        var doc_telefone = url.searchParams.get("telefone");

        console.log("Telefone: ", doc_telefone);

        var db = firebase.firestore();
        var docSelected = db.collection("cadastros").where("telefone", "==", doc_telefone);

        docSelected.get()
        .then((querySnapshot) =>{
            querySnapshot.forEach((doc) => {
                document.getElementById("txbNome").value = doc.data().nome;
                document.getElementById("txbTelefone").value = doc.data().telefone;
                document.getElementById("slctOrigem").value = doc.data().origem;
                document.getElementById("txbDataContato").value = doc.data().data_contato;
                document.getElementById("txbObservacao").value = doc.data().observacao;
            });
        })
        .catch((error) => {
            console.info("Erro ao buscar dados do documento: " + error);
        });
    },

    
    

};

app.initialize();