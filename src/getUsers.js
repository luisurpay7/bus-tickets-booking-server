const { DynamoDB } = require('aws-sdk');

const getUsers = async (_event) => {
  try {
    const documentClient = new DynamoDB.DocumentClient();
    const result = await documentClient.scan({ TableName: 'UserTable' }).promise();
    const users = result.Items;

    return {
      status: 200,
      data: users
    }

  } catch (error) {
    console.log(error)
  }
}

module.exports = { getUsers };