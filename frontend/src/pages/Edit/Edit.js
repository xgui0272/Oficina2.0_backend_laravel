/**
 * Css
 */
import styles from './Edit.module.css';


/**
 * Hooks
 */
import { useState, useEffect } from "react";


/**
 * Bibliotecas externas
 */
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Edit = () => {


    /**
     * States que gerencia os valores dos inputs
     */
    const [errors, setErrors] = useState([]);
    const [cliente, setCliente] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [vendedor, setVendedor] = useState('');
    const [loading, setLoading] = useState(true);
    

    /**
     * Id vindo da url
     */
    const {id} = useParams();

    /** 
    * As duas proximas funções abaixo são para lidar
    * com os inputs de cliente e vendedor e não permitir
    * que o usuario colocar numeros nos nomes.
    */
    const handleCliente = (e) => {
        let value = e.target.value
        if (!/\d/.test(value)) {
            setCliente(value);
        }  
    }

    const handleVendedor = (e) => {
        let value = e.target.value
        if (!/\d/.test(value)) {
            setVendedor(value);
        }  
    }
   
    
    /**
     * Função GET para resgatar os dados para edição atraves do Id
     * e tambem setar os dados nos inputs
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/edit/${id}`);
                const data = response.data;

                setCliente(data.cliente);
                setDescricao(data.descricao);
                setValor(data.valor);
                setVendedor(data.vendedor);
                setLoading(false)
                
            } catch (error) {
                console.log(error)
            }

        }

        fetchData();
        
    }, [])



    /**
     * Função que faz a requisição de POST para
     * fazer o update dos dados atraves do id
    */
    const handleUpdate = async (e) => {
        e.preventDefault();
        
        /**
         * Objeto com dados dos states para ser enviado na requisição POST de update
         */
        const budget = {
            id: id,
            cliente,
            vendedor,
            descricao,
            valor,
        }

        

        try {
            const response = await axios.put(`http://127.0.0.1:8000/update/${id}`, budget);
            window.location.href = '/';
        } catch (errors) {

            let errorMsg = errors.response.data.message.split(' (');
            setErrors(errorMsg[0]);
            
        }
        
        /**
         * Função para remover o erro da tela
         */
        setTimeout(() => {
            setErrors([]);
        }, 3000);

    }

    
 

    /**
     * Jsx da pagina
     */
  return (
    <div className={styles.container}>
        <h1>Editando orçamento do cliente {cliente}</h1>
        <form  className={styles.form}>
            <div>
                <label>Cliente: </label>
                <input type='text' name='cliente' placeholder='Digite o nome do cliente' onChange={handleCliente} value={cliente}/>
            </div>

            <div>
                <label>descrição:</label>
                <textarea name='descricao' placeholder='Por favor digite a descrição' onChange={(e) => setDescricao(e.target.value)} value={descricao}></textarea>
            </div>
                
            <div>
                <label>Valor total:</label>
                <input type='number' name='valor' placeholder='Por favor digite o valor total'  onChange={(e) => setValor(e.target.value)} value={valor}/>
            </div>

            <div>
                <label>Vendedor:</label>
                <input type='text' name='vendedor' placeholder='Digite o nome do vendedor' onChange={handleVendedor} value={vendedor}/>
            </div>    
    
            <button type='submit' className={styles.btn} onClick={handleUpdate}>Editar</button>
            {errors.length > 0 && <p className={styles.errors}>{errors}</p>}
        </form>
    </div>
  )
}

export default Edit