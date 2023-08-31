//Css
import styles from './Nav.module.css';

//Icones
import {BsSearch} from 'react-icons/bs'

//Outros bibliotecas externas
import axios from 'axios'

//Hooks
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Nav = () => {

  /**
   * States da barra de tarefa
   */
  const [search, setSearch] = useState('');
  const [searchDateStart, setSearchDateStart] = useState('')
  const [searchDateEnd, setSearchDateEnd] = useState('')

  /**
   * Função para formatar a data para consulta no banco de dados
   * 
   */
  const formataData = (data) => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };
  /**
   * Jsx da NavBar
   * 
   */

  return (
    <div className={styles.nav}>

      <div className={styles.nav1}>
            <div className={styles.searchBar}>
                <input type='text' placeholder='Pesquise por nome de cliente ou funcionario' onChange={(e) => setSearch(e.target.value)}  value={search}/>
                <Link to={{pathname: "/search", search: `?searchValue=${search}`}} className={styles.no_decoration}><BsSearch className={styles.lupa}/></Link>
            </div>     
      </div>

      <div className={styles.nav2}>
          <div className={styles.searchData}>
              <label>Data Inicio </label>
              <input type='date' onChange={(e) => setSearchDateStart(formataData(new Date(e.target.value)))} value={searchDateStart}/>
              <label>Data Final</label>
              <input type='date' onChange={(e) => setSearchDateEnd(formataData(new Date(e.target.value)))} value={searchDateEnd}/>
              <Link to={{pathname: '/searchdate', search: `?dateStart=${searchDateStart}&dateEnd=${searchDateEnd}`}}><BsSearch className={styles.lupaData}/></Link>
          </div>

          <div className={styles.links}>
              <Link to='/' className={styles.navlink}><span>Inicio</span></Link>
              <Link to='/create' className={styles.navlink}><span>Cadastrar</span></Link>
          </div>
      </div>

      

        


    </div>
  )
}
