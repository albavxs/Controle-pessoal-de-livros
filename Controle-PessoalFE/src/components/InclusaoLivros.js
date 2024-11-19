import { useState } from "react";
import { useForm } from "react-hook-form";
import { inAxios } from "../config_axios";

const InclusaoLivros = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [aviso, setAviso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const salvar = async (campos) => {
    setCarregando(true);
    try {
      const response = await inAxios.post("livros", campos);
      setAviso(`Ok! Livro cadastrado com código ${response.data.id}`);
    } catch (error) {
      setAviso(`Erro... Livro não cadastrado: ${error.message}`);
    } finally {
      setCarregando(false);
    }

    setTimeout(() => {
      setAviso("");
    }, 5000);

    reset({
      titulo: "",
      autor: "",
      foto: "",
      ano: "",
      preco: "",
    });
  };

  return (
    <div className="container">
      <h4 className="fst-italic mt-3">Inclusão</h4>
      <form onSubmit={handleSubmit(salvar)}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            required
            autoFocus
            {...register("titulo", { required: "Título é obrigatório" })}
          />
          {errors.titulo && (
            <span className="text-danger">{errors.titulo.message}</span>
          )}
        </div>

        <div className="form-group mt-2">
          <label htmlFor="autor">Autor:</label>
          <input
            type="text"
            className="form-control"
            id="autor"
            required
            {...register("autor", { required: "Autor é obrigatório" })}
          />
          {errors.autor && (
            <span className="text-danger">{errors.autor.message}</span>
          )}
        </div>

        <div className="form-group mt-2">
          <label htmlFor="foto">URL da Foto:</label>
          <input
            type="url"
            className="form-control"
            id="foto"
            required
            {...register("foto", { required: "URL da foto é obrigatória" })}
          />
          {errors.foto && (
            <span className="text-danger">{errors.foto.message}</span>
          )}
        </div>

        <div className="row mt-2">
          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="ano">Ano de Publicação:</label>
              <input
                type="number"
                className="form-control"
                id="ano"
                required
                {...register("ano", { required: "Ano é obrigatório" })}
              />
              {errors.ano && (
                <span className="text-danger">{errors.ano.message}</span>
              )}
            </div>
          </div>
          <div className="col-sm-8">
            <div className="form-group">
              <label htmlFor="preco">Preço R$:</label>
              <input
                type="number"
                className="form-control"
                id="preco"
                step="0.01"
                required
                {...register("preco", { required: "Preço é obrigatório" })}
              />
              {errors.preco && (
                <span className="text-danger">{errors.preco.message}</span>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary my-3"
          disabled={carregando}
        >
          {carregando ? "Enviando..." : "Enviar"}
        </button>
        <button type="reset" className="btn btn-danger my-3 ms-3">
          Limpar
        </button>
      </form>

      {aviso && (
        <div
          className={
            aviso.startsWith("Ok!")
              ? "alert alert-success"
              : aviso.startsWith("Erro")
              ? "alert alert-danger"
              : ""
          }
        >
          {aviso}
        </div>
      )}
    </div>
  );
};

export default InclusaoLivros;
