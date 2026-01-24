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
    <div className="container-fluid px-3 px-sm-4">
      <h4 className="fst-italic mt-3 mb-4">Inclusão</h4>
      <form onSubmit={handleSubmit(salvar)}>
        <div className="form-group mb-3">
          <label htmlFor="titulo" className="form-label">
            Título:
          </label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            required
            autoFocus
            {...register("titulo", { required: "Título é obrigatório" })}
          />
          {errors.titulo && (
            <span className="text-danger small d-block mt-1">
              {errors.titulo.message}
            </span>
          )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="autor" className="form-label">
            Autor:
          </label>
          <input
            type="text"
            className="form-control"
            id="autor"
            required
            {...register("autor", { required: "Autor é obrigatório" })}
          />
          {errors.autor && (
            <span className="text-danger small d-block mt-1">
              {errors.autor.message}
            </span>
          )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="foto" className="form-label">
            URL da Foto:
          </label>
          <input
            type="url"
            className="form-control"
            id="foto"
            required
            {...register("foto", { required: "URL da foto é obrigatória" })}
          />
          {errors.foto && (
            <span className="text-danger small d-block mt-1">
              {errors.foto.message}
            </span>
          )}
        </div>

        <div className="row g-3 mb-3">
          <div className="col-12 col-sm-6 col-md-4">
            <div className="form-group">
              <label htmlFor="ano" className="form-label">
                Ano de Publicação:
              </label>
              <input
                type="number"
                className="form-control"
                id="ano"
                required
                {...register("ano", { required: "Ano é obrigatório" })}
              />
              {errors.ano && (
                <span className="text-danger small d-block mt-1">
                  {errors.ano.message}
                </span>
              )}
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-8">
            <div className="form-group">
              <label htmlFor="preco" className="form-label">
                Preço R$:
              </label>
              <input
                type="number"
                className="form-control"
                id="preco"
                step="0.01"
                required
                {...register("preco", { required: "Preço é obrigatório" })}
              />
              {errors.preco && (
                <span className="text-danger small d-block mt-1">
                  {errors.preco.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="d-flex flex-wrap gap-2 mb-3">
          <button
            type="submit"
            className="btn btn-primary flex-grow-1"
            style={{ minWidth: "120px" }}
            disabled={carregando}
          >
            {carregando ? "Enviando..." : "Enviar"}
          </button>
          <button
            type="reset"
            className="btn btn-danger flex-grow-1"
            style={{ minWidth: "120px" }}
          >
            Limpar
          </button>
        </div>
      </form>

      {aviso && (
        <div
          className={
            aviso.startsWith("Ok!")
              ? "alert alert-success alert-dismissible fade show"
              : aviso.startsWith("Erro")
              ? "alert alert-danger alert-dismissible fade show"
              : ""
          }
          role="alert"
        >
          {aviso}
          <button
            type="button"
            className="btn-close"
            onClick={() => setAviso("")}
            aria-label="Close"
          ></button>
        </div>
      )}
    </div>
  );
};

export default InclusaoLivros;
