import axios from 'axios';

class BackendHandler {

    BackendHandler() {
        this.seniorBaseURL = 'http://localhost:17070/';
        this.commandTopicGroups = '/groups';
        this.commandTopicContent = 'http://localhost:17070/topic?';
        this.commandOpenCodeHacker = 'http://localhost:17070/codehacker?';

        this.debug = true;

        this.getTopicGroups = this.getTopicGroups.bind(this);
    }

    getTopicGroups(callback, onerror) {

        console.log(this.seniorBaseURL);
        
        axios
            .request({
                method: "get",
                url: '/groups',
                crossDomain: true,
                baseURL: 'http://localhost:17070/',
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

        axios.get(this.commandTopicContent + topicName)

            .then(function(response) {

                if (this.debug)
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