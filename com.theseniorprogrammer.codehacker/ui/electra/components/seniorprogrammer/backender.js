import axios from 'axios';

class BackendHandler {

    constructor() {
        this.seniorBaseURL = 'http://localhost:17070/';
        this.commandTopicGroups = '/groups';
        this.commandTopicContent = '/topic';
        this.commandOpenCodeHacker = '/codehacker';
    }

    getTopicGroups(callback, onerror) {
        
        axios
            .request({
                method: "get",
                url: this.commandTopicGroups,
                crossDomain: true,
                baseURL: this.seniorBaseURL,
            })
            .then(function(response) {
                console.log(response.data);
                if (callback)
                    callback(response.data);
            })
            .catch(function (error) {
                console.log('BackendHandler :: getTopicGroups :: error');
                console.log(error);
                if (onerror)
                    onerror(error);
            });
    }

    getTopicContent(topicName, callback, onerror) {

        axios
            .request({
                method: "get",
                url: this.commandTopicContent,
                crossDomain: true,
                baseURL: this.seniorBaseURL,
                params: {
                    topic: topicName
                },
            })
            .then(function(response) {
                console.log(response.data);
                if (callback)
                    callback(response.data);
            })
            .catch(function (error) {
                console.log('BackendHandler :: getTopicContent :: error');
                console.log(error);
                if (onerror)
                    onerror(error);
            });
    }

    openCodeHackerForTopic(topicName, callback, onerror) {

    }

}

const Backender = new BackendHandler();

export {Backender}