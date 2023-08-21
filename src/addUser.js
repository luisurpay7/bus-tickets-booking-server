const { DynamoDB } = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const addUser = async (event) => {
  try {
    const documentClient = new DynamoDB.DocumentClient();
    const { name } = JSON.parse(event.body);
    const createdAt = (new Date()).toString();
    const id = uuidv4();

    const newUser = {id, name, createdAt};

    await documentClient.put({
      TableName : "User",
      Item: newUser,
    }).promise();

    return {
      status: 200,
      data: newUser
    }

  } catch (error) {
    console.log(error)
  }
}

module.exports = { addUser };