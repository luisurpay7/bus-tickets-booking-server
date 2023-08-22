const { DynamoDB } = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const addBus = async (event) => {
  try {
    const documentClient = new DynamoDB.DocumentClient();
    const { name, schedule, capacity } = JSON.parse(event.body);
    const books = []
    const createdAt = (new Date()).toString();
    const id = uuidv4();

    const newBus = {id, name, schedule, capacity, books, createdAt};

    await documentClient.put({
      TableName : "BusTable",
      Item: newBus,
    }).promise();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBus)
    }

  } catch (error) {
    console.log(error)
  }
}

module.exports = { addBus };