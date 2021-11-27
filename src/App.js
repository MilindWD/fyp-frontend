//react imports
import { useCallback, useEffect, useState } from "react";
import { Container, Button, Row, Col, Spinner } from "react-bootstrap";

//make requests using axios
import axios from "axios";



function App() {

  //hooks
  const [tweetContent, setTweetContent] = useState("abcd");
  const [tweetId, setTweetId] = useState("");
  const [loading, setLoading] = useState(false);
  const [canClick, setCanClick] = useState(true);

  //tweet
  const curr_tweet = {
    content: tweetContent,
    _id: tweetId
  };

  //functions
  const changeTweet = async () => {
    const tweet = await axios.get("https://fyp0-backend.herokuapp.com/tweet");
    const content = tweet.data.content;
    const _id = tweet.data._id;
    setTweetContent(content);
    setTweetId(_id);
  };

  const changeTweetCall = useCallback(() => changeTweet(), []);

  const send_data = async () => {
    try {
      await axios.post("https://fyp0-backend.herokuapp.com/tweet", curr_tweet);
    } catch (error) {
      console.log("error: " + error.message);
    }
  };

  const response_handle = async (response) => {
    if(!canClick) return;
    setLoading(true);
    setCanClick(false);
    curr_tweet['response'] = response;
    await send_data();
    await changeTweet();
    setLoading(false);
    setCanClick(true);
  };

  useEffect(() => {
    (async () => {
      await changeTweetCall();
    })()
  }, [changeTweetCall]);

  return (
    <div className="App">
      <Container>
        <Row>
          <Col
            className="wrapper"
            lg={{ span: 8, offset: 2 }}
            xs={{ span: 10, offset: 1 }}
          >
            <Container>
              <Row className="tweet-row">
                {loading ? (
                  <Spinner animation="border" variant="primary" />
                ) : (
                  <Col className="tweet">{tweetContent}</Col>
                )}
              </Row>
              <hr></hr>
              <Row className="button-row">
                <Col xs={6}>
                  <Button
                    onClick={() => response_handle("pos")}
                    className="btn-full"
                  >
                    Positive
                  </Button>
                </Col>
                <Col xs={6}>
                  <Button
                    onClick={() => response_handle("neg")}
                    className="btn-full"
                  >
                    Negative
                  </Button>
                </Col>
              </Row>
              <Row className="button-row">
                <Col xs={6}>
                  <Button
                    onClick={() => response_handle("pos_rep")}
                    className="btn-full"
                  >
                    Positive Reported
                  </Button>
                </Col>
                <Col xs={6}>
                  <Button
                    onClick={() => response_handle("neg_rep")}
                    className="btn-full"
                  >
                    Negative Reported
                  </Button>
                </Col>
              </Row>
              <Row className="button-row">
                <Col xs={6}>
                  <Button
                    onClick={() => response_handle("neutral")}
                    className="btn-full"
                  >
                    Neutral
                  </Button>
                </Col>
                <Col xs={6}>
                  <Button
                    onClick={() => response_handle("irrelevant")}
                    className="btn-full"
                  >
                    Irrelevant
                  </Button>
                </Col>
              </Row>
            </Container>
            <hr></hr>
            <Container>
                  <Row className="tweet-row info">
                  <span style={{fontWeight: 'bold'}}>Info:</span>
                    <ol style={{marginLeft: '2%'}}>
                      <li><b>Positive:</b> tweet is positive towards CAA/NRC</li>
                      <li><b>Negative:</b> tweet is negative towards CAA/NRC </li>
                      <li><b>Positive Reported:</b> tweet is a fact and is positive towards CAA/NRC</li>
                      <li><b>Negative Reported:</b> tweet is a fact and is negative towards CAA/NRC</li>
                      <li><b>Neutral:</b> tweet is neutral towards CAA/NRC</li>
                      <li><b>Irrelevant:</b> tweet is irrelevant towards CAA/NRC</li>
                    </ol>
                  </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
