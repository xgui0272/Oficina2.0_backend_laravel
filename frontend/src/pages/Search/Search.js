/**
 * Css
 */
import styles from './Search.module.css';

/**
 * Iconnes
 */
import {BsFillTrashFill} from 'react-icons/bs';
import {LuFileEdit} from 'react-icons/lu';

/**
 * Hooks
 */
import { useEffect, useState } from 'react';

/**
 * Bibliotecas externas
 */
import axios from 'axios';
import { format } from 'date-fns';
import { useLocation, Link } from 'react-router-dom';





const Search = () => {

    /**
     * States
     */
    const [budgets, setBudgets]  = useState([]);
    const [loading, setLoading] = useState(true);

    /**
     * Constantes abaixo responsavel para lidar com
     * os parametros de search que chega na url
     */
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search); // Obtem os parametros de consulta
    const searchValue = searchParams.get("searchValue"); // Obtem o valor do parametro de consulta
    const dateStart = searchParams.get('dateStart');
    const dateEnd = searchParams.get('dateEnd');

    /**
    *Constantes abaixo referente ao gerenciamento de paginas
    */
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [budgetsPorPage, setBudgetsPorPage] = useState(5);
    const lastBudget = paginaAtual * budgetsPorPage;
    const firstBudget = lastBudget - budgetsPorPage;
    const budgetAtual = budgets && budgets.slice(firstBudget, lastBudget);
    const numeroDePaginas = [];


    /**
     * Loop para definir o numero de paginas de acordo com a quantidade
     * de elementos por pagina
     */
    for (let i = 1; i <= Math.ceil(budgets.length / budgetsPorPage); i++) {
        numeroDePaginas.push(i);
    }


    /**
     * Função para trocar o valor do numero da pagina atual
     */
    const handleClick = (number) => {
        setPaginaAtual(number);
    };


    /**
     * Função que executa a requisição POST para remover
     * algum dado do banco atraves do id
     */
    const handleRemove = async (id) => {
        
        try {
            await axios.delete(`http://127.0.0.1:8000/destroy/${id}`);
            window.location.href = '/'
        } catch (error) {
            console.log(error)
        }

    }

    /**
     * Função que formata a data que vai ser renderizada na pagina
     */
    const data = (data)=> {
        return format(new Date(data), 'dd/MM/yyyy');
    }


    /**
     * Função para fazer a requisição GET do os orçamentos
     * filtrados por nome do cliente ou vendedor no banco 
     * de dados, e setar no array de objetos budgets.
     * 
     */
    useEffect(() => {
        const handleSearch = async () => {
            try {
              const response = await axios.get('http://127.0.0.1:8000/search', {
                params: {
                  search: searchValue
                },
              });

              const data = response.data;
              setBudgets(data)
              setLoading(false);

            } catch (error) {
              console.error(error);
            }
        }

        handleSearch();
    },[searchValue])

    /**
     * Jsx da pagina
     */
    return (
        <div className={styles.container}>
            <h1>Buscando por {searchValue}</h1>
            {loading ? (
                <h3>Carregando</h3>
            ) : (
                <ul className={styles.ul}>

                    {/*Renderização da pagina atual e seus elementos*/}
                    {budgetAtual.map((budget) => (
                        <div key={budget.id} className={styles.budget}>

                            <p><span>Cliente: </span>{budget.cliente}</p>
                            <p><span>Descrição: </span>{budget.descricao}</p>
                            <p><span>R$ - </span>{budget.valorFormatado}</p>
                            <p><span>Vendedor: </span>{budget.vendedor}</p>
                            <p><span>Data: </span>{data(budget.created_at)}</p>

                            <div className={styles.menu}>
                                <Link to={`/edit/${budget.id}`} className={styles.navlink}><LuFileEdit className={styles.icon}/></Link>
                                <BsFillTrashFill className={styles.icon} onClick={() => {
                                    handleRemove(budget.id)
                                }}/>
                            </div>
                        </div>   
                    ))}
                </ul>
            )}
            
            {/*Renderização dos botoes da paginação*/}
            <div>
                <div className={styles.ulpages}>
                    <p>Pagina Atual: {paginaAtual}</p>
                        <ul className={styles.ulPage}>
                            {numeroDePaginas.map((number) => (
                                <li key={number}>
                                    <button onClick={() => handleClick(number)}>{number}</button>
                                </li>
                            ))}
                        </ul>
                </div>
            </div>
        </div>
    )
    }

export default Search