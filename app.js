const logHelper = require('./LoggerHelper');
const notes = require('./notes');
const yargs = require('yargs');


yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'title of the note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'body of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv)=>{
        notes.addNote(argv.title, argv.body);
    }
})

yargs.command({
    command: 'remove',
    describe: 'removing a note', 
    builder: {
        title: {
            describe: 'note title',
            type: 'string',
            demandOption: true
        }
    },
    handler: (args)=>{
        logHelper.info('Title ' + args.title);
        notes.removeNote(args.title);
    }
})

yargs.command({
    command: 'list',
    describe: 'listing notes',
    handler: ()=>{
        logHelper.info('listing notes ');
        notes.getNotes();
    }
})

yargs.command({
    command: 'read',
    describe: 'reading a note',
    builder: {
        title: {
            describe: 'title of note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv)=>{
        logHelper.info('reading note , Title '+ argv.title);
        notes.readSingleNote(argv.title);
    }
})

yargs.parse()

