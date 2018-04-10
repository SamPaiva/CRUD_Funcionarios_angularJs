using CRUD_Funcionarios.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRUD_Funcionarios.Controllers
{
    public class FuncionarioController : Controller
    {
        #region READ - Funcionário

        public JsonResult GetFuncionario()
        {

            using (var db = new FuncionariosEntities())
            {
                List<Funcionario> listarFuncionario = db.Funcionarios.ToList();

                return Json(listarFuncionario, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion


        #region CREATE - Funcionário

        [HttpPost]
        public JsonResult AdicionarFuncionario(Funcionario funcionario)
        {
            if (funcionario != null)
            {
                using(var db = new FuncionariosEntities())
                {
                    db.Funcionarios.Add(funcionario);
                    db.SaveChanges();

                    return Json(new { success = true });
                }
            }

            return Json(new { success = false }); 
        }

        #endregion


        #region UPDATE - Funcionário

        [HttpPost]
        public JsonResult AtualizarFuncionario(Funcionario funcionario)
        {
            using (var db = new FuncionariosEntities())
            {

                var funcionarioAtualizado = db.Funcionarios.Find(funcionario.FuncionarioId);

                if (funcionarioAtualizado == null)
                {
                    return Json(new { success = false });
                }

                else
                {
                    funcionarioAtualizado.Nome = funcionario.Nome;
                    funcionarioAtualizado.Email = funcionario.Email;
                    funcionarioAtualizado.Departamento = funcionario.Departamento;
                    funcionarioAtualizado.Cargo = funcionario.Cargo;

                    db.SaveChanges();

                    return Json(new { success = true });
                }
            }
        }

        #endregion

        #region DELETE - Funcionário

        [HttpPost]
        public JsonResult ExcluirFuncionario(int id)
        {
            using(var db = new FuncionariosEntities())
            {
                var funcionario = db.Funcionarios.Find(id);
                if (funcionario == null)
                {
                    return Json(new { success = false });
                }

                db.Funcionarios.Remove(funcionario);
                db.SaveChanges();

                return Json(new { success = true });
            }

            
        }

        #endregion


    }
}