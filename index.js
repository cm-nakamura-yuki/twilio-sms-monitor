const rp = require('request-promise');

exports.handler = async (event) => {
    console.log(JSON.stringify(event));
    let array = event.body.split('&');
    console.log(array);
    
    let message = 'SMS Information \n\n';
    for (let i=0; i<array.length; i++) {
        message += array[i] + '\n';
    }
    
    console.log(message);

    let result = await notifySlack(message);
    console.log('[Notify Slack]' + result);

    return {
        statusCode: 200
    }
}

async function notifySlack(message) {
    let option = {
        'url': process.env.WEBHOOK_URL,
        'header': {
            'Content-Type': 'application/json'
        },
        'method': 'POST',
        'json': true,
        'body': {
            'text': message
        }
    };

    let result = await rp(option).promise();
    console.log(JSON.stringify(result));

    return true;
}