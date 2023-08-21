const { DynamoDB } = require('aws-sdk');

const getBuses = async (_event) => {
  try {
    const documentClient = new DynamoDB.DocumentClient();
    const result = await documentClient.scan({ TableName: 'BusTable' }).promise();
    const buses = result.Items;

    return {
      status: 200,
      data: buses
    }

  } catch (error) {
    console.log(error)
  }
}

module.exports = { getBuses };