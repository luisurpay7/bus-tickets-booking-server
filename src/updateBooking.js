const { DynamoDB } = require('aws-sdk');

const updateBooking = async (event) => {
  try {
    const documentClient = new DynamoDB.DocumentClient();
    const { user_id, buses_id } = JSON.parse(event.body);

    const result = await documentClient.scan({ TableName: 'BusTable' }).promise();
    const buses = result.Items;

    for (let i = 0; i < buses.length; i++) {
      const bus_id =buses[i].id; 
      const books = buses[i].books;
      if (buses_id.includes(bus_id) && !books.includes(user_id)) {  // si se está reservando y es una nueva reserva
        books.push(user_id);
      } else if (!buses_id.includes(bus_id) && books.includes(user_id)) {  // si no se está reservando y ya estaba incluido
        books.splice(books.indexOf(user_id), 1)
      }
      await documentClient
        .update({
          TableName: "BusTable",
          Key: { id: bus_id },
          UpdateExpression: "set books = :books",
          ExpressionAttributeValues: {
            ":books": books,
          },
          ReturnValues: "ALL_NEW",
        })
        .promise();
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Correct"
      })
    }

  } catch (error) {
    console.log(error)
  }
}

module.exports = { updateBooking };