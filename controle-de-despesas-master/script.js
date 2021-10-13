const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

/*Todas as const declaradas recebem o querySelector com o ID de cada item que está sendo trabalhado, dessa maneira é mais fácil referenciar 
oq vai ser alterado com o JavaScript!!!*/


// essa const guarda o localS que será responsavel por pegar os itens da transaction
const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))


// A Let transaction vai armazenar os valores digitados no submit e adicionar no localStorage da page
let transactions = localStorage
.getItem('transactions') !== null ? localStorageTransactions : []

// Função que remove as TR do DOM
const removeTransaction = ID =>{
     transactions = transactions.filter(transactions => 
     transactions.id !== ID)
     updateLocalStorage
     init()
     
}
   
 /*Função que vai adicionar os itens das transações na lista(ul,li) */
 const addTransactionsIntoDOM = transactions => { 
 const operator = transactions.amount < 0 ? '-' : '+' /*Condição ternária que armazena apenas dois valores boleanos*/
 const CSSClass = transactions.amount < 0 ? 'minus' : 'plus'  /*Adiciona uma class no html indicado*/
 const amountWithoutOperator = Math.abs(transactions.amount) /** Vai retornar os valores abs e evitar que os sinais de + e - se repitam no HTML na hora que a TR for adicionada */
 const li = document.createElement('li') /**Cria elementos HTML no caso desse programa eu estou criando uma LI */

li.classList.add(CSSClass)
li.innerHTML = ` 
${transactions.name} 
<span>${operator} R$ ${Math.abs(amountWithoutOperator)} </span>
<button class="delete-btn" onClick="removeTransaction(${transactions.id})">
x
</button>
`
transactionsUl.append(li)
}

/** Função que vai adiconar as os valores no display do controle de gastos */
const updateBalanceValues = () => {
    const transactionsAmounts = transactions
        .map(transactions => transactions.amount) // para cada elemento do Array e devolvido um novo Array como resultado
    const total = transactionsAmounts
        .reduce((accumulator, transactions) => accumulator + transactions, 0)
        .toFixed(2)  /** formata um número utilizando notação de ponto fixo.  */
    const income = transactionsAmounts
        .filter(value => value > 0) /* cria um novo array com todos os elementos que passaram no teste implementado pela função fornecida.*/
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
        const expense = Math.abs(transactionsAmounts /* métodos para constantes e funções matemáticas e Argumento do ABS*/
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2)

        balanceDisplay.textContent = `R$ ${total}`
        incomeDisplay.textContent = `R$ ${income}`
        expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionsIntoDOM)
    updateBalanceValues()
}
init();

// O LocalStorage vai ser responsavel por add os valores no Browser
const updateLocalStorage = ()=> {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionsAmount = inputTransactionAmount.value.trim()
    
    if(transactionName === '' || transactionsAmount === ''){
        alert("Insira os dados por favor!")
        return
     }
    
     const transaction = {id: generateID(), 
        name:transactionName, 
        amount: Number(transactionsAmount)
    
    }
    
    transactions.push(transaction)
    init()
    updateLocalStorage()

        inputTransactionName.value = ''
        inputTransactionAmount.value = '' 
})