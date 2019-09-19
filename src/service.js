import * as Utils from './data';


export default function getMessages() {
    return new Promise(function (resolve) {
        Utils.getMembers().then(members => {
            Utils.getMessages().then(messages => {

                const fetchedMembers = {};
                const messagesList = [];


                messages.forEach(function (msg) {
                    const {userId, id, message, timestamp} = msg;
                    let member = fetchedMembers.userId;
                    if (!member) {
                        member = findMemberById(userId, members);

                        if (member.length > 0) {
                            member = member[0];
                            fetchedMembers.userId = member[0];
                        }

                    }


                    if (member) {
                        const {firstName, lastName, email, avatar} = member;
                        const date = new Date(timestamp);
                        messagesList.push(
                            {
                                messageId: id,
                                userId,
                                fullName: `${firstName} ${lastName}`,
                                timestamp: `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                                email,
                                message,
                                avatar
                            }
                        );
                    }

                });

                messagesList.sort(comapreMessage);

                return resolve(messagesList);

            })
        });

    });
};

function comapreMessage(a, b) {
    return a.timestamp - b.timestamp;
}

function findMemberById(userId, members) {
    return members.filter(member => member.id === userId);

}


/*
export default function getChatLog() {
  return Promise.resolve([{
    messageId: '12356',
    userId: '613651251',
    fullName: 'Robin Balmforth',
    timestamp: new Date().toISOString(),
    email: 'robin@example.com',
    message: 'Hello, World!',
    avatar: null
  }]);
};
*/
