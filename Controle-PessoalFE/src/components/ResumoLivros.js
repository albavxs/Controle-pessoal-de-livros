import {useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { inAxios } from "../config_axios";

const ResumoLivros = () => {
    const [resumo, setResumo] = useState([]);
    const [grafico, setGrafico] = useState([]);
    const [chartWidth, setChartWidth] = useState(1000);
    const [chartHeight, setChartHeight] = useState(420);

    const obterDados = async () => {
        try {
            const dadosResumo = await inAxios.get("livros/dados/resumo");
            setResumo(dadosResumo.data);
            
            const dadosGrafico = await inAxios.get("livros/dados/grafico");
            // cria um array e adiciona a primeira linha
            const arrayGrafico = [["Ano", "R$ Total"]];
            //percorre cada linha do JSON e adiciona ao array
            dadosGrafico.data.map((dado) => 
                arrayGrafico.push([dado.ano.toString(), dado.total])
            );
            setGrafico(arrayGrafico);
        } catch(error) {
            alert(`Erro... Não foi possível obter os dados: ${error}`);
        }
    };

    // Ajusta o tamanho do gráfico conforme o tamanho da tela
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 576) {
                setChartWidth(width - 40);
                setChartHeight(300);
            } else if (width < 768) {
                setChartWidth(width - 60);
                setChartHeight(350);
            } else if (width < 992) {
                setChartWidth(width - 80);
                setChartHeight(380);
            } else {
                setChartWidth(1000);
                setChartHeight(420);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // define o método que será executado assim que o componente for renderizado
    useEffect(() => {
        obterDados();
    }, []);

    return (
        <div className="container-fluid px-3 px-sm-4">
            <h4 className="mt-3 mb-4">Resumo</h4>
            
            <div className="row g-3 mb-4">
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="btn btn-outline-primary btn-lg w-100 p-3">
                        <p className="badge bg-danger mb-2" style={{fontSize: "1.1rem"}}>
                            {resumo.num}
                        </p>
                        <p className="mb-0 small">N de Livros cadastrados</p>
                    </div>
                </div>
                
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="btn btn-outline-primary btn-lg w-100 p-3">
                        <p className="badge bg-danger mb-2" style={{fontSize: "1.1rem"}}>
                            {Number(resumo.soma).toLocaleString("pt-br", {minimumFractionDigits: 2})}
                        </p>
                        <p className="mb-0 small">Total Investido em Livros</p>
                    </div>
                </div>
                
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="btn btn-outline-primary btn-lg w-100 p-3">
                        <p className="badge bg-danger mb-2" style={{fontSize: "1.1rem"}}>
                            {Number(resumo.maior).toLocaleString("pt-br", {minimumFractionDigits: 2})}
                        </p>
                        <p className="mb-0 small">Maior Preço Cadastrado</p>
                    </div>
                </div>
                
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="btn btn-outline-primary btn-lg w-100 p-3">
                        <p className="badge bg-danger mb-2" style={{fontSize: "1.1rem"}}>
                            {Number(resumo.media).toLocaleString("pt-br", {minimumFractionDigits: 2})}
                        </p>
                        <p className="mb-0 small">Preço Médio dos Livros</p>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center mb-4">
                <Chart
                    width={chartWidth}
                    height={chartHeight}
                    chartType="ColumnChart"
                    loader={<div className="text-center">Carregando Gráfico...</div>}
                    data={grafico}
                    options={{
                        title: "Total de Investimentos em Livros - por Ano de Publicação",
                        chartArea: { width: "80%" },
                        hAxis: { title: "Ano de Publicação" },
                        vAxis: {title: "Preço Acumulado R$" },
                        legend: {position: "none"},
                        responsive: true,
                    }}
                />
            </div>
        </div>
    );
};
export default ResumoLivros;
