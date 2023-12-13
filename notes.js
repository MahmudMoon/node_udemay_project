const logHelper = require('./LoggerHelper');
const filesystemHelper = require('./FileSystemHelper');

module.exports = {
    getNotes: ()=>{
        debugger;
        logHelper.info('getting notes');
        filesystemHelper.list()
        .then(res=>{
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    },

    readSingleNote: (title) =>{
        logHelper.info('getting single note' + title);
        filesystemHelper.read(title)
            .then(res =>{
                console.log(res);
            })
            .catch(err =>{
                logHelper.error(err);
            })
    },


    removeNote: (title) =>{
        logHelper.info('removing note');
        filesystemHelper.delete(title);
    },


    addNote: (title, body) => {
        debugger;
        logHelper.info('adding note '+ title+ " ," + body);
        filesystemHelper.write({title: title, body: body});
    }
};