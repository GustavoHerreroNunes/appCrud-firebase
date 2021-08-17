var app = {

    //Construtor do app
    initialize: function(){
        console.info("Iniciando...");
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    //Quando todas as estruturas cordova tiverem inicializado
    onDeviceReady: function(){
        console.info("Device Ready");
        document.getElementById("btnExcluir").addEventListener('click', app.excluir);
        this.receiveEvent('deviceready');
    },

    //Atualiza o DOM ao receber um evento
    receiveEvent: function(id){
        console.info("Recebendo Evento");
        //Abrindo banco de dados, ou criando se não existir
        db = window.sqlitePlugin.openDatabase({
            name: 'appCrud.db',
            location: 'default',
            androidDatabaseProvider: 'system'
        });

        //Criando tabela 'clientes' no banco de dados se ela não existir
        db.transaction( function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS clients (nome, telefone, origem, data_contato, observacao)');
        },
        function(error){
            console.info('Transaction ERROR: ' + error.message);
        },
        function(){
            console.info("Tabela Criada com sucesso");
            app.buscar();
        });
    },

    //Busca pelo registro selecionado na tabela 'clientes'
    buscar: function(){
        var url_passada = window.location.href;
        var url = new URL(url_passada);
        var telefone_passado = url.searchParams.get("telefone");

        db.executeSql(
            'SELECT nome AS registNome, telefone AS registTelefone, origem AS registOrigem, data_contato AS registDataContato, observacao AS registObservacao FROM clientes WHERE telefone = ?',
            [telefone_passado],
            function(registro){

                let i = 0;
                for(i = 0; i< registro.rows.length; i++){
                    document.getElementById("txbNome").value = registro.rows.item(i).registNome;
                    document.getElementById("txbTelefone").value = registro.rows.item(i).registTelefone;

                    document.getElementById("slctOrigem").value = registro.rows.item(i).registOrigem;

                    document.getElementById("txbDataContato").value = registro.rows.item(i).registDataContato;
                    
                    document.getElementById("txbObservacao").value = registro.rows.item(i).registObservacao;
                }
            },
            function(error){
                console.info("Erro ao buscar registro: " + error.message);
            }
        );
    },

    //Salva as edições feitas em um registro da tabela 'clientes'
    excluir: function(){
        var url_passada = window.location.href;
        var url = new URL(url_passada);
        var telefone_passado = url.searchParams.get("telefone");

        db.transaction( function(tx){
            tx.executeSql(
                'DELETE FROM clientes WHERE telefone = ?',
                [telefone_passado]
            );
        },
        function(error){
            console.info("Erro ao excluir registro: " + error.message);
        },
        function(){
            console.info("Registro excluído com sucesso!");
        });
    }
};

app.initialize();