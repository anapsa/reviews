import fs from 'fs';
const filePath = "test.json";

export function getAllNote() {
    try {
        const dadosBrutos = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(dadosBrutos);
        return data;
    } catch (erro) {
        console.error('Erro ao ler o arquivo:', erro);
    }
}
export function addNote(title, note) {
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

export function updateNote(title, note) {
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

export function deleteNote(title) {
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
