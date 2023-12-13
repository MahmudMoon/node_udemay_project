const fs = require('fs');
const logHelper = require('./LoggerHelper');

function loadNotes(){
    try{
        let data = fs.readFileSync('./data/test_doc.json', 'utf-8')
        return JSON.parse(data);
    }catch(err){
        throw err;
    }
}

function saveNotes(notes){
    fs.writeFileSync('./data/test_doc.json', JSON.stringify(notes));
}

module.exports = {
    write: (json) => {
        try {
            if (!fs.existsSync('./data')) {
                fs.mkdirSync('./data');
            }
            if (fs.existsSync('./data/test_doc.json')) {
                fs.readFile('./data/test_doc.json', 'utf-8', (err, data) => {
                    if (err) throw err;
                    let tmpAry = [];
                    tmpAry = JSON.parse(data);
                    if(tmpAry.find(element=>element.title == json.title)){
                        tmpAry.forEach(element => {
                            if(element.title == json.title){
                                element.body = json.body;
                            }
                        });
                    }else{
                        tmpAry.push(json);
                    }
                    fs.writeFile('./data/test_doc.json', JSON.stringify(tmpAry), (err) => {
                        if (err) throw err;
                        logHelper.info('Appended');
                    })
                })

            } else {
                let tmpAry = [];
                tmpAry.push(json);
                fs.writeFile('./data/test_doc.json', JSON.stringify(tmpAry), (err) => {
                    if (err) throw err;
                    logHelper.info('Writing completed');
                })
            }
        } catch (err) {
            logHelper.error('Failed to Write in file ' + err);
        }
    },

    read: async (title) => {
        if (fs.existsSync('./data/test_doc.json')) {
            let tmpAry = loadNotes();
            return await tmpAry.find(element => { if(element.title == title) return element })
        }
    },

    list: async () => {
        if (fs.existsSync('./data/test_doc.json')) {
            return await loadNotes();
        }
    },

    delete: async (title) => {
        if (fs.existsSync('./data/test_doc.json')) {
            let jsonAry = loadNotes();
            let filteredAry = jsonAry.filter((element)=>{
                return element.title != title
            })
            return await saveNotes(filteredAry);
        }
    }
}
