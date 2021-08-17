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
    editar: function(){
        var url_passada = window.location.href;
        var url = new URL(url_passada);
        var telefone_passado = url.searchParams.get("telefone");

        let nome = document.getElementById("txbNome").value;
        let telefone = document.getElementById("txbTelefone").value;
        let origem = document.getElementById("slctOrigem").value;
        let data_contato = document.getElementById("txbDataContato").value;
        let observacao = document.getElementById("txbObservacao").value;

        db.transaction( function(tx){
            tx.executeSql(
                'UPDATE clientes SET nome=?, telefone=?, origem=?, data_contato=?, observacao=? WHERE telefone = ?',
                [nome, telefone, origem, data_contato, observacao, telefone_passado]
            );
        },
        function(error){
            console.info("Erro ao salvar alterações: " + error.message);
        },
        function(){
            console.info("Registro editado com sucesso!");
        });
    }
};

app.initialize();