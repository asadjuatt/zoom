import { useSelector, useDispatch } from 'react-redux'
import { Button, Card, Col, Container, FormLabel, Row } from 'react-bootstrap';
import MainLayout from '../Layouts/MainLayout';
import { useEffect } from 'react';
import { deleteMeetingThunk, getMeetingThunk } from '../slices/meetings';
import { RootStateReducer } from '../store';
import moment from 'moment';
function App() {
  const { meetings } = useSelector((state: RootStateReducer) => state);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMeetingThunk());
  }, [])
  return (
    <MainLayout>
      <Container>
        <h1>Total Meetings: <mark>{meetings.total_records}</mark></h1>
        {
          meetings.meetings.map(({ start_time, topic, join_url, duration,created_at, type, id }, index) => {
            return <Card key={index} style={{ margin: "10px 0px" }}>
              <Card.Header as="h5">{topic}</Card.Header>
              <Card.Body>
                {/* <Card.Title>start_time = {moment(start_time).format('DD/MM/yyyy hh:mm a')}</Card.Title> */}
                <Card.Title>Meeting Id : {id}</Card.Title>
                <Card.Text>duration = {moment.utc(moment.duration(duration, "minutes").asMilliseconds()).format("HH:mm")}</Card.Text>
                <Card.Text>Start Time = {start_time}</Card.Text>
                <Card.Text>Created At = {created_at}</Card.Text>

                <Card.Text>type = {type === 1 ? " An instant meeting." : type === 2 ? "A scheduled meeting." : type === 3 ? "A recurring meeting with no fixed time." : "A recurring meeting with fixed time."}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Container>
                  <Row>
                    <Col lg={9}xs={8} md={10} sm={6}>
                      <a href={join_url}>Start</a>
                    </Col>
                    <Col lg={3} xs={4} md={2} sm={6}>
                      <Button variant='danger' onClick={() => dispatch(deleteMeetingThunk({ id: id.toString() }))}>Delete Meeting</Button>
                    </Col>
                  </Row>
                </Container>
              </Card.Footer>
            </Card>
          })
        }
        {meetings.meetings.length === 0 && <FormLabel>There is no Meeting created yet.</FormLabel> }
      </Container>

    </MainLayout>
  );
}

export default App;
