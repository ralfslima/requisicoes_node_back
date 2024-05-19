<template>
  <div>
    <!-- Formulário -->
    <form @submit.prevent="cadastrar">
      <input type="text" v-model="nome" placeholder="Nome">
      <input type="text" v-model="idade" placeholder="Idade">
      <button type="submit">Cadastrar</button>
    </form>

    <!-- Tabela -->
    <table border="1">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Idade</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(registro, index) in registros" :key="index">
          <td>{{ registro.nome }}</td>
          <td>{{ registro.idade }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registros: [],
      nome: '',
      idade: ''
    };
  },
  mounted() {
    this.obterRegistros();
  },
  methods: {
    obterRegistros() {
      fetch('http://localhost:8080')
        .then(response => response.json())
        .then(data => {
          this.registros = data;
        })
        .catch(error => {
          console.error('Erro ao obter registros:', error);
        });
    },
    cadastrar() {
      const pessoa = { nome: this.nome, idade: parseInt(this.idade) };

      fetch('http://localhost:8080', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pessoa)
      })
        .then(response => response.json())
        .then(data => {
          this.registros.push(data);
          this.nome = '';
          this.idade = '';
        })
        .catch(error => {
          console.error('Erro ao cadastrar pessoa:', error);
        });
    }
  }
};
</script>