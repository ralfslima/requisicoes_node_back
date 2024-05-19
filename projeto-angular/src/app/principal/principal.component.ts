import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Pessoa {
  nome: string;
  idade: number;
}

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  registros: Pessoa[] = [];
  nome: string = '';
  idade: string = '';

  constructor() { }

  ngOnInit(): void {
    this.obterRegistros();
  }

  obterRegistros(): void {
    fetch('http://localhost:8080')
      .then(response => response.json())
      .then(data => {
        this.registros = data;
      })
      .catch(error => {
        console.error('Erro ao obter registros:', error);
      });
  }

  cadastrar(): void {
    const pessoa: Pessoa = { nome: this.nome, idade: parseInt(this.idade) };
    console.log(pessoa)

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