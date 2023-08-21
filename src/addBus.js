const { DynamoDB } = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const addBus = async (event) => {
  try {
    const documentClient = new DynamoDB.DocumentClient();
    const { name, schedule } = JSON.parse(event.body);
    const books = []
    const createdAt = (new Date()).toString();
    const id = uuidv4();

    const newBus = {id, name, schedule, books, createdAt};

    await documentClient.put({
      TableName : "BusTable",
      Item: newBus,
    }).promise();

    return {
      status: 200,
      data: newBus
    }

  } catch (error) {
    console.log(error)
  }
}

module.exports = { addBus };