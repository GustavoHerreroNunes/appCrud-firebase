var app = {

    //Construtor do app
    initialize: function(){
        console.info("Iniciando...");
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    //Quando todas as estruturas cordova tiverem inicializado
    onDeviceReady: function(){
        console.info("Device Ready");
        document.getElementById("btnExcluir").addEventListener('click', app.confirmarExclusao);
        app.buscar();
    },

    //Busca pelo registro selecionado na tabela 'clientes'
    buscar: function(){
        var string_url = window.location.href;
        var url = new URL(string_url);
        var doc_telefone = url.searchParams.get("telefone");

        var db = firebase.firestore();
        var registry = db.collection('cadastros').where('telefone', '==', doc_telefone);

        registry.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => { 
                document.getElementById("txbNome").value = doc.data().nome;
                document.getElementById("txbTelefone").value = doc.data().telefone;
                document.getElementById("slctOrigem").value = doc.data().origem;
                document.getElementById("txbDataContato").value = doc.data().data_contato;
                document.getElementById("txbObservacao").value = doc.data().observacao;
            });
        })
        .catch((error) => {
            alert("Erro ao apresentar dados do registro");
            console.info("Erro ao buscar por registro: " + error);
            window.location.href = "consultar.html";
        });
    },

    //Pede confirmação para a exclusão de um registro selecionado
    confirmarExclusao: function(){
        var doc_nome = document.getElementById("txbNome").value;

        navigator.notification.confirm(
            'Deseja mesmo excluir o registro de \"' + doc_nome + '\"?',
            app.excluir,
            'Excluir Registro',
            ['Sim', 'Cancelar']
        );
    },

    //Exclui um registro selecionado da tabela 'clientes'
    excluir: function(awnser){
        if(awnser == 1){
            var doc_telefone = document.getElementById("txbTelefone").value;

            var db = firebase.firestore();
            var registry = db.collection('cadastros').where('telefone', '==', doc_telefone);

            registry.get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    db.collection('cadastros').doc(doc.id).delete()
                    .then(() => {
                        alert("Registro excluído com sucesso!");
                        window.location.href = "consultar.html";
                    })
                    .catch((error) => {
                        alert("Erro ao excluir registro");
                        console.info("Erro ao excluir registro: " +  error);
                    })
                })
            })
            .catch((error) => {
                alert("Erro ao excluir o registro");
                console.info("Erro ao buscar registro para exclusão: " + error);
                window.location.href = "consultar.html";
            })
        }
    }
};

app.initialize();