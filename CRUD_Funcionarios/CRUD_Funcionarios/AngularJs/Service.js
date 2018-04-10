funcionarioApp.service('funcionarioService', function ($http) {

    //Método para listar Funcionário
    this.getTodosFuncionarios = function () {

        return $http.get("/Funcionario/GetFuncionario");

    }


    //Método para adicionar Funcionário
    this.adicionarFuncionario = function (funcionario) {

        var request = $http({
            method: 'post',
            url: '/Funcionario/AdicionarFuncionario',
            data: funcionario
        });
        return request;
    }

    //Método para Atualizar Funcionário

    this.atualizarFuncionario = function (funcionario) {

        var request = $http({
            method: 'post',
            url: '/Funcionario/AtualizarFuncionario',
            data: funcionario

        });

        return request;
    }

    //Método para excluir Funcionário
    this.excluirFuncionario = function (atualizadoFuncionarioId) {

        return $http.post('/Funcionario/ExcluirFuncionario/' + atualizadoFuncionarioId);
    }

});