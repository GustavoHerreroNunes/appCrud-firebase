var app = {

   //Construtor do app
    initialize: function() {
        console.info("Iniciando...");
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    //Quando todas as estruturas cordova tiverem inicializado
    onDeviceReady: function() {
        console.info("Device Ready");
        this.receiveEvent('deviceready');
    },

    //Atualiza o DOM ao receber um evento
    receiveEvent: function() {
        console.info("Recebendo Evento");
        //Abrindo banco de dados, ou criando se não existir
        db = window.sqlitePlugin.openDatabase({
            name: 'appCrud.db',
            location: 'default',
            androidDatabaseProvider: 'system'
        });

        //Criando tabela 'clientes' no banco de dados se ela não existir
        db.transaction( function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS clientes (nome, telefone, origem, data_contato, observacao)');
        },
        function(error) {
            console.info('Transaction ERROR: ' + error.message);
        },
        function() {
            console.info("Tabela Criada com sucesso");
            app.buscar();
        });
    },

    //Busca e lista os registros da tabela 'clientes'
    buscar: function(){
        db.executeSql(
            'SELECT nome AS registNome, telefone AS registTelefone, origem AS registOrigem, data_contato AS registDataContato, observacao AS registObservacao FROM clientes',
            [],
            function(registros){

                let i = 0;
                for(i = 0; i < registros.rows.length; i++){

                    /*Solução 2 - let rowRegistro = String com o registro*/
                    let rowRegistro = "<tr>" +
                                      "<td>" + registros.rows.item(i).registNome + "</td>" +
                                      "<td>" + registros.rows.item(i).registTelefone + "</td>" +
                                      "<td>" + registros.rows.item(i).registOrigem + "</td>" +
                                      "<td>" + registros.rows.item(i).registDataContato + "</td>" +
                                      "<td class='text-wrap'>" + registros.rows.item(i).registObservacao + "</td>" +
                                      "<td class='table-borderless'><a href='./editar.html?telefone=" + registros.rows.item(i).registTelefone + "'><img src='./img/editar.png' alt='Editar Registro' width='25' height='25'></a></td>" +
                                      "<td class='table-borderless'><a href='./excluir.html?telefone=" + registros.rows.item(i).registTelefone + "'><img src='./img/excluir.png' alt='Excluir Registro' width='25' height='25'></a></td>" +
                                      "</tr>";
                    
                    document.getElementById("TableData").innerHTML += rowRegistro;
                }
                
            },
            function(error){
                console.info("Erro ao mostrar dados: " + error.message);
            }
        );
    }
}

app.initialize();