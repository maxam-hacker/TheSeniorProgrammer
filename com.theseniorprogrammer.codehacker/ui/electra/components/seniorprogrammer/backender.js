import axios from 'axios';

class BackendHandler {

    BackendHandler() {
        this.topics_path = 'http://localhost:17070/topics';
        this.topic_content_path = 'http://localhost:17070/topic?';

        this.debug = true;
    }

    getTopics(callback, onerror) {
        
        axios.get(this.topics_path)

            .then(function(response) {

                if (this.debug)
                    console.log(response.data);

                if (callback)
                    callback(response.data);
            })

            .catch(function (error) {
                console.log('BackendHandler :: getTopics :: GET error');
                if (onerror)
                    onerror(error);
            });
    }

    getTopicContent(topicName, callback, onerror) {

        axios.get(this.topic_content_path + topicName)

            .then(function(response) {

                if (this.debug)
                    console.log(response.data);

                if (callback)
                    callback(response.data);
            })

            .catch(function (error) {
                console.log('BackendHandler :: getTopics :: GET error');
                if (onerror)
                    onerror(error);
            });
    }

    openCodeHacker(topicName, callback, onerror) {

    }

}

const Backender = new BackendHandler();

export {Backender}