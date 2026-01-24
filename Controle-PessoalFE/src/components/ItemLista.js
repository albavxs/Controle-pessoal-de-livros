import "./ItemLista.css";

const ItemLista = ({id, titulo, autor, ano, preco, foto, excluirClick, alterarClick}) => {  
  return (
    <tr>
      <td className="d-none d-sm-table-cell">{id}</td>
      <td>
        <div className="fw-bold">{titulo}</div>
        <div className="d-md-none small text-muted">{autor}</div>
        <div className="d-md-none small text-muted">R$ {Number(preco).toLocaleString("pt-br", {minimumFractionDigits: 2})}</div>
      </td>
      <td className="d-none d-md-table-cell">{autor}</td>
      <td className="d-none d-lg-table-cell">{ano}</td>
      <td className="d-none d-md-table-cell text-end">
        {Number(preco).toLocaleString("pt-br", {minimumFractionDigits: 2})}
      </td>
      <td className="d-none d-lg-table-cell text-center">
        <img src={foto} alt="Capa do Livro" width="40" height="auto" className="img-fluid" />
      </td>
      <td className="text-center">
        <button 
          className="btn btn-sm btn-outline-danger me-1"
          title="Excluir"
          onClick={excluirClick}
          aria-label="Excluir livro"
        >
          <i>&#10008;</i>
        </button>
        <button 
          className="btn btn-sm btn-outline-success"
          title="Alterar preço"
          onClick={alterarClick}
          aria-label="Alterar preço do livro"
        >
          <i>&#36;</i>
        </button>
      </td>
    </tr>
  );
};

export default ItemLista;
