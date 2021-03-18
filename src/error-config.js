Error.prepareStackTrace = (err, stack) => {
  let jsonMessage = undefined;
  try {
    jsonMessage = JSON.parse(err.message);
  } catch (e) {}

  return JSON.stringify({
    level: jsonMessage ? jsonMessage.level : 'error',
    message: jsonMessage ? jsonMessage.message : err.message,
    stack: stack.map(frame => ({
      file: `./${frame.getFileName().match(/[^\/]+$/)}`,
      column: frame.getColumnNumber(),
      line: frame.getLineNumber(),
      functionName: frame.getFunctionName()
    }))
  });
};
