//Controller de Funcionários

funcionarioApp.controller('funcionarioCtrl', function ($scope, funcionarioService) {

   //Aqui está sendo carregado os dados dos Funcionários:
    carregarFuncionarios();

    //Método para Carregar os dados Do Funcionário
    function carregarFuncionarios() {
        var listarFuncionarios = funcionarioService.getTodosFuncionarios();

        listarFuncionarios.then(function (d) {
            $scope.Funcionarios = d.data;
        }, function () {

            alert('Ocorreu um erro ao listar todos os funcionários!');

        });
    }

    //Método para adicionar um novo Funcionário:
    $scope.adicionarFuncionario = function () {

        var funcionario = {
            funcionarioId: $scope.funcionarioId,
            nome: $scope.nome,
            email: $scope.email,
            departamento: $scope.departamento,
            cargo: $scope.cargo
        };

        var adicionarInfos = funcionarioService.adicionarFuncionario(funcionario);

        adicionarInfos.then(function (d) {

            if (d.data.success === true) {

                carregarFuncionarios();
                alert('Funcionário adicionado com Sucesso');

                $scope.limparDados();

            } else { alert('Ops! Funcionário não adicionado'); };

        },
            function () {
                alert('Erro ao tentar adicionar novo funcionário!');
            });
    }

    //Método para limpar os dados do Funcionário:
    $scope.limparDados = function () {
        $scope.funcionarioId = "",
            $scope.nome = "",
            $scope.email = "",
            $scope.departamento = "",
            $scope.cargo = ""
    };

    //Método para atualizar o funcionário por ID:
    $scope.atualizarFuncionarioPeloId = function (funcionario) {

        $scope.atualizadoFuncionarioId = funcionario.FuncionarioId;
        $scope.atualizadoNome = funcionario.Nome;
        $scope.atualizadoEmail = funcionario.Email;
        $scope.atualizadoDepartamento = funcionario.Departamento
        $scope.atualizadoCargo = funcionario.Cargo;
    }

    

    $scope.atualizarFuncionario = function () {

        var funcionario = {
            FuncionarioId: $scope.atualizadoFuncionarioId,
            Nome: $scope.atualizadoNome,
            Email: $scope.atualizadoEmail,
            Departamento: $scope.atualizadoDepartamento,
            Cargo: $scope.atualizadoCargo
        };

        var atualizarInfos = funcionarioService.atualizarFuncionario(funcionario);

        atualizarInfos.then(function (d) {

            if (d.data.success) {
                alert("Funcionário Atualizado com Sucesso!");
                $scope.limparDadosAtualizados();

            } else {
                alert("Funcionário não Atualizado");
            }

        }, function () {

            alert("Ocorreu um erro ao tentar atualizar o funcionário");        
        
            });
        }

        //Método para limpar os dados do funcionário após a atualização:
        $scope.limparDadosAtualizados = function () {
            $scope.atualizadoFuncionarioId = "";
            $scope.atualizadoNome = "";
            $scope.atualizadoEmail = "";
            $scope.atualizadoDepartamento = "";
            $scope.atualizadoCargo = "";
    };

    //Método para exclusão do Funcionário
    $scope.excluirFuncionario = function (atualizadoFuncionarioId) {

        var excluirInfos = funcionarioService.excluirFuncionario($scope.atualizadoFuncionarioId);

        excluirInfos.then(function (d) {
            if (d.data.success === true) {
                alert("Funcionário Excluído com Êxito!");
            } else {
                alert("Funcionário não Excluído!");
            }
        }, function () {
            alert("Ops... Ocorreu um Erro ao tentar excluir o Funcionário");
            });
    }

    //Método para recuperar os dados do funcionário na hora da exclusão:
    $scope.excluirFuncionarioPeloId = function (funcionario) {
        $scope.atualizadoFuncionarioId = funcionario.FuncionarioId;
        $scope.atualizadoNome = funcionario.Nome;
    }

});