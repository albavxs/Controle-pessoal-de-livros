import { useState, useEffect } from "react";
import { inAxios } from "../config_axios";
import { useForm } from "react-hook-form";
import ItemLista from "./ItemLista";

const ManutencaoLivros = () => {
  const [livros, setLivros] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const obterLista = async () => {
    try {
      const lista = await inAxios.get("livros");
      setLivros(lista.data);
    } catch (error) {
      console.error(error);
      alert(`Erro... Não foi possível obter os dados: ${error}`);
    }
  };

  useEffect(() => {
    obterLista();
  }, []);

  const filtrarLista = async (campos) => {
    try {
      const lista = await inAxios.get(`livros/filtro/${campos.palavra}`);
      lista.data.length
        ? setLivros(lista.data)
        : alert("Não há livros com a palavra-chave pesquisada...");
    } catch (error) {
      alert(`Erro... Não foi possível obter os dados: ${error}`);
    }
  };

  const excluir = async (id, titulo) => {
    if (!window.confirm(`Confirma a exclusão do livro "${titulo}"?`)) {
      return;
    }
    try {
      await inAxios.delete(`livros/${id}`);
      setLivros(livros.filter((livro) => livro.id !== id));
    } catch (error) {
      alert(`Erro... Não foi possível excluir este livro: ${error}`);
    }
  };

  const alterar = async (id, titulo, index) => {
    const novoPreco = Number(
      prompt(`Informe o novo preço do livro "${titulo}"`)
    );
    if (isNaN(novoPreco) || novoPreco === 0) {
      return;
    }
    try {
      await inAxios.put(`livros/${id}`, { preco: novoPreco });
      const livrosAlteracao = [...livros];
      livrosAlteracao[index].preco = novoPreco;
      setLivros(livrosAlteracao);
    } catch (error) {
      alert(`Erro... Não foi possível alterar o preço: ${error}`);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white border-0 pt-4 pb-3">
          <div className="row align-items-center g-3">
            <div className="col-12 col-lg-6">
              <h3 className="fw-bold text-primary mb-0">Hub de Manutenção</h3>
              <p className="text-muted small mb-0">Gerencie seu acervo pessoal de livros</p>
            </div>
            <div className="col-12 col-lg-6">
              <form onSubmit={handleSubmit(filtrarLista)}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control shadow-none"
                    placeholder="Título ou autor..."
                    required
                    {...register("palavra")}
                  />
                  <button className="btn btn-primary" type="submit">
                    Pesquisar
                  </button>
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={() => {
                      reset({ palavra: "" });
                      obterLista();
                    }}
                  >
                    Todos
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4 py-3" style={{ width: "100px" }}>Capa</th>
                  <th className="py-3">Título / Autor</th>
                  <th className="py-3 d-none d-md-table-cell">Ano</th>
                  <th className="py-3">Preço</th>
                  <th className="py-3 text-center pe-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {livros.map((livro, index) => (
                  <ItemLista
                    key={livro.id}
                    id={livro.id}
                    titulo={livro.titulo}
                    autor={livro.autor}
                    ano={livro.ano}
                    preco={livro.preco}
                    foto={livro.foto}
                    excluirClick={() => excluir(livro.id, livro.titulo)}
                    alterarClick={() => alterar(livro.id, livro.titulo, index)}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {livros.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted">Nenhum livro encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManutencaoLivros;
