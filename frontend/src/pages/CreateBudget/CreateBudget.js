/**
 * Css
 */
import styles from './CreateBudget.module.css'

/**
 * Hooks
 */
import { useState } from 'react'

/**
 * Bibliotecas externas
 */
import axios from 'axios';



const CreateBudget = () => {


    /**
     * States que gerencia os valores dos inputs
     */
    const [cliente, setCliente] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [vendedor, setVendedor] = useState('');
    const [errors, setErrors] = useState([])

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
     * Função que faz a requisição de POST para
     * Criar novos orçamentos no banco
    */
    const handleSubmit = async (e) => {
        e.preventDefault();

        /**
         * Objeto com dados dos states para ser enviado na requisição POST de Insert
         */
        const budget = {
            cliente,
            descricao,
            valor,
            vendedor
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/insert', budget);
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
        <h1>Cadastre um novo Orçamento</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
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
    
            <button type='submit' className={styles.btn}>Cadastrar</button>
            {errors.length > 0 && <p className={styles.errors}>{errors}</p>}
            
        </form>

        

    </div>
  )
}

export default CreateBudget