import React, { useState, useEffect } from 'react';

function App() {
  const [registros, setRegistros] = useState([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');

  // Função para obter todos os registros da API
  const obterRegistros = () => {
    fetch('http://localhost:8080')
      .then(response => response.json())
      .then(data => setRegistros(data))
      .catch(error => console.error('Erro ao obter registros:', error));
  };

  // Função para cadastrar uma pessoa na API
  const cadastrar = () => {
    const pessoa = { nome, idade };

    fetch('http://localhost:8080', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pessoa)
    })
      .then(response => response.json())
      .then(data => {
        setRegistros([...registros, data]);
        setNome('');
        setIdade('');
      })
      .catch(error => console.error('Erro ao cadastrar pessoa:', error));
  };

  useEffect(() => {
    obterRegistros();
  }, []); // Executa apenas uma vez no carregamento inicial

  return (
    <div>
      {/* Formulário */}
      <form>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Idade"
          value={idade}
          onChange={e => setIdade(e.target.value)}
        />
        <button type="button" onClick={cadastrar}>
          Cadastrar
        </button>
      </form>

      {/* Tabela */}
      <table border="1">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro, index) => (
            <tr key={index}>
              <td>{registro.nome}</td>
              <td>{registro.idade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
