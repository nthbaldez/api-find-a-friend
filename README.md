# App

Find a Friend Api

## RFs

- [x] Deve ser possível se cadastrar como uma ORG;
- [x] Deve ser possível realizar login como uma ORG;
- [ ] Deve ser possível cadastrar um pet;
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [ ] Deve ser possível filtrar pets por suas características;
- [ ] Deve ser possível visualizar detalhes de um pet para adoção;

## RN (Regras de negócio)

- [x] Uma ORG precisa ter um endereço e um número de WhatsApp;
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada;
- [ ] Um pet deve estar ligado a uma ORG;
- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
- [ ] Todos os filtros, além da cidade, são opcionais;

## RNFs

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] A ORG deve ser identificado por um JWT (JSON Web Token)
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página;