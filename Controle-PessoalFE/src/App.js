import { Routes, Route } from "react-router-dom";
import MenuSuperior from "./components/MenuSuperior";
import InclusaoLivros from "./components/InclusaoLivros";
import ManutencaoLivros from "./components/ManutencaoLivros";
import ResumoLivros from "./components/ResumoLivros";
import "./App.css";

const App = () => {
  return (
    <>
      <MenuSuperior />
      <main className="py-4">
        <Routes>
          <Route path="/" element={<ManutencaoLivros />} />
          <Route path="inclusao" element={<InclusaoLivros />} />
          <Route path="resumo" element={<ResumoLivros />} />
        </Routes>
      </main>
    </>
  );
};
export default App;
