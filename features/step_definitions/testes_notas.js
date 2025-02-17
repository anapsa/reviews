import { Given, When, Then } from '@cucumber/cucumber';

import fs from 'fs';
const filePath = "test.json";

const userId = "joao";
const notes = [
    {
        id: 1,
        title: "Um Sonho de Liberdade",
        note: "muito emocionantes"
    },
    {
        id: 2,
        title: "O Poderoso Chefão",
        note: "uma obra de primeira qualidade"
    },
    {
        id: 3,
        title: "O Cavaleiro das Trevas",
        note: "um ótimo filme"
    }
]
function getAllNote() {
    try {
        const dadosBrutos = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(dadosBrutos);
        return data;
    } catch (erro) {
        console.error('Erro ao ler o arquivo:', erro);
    }
}
function addNote(title, note) {
    try {
        const data = getAllNote();
        const notes =
        {
            id: data.length + 1,
            title: title,
            note: note,
        };
        data.push(notes);
        const dadosJSON = JSON.stringify(data, null, 2); // 'null' e '2' são usados para formatar o JSON com indentação
        fs.writeFileSync(filePath, dadosJSON, 'utf8');
    } catch (erro) {
        console.error('Erro ao escrever no arquivo:', erro);
    }
}

function updateNote(title, note) {
    try {
        const data = getAllNote();
        data.forEach(element => {
            if (element.title == title) {
                element.note = note;
            }
        });
        const dadosJSON = JSON.stringify(data, null, 2); // 'null' e '2' são usados para formatar o JSON com indentação
        fs.writeFileSync(filePath, dadosJSON, 'utf8');
    } catch (erro) {
        console.error('Erro ao escrever no arquivo:', erro);
    }
}

function deleteNote(title) {
    try {
        const data = getAllNote();
        const index = data.findIndex(element => element.title === title);
        if (index !== -1) {
            data.splice(index, 1);
        }
        const dadosJSON = JSON.stringify(data, null, 2); // 'null' e '2' são usados para formatar o JSON com indentação

        fs.writeFileSync(filePath, dadosJSON, 'utf8');
    } catch (erro) {
        console.error('Erro ao escrever no arquivo:', erro);
    }
}


function newTest(data) {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Apaga o arquivo existente
            console.log('---|Iniciando Novo Arquivo de Testes|---');
        }
        const dadosJSON = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, dadosJSON, 'utf8');
    } catch (erro) {
        console.error('Erro ao manipular o arquivo:', erro);
    }
}

function compareData(data, data2) {
    if (data.length == data2.length) {
        let cont = 0;
        for (let index = 0; index < data.length; index++) {
            if (data[index].title == data2[index].title) {
                //console.log("\n", movies[index].id, "==", json[index].id, "\n");
                cont++;
            }
        }
        if (cont == data.length) {
            console.log("\nSim\n");
        } else {
            console.log('\nNão\n');
        }
    } else {
        console.log('\nNão\n');
    }
}

Given('as seguintes notas do usuario {string} existem:', function (string, dataTable) {
    newTest(notes);
    const data = getAllNote(userId);
    const dataTableNew = dataTable.hashes();
    console.log(`as seguintes notas do usuario ${string} existem:`);
    compareData(dataTableNew, data);
});

Then('as seguintes notas devem existir:', function (dataTable) {
    const data = getAllNote(userId);
    const dataTableNew = dataTable.hashes();
    console.log(`as seguintes notas devem existir:`);
    compareData(dataTableNew, data);
});

When('adiciono uma nova nota para o title {string}, com o seguinte texto {string}', function (string, string2) {
    const data = getAllNote(userId);
    addNote(string,string2);
    console.log(`adiciono uma nova nota para o title ${string}, com o seguinte texto ${string}`);
});

When('edito a nota do title {string} para {string}', function (string, string2) {
    updateNote(string, string2);
    console.log(`\nedito a nota do title ${string} para ${string}`);
    const data = getAllNote(userId);
    data.forEach(element => {
        if (element.title == string) {
            if (element.note = string2) {
                console.log("\nSim\n");
            }
        }
    });
});

When('remover a nota do title {string}', function (string) {
    deleteNote(string);
    console.log(`remover a nota do title ${string}`);
    const data = getAllNote(userId);
    const index = data.findIndex(element => element.title === string);
    if (index == -1) {
        console.log("\nSim\n");
    }
});

