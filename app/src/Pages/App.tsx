import { useSelector, useDispatch } from 'react-redux'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
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
          meetings.meetings.map(({ start_time, topic, join_url, duration, created_at, type, id }, index) => {
            return <Card key={index} style={{ margin: "10px 0px" }}>
              <Card.Header as="h5">{topic}</Card.Header>
              <Card.Body>
                {/* <Card.Title>start_time = {moment(start_time).format('DD/MM/yyyy hh:mm a')}</Card.Title> */}
                <Card.Title>start_time = {start_time}</Card.Title>

                <Card.Text>duration = {duration}</Card.Text>
                <Card.Text>created_at = {moment(start_time).format('DD/MM/yyyy hh:mm a')}</Card.Text>
                <Card.Text>created_at = {start_time}</Card.Text>

                <Card.Text>type = {type === 1 ? " An instant meeting." : type === 2 ? "A scheduled meeting." : type === 3 ? "A recurring meeting with no fixed time." : "A recurring meeting with fixed time."}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Container>
                  <Row>
                    <Col lg={9}xs={8} md={10} sm={6}>
                      <a href={join_url}>join Now</a>
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
      </Container>

    </MainLayout>
  );
}

export default App;
