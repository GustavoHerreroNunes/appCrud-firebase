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

    //Edita os dados do documento selecionado
    editar: function(){
        let registNome = document.getElementById("txbNome").value;
        let registTelefone = document.getElementById("txbTelefone").value;
        let registOrigem = document.getElementById("slctOrigem").value;
        let registDataContato = document.getElementById("txbDataContato").value;
        let registObservacao = document.getElementById("txbObservacao").value;

        var db = firebase.firestore();
        var docSelected = db.collection("cadastros").where("telefone", "==", registTelefone);

        docSelected.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                return db.collection("cadastros").doc(doc.id).update({
                    nome: registNome,
                    telefone: registTelefone,
                    origem: registOrigem,
                    data_contato: registDataContato,
                    observacao: registObservacao,
                })
                .then(() => {
                    alert("Registro editado com sucesso!");
                    window.location.href = "consultar.html";
                })
                .catch((error) => {
                    alert("Erro ao editar registro");
                    console.info("Erro ao editar registro: " + error);
                    window.location.href = "consultar.html";
                });

            });
        })
        .catch((error) => {
            alert("Erro ao editar registro");
            console.info("Erro ao buscar registro para a edição: " + error);
        });

    }

    

};

app.initialize();