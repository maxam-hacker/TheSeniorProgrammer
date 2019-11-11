import axios from 'axios';

class BackendHandler {

    BackendHandler() {
        this.topics_path = 'http://localhost:17070/topics';
        this.topic_content_path = 'http://localhost:17070/topic?';

        this.debug = true;
    }

    getTopics(callback) {
        
        axios.get(this.topics_path)

            .then(function(response) {

                if (this.debug)
                    console.log(response.data);

                if (callback)
                    callback(response.data);
            })

            .catch(function (error) {
                console.log('BackendHandler :: getTopics :: GET error');
            });
    }

    getTopicContent(topicName, callback) {

        axios.get(this.topic_content_path + topicName)

            .then(function(response) {

                if (this.debug)
                    console.log(response.data);

                if (callback)
                    callback(response.data);
            })

            .catch(function (error) {
                console.log('BackendHandler :: getTopics :: GET error');
            });
    }

}

const Backender = new BackendHandler();

export {Backender}