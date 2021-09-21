var app = {
    
    //Construtor do app
    initialize: function() {
        console.info("Iniciando...");
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    //Quando todas as estruturas cordova tiverem inicializado
    onDeviceReady: function() {
        console.info("Device Ready");
        document.getElementById("btnCadastrar").addEventListener('click', app.cadastrar);
    },

    //Cadastra um novo registro na tabela 'clientes'
    cadastrar: function() {
        let registNome = document.getElementById("txbNome").value;
        let registTelefone = document.getElementById("txbTelefone").value;
        let registOrigem = document.getElementById("slctOrigem").value;
        let registData_contato = document.getElementById("txbDataContato").value;
        let registObservacao = document.getElementById("txbObservacao").value;

        var db = firebase.firestore();

        db.collection("cadastros").add({
            nome: registNome,
            telefone: registTelefone,
            origem: registOrigem,
            data_contato: registData_contato,
            observacao: registObservacao
        })
        .then( (docRef) => {
            alert("Cliente cadastrado com sucesso");
            console.info("Document ID: "  + docRef.id);
            window.location.href = "cadastrar.html";
        })
        .catch( (error) => {
            alert("Erro ao cadastrar cliente");
            console.info("Erro ao cadastrar documento: " + error);
        });
    }
};

app.initialize();