const ItemLista = ({
  id,
  titulo,
  autor,
  ano,
  preco,
  foto,
  excluirClick,
  alterarClick,
}) => {
  return (
    <tr>
      <td className="ps-4 py-3">
        <div 
          style={{ 
            width: "60px", 
            height: "85px", 
            backgroundColor: "#f8f9fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.7rem",
            textAlign: "center",
            color: "#6c757d"
          }} 
          className="rounded shadow-sm border overflow-hidden"
        >
          {foto ? (
            <img 
              src={foto} 
              alt={titulo} 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://via.placeholder.com/60x85?text=Livro";
              }}
            />
          ) : (
            <span>Sem Capa</span>
          )}
        </div>
      </td>
      <td className="py-3">
        <div className="fw-bold text-dark" style={{ fontSize: "1.05rem" }}>{titulo}</div>
        <div className="text-muted small">{autor}</div>
      </td>
      <td className="py-3 d-none d-md-table-cell">
        <span className="badge bg-light text-dark border fw-normal">{ano}</span>
      </td>
      <td className="py-3 fw-bold text-primary">
        {Number(preco).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
      </td>
      <td className="py-3 text-center pe-4">
        <div className="btn-group btn-group-sm">
          <button 
            className="btn btn-outline-warning" 
            title="Alterar Preço"
            onClick={alterarClick}
          >
            Editar
          </button>
          <button 
            className="btn btn-outline-danger" 
            title="Excluir Livro"
            onClick={excluirClick}
          >
            Excluir
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ItemLista;
