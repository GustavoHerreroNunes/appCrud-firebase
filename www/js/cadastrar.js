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

        db.collection("agendamentos").add({
            nome: registNome,
            telefone: registTelefone,
            origem: registOrigem,
            data_contato: registData_contato,
            observacao: registObservacao
        })
        .then( (docRef) => {
            alert("Documento written with ID: " + docRef.id);
        })
        .catch( (error) => {
            alert("Error adding document: " + error);
        });
    }
};

app.initialize();