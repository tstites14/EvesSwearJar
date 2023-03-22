const Command = require('../../commands/command.js');

test('Command rejects when run is called', async () => {
    //Important to include this when using asynchronous code
    expect.assertions(1);

    var command = new Command(["test", "data"]);
    
    await expect(command.run()).rejects.toThrow("This is not a valid command! Use !COMMAND help to see a list of commands!");
});