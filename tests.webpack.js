var context = require.context('./test', true, /-test\.jsx?$/);
//make sure you have your directory and regex test set correctly!
context.keys().forEach(context);
