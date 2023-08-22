const { DynamoDB } = require('aws-sdk');

const getUsers = async (_event) => {
  try {
    const documentClient = new DynamoDB.DocumentClient();
    const result = await documentClient.scan({ TableName: 'UserTable' }).promise();
    const users = result.Items;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users),
    };

  } catch (error) {
    console.log(error)
  }
}

module.exports = { getUsers };