import '../style.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

const About = () => {

    return(
        <div className='backGround'>
         <h2 className = " mx-4 ">About InfoStream:</h2>
            <p className="container-sm text-center "> InfoStream is a news aggregator website built on react.js. 
            It utilizes the news api by newsapi.org. The website filters news based on the following topics: 
            entertainment, business, technology, and science.  </p>
        <h3 className = "mx-4">Meet the team:</h3>
        <Stack >
            <Card  className = "mx-auto" style={{ width: '20rem' }}>
                <Card.Body >
                <Card.Img variant="top" src="src/assets/Abigail.jpg" />
                <Card.Title> Abigail Joseph</Card.Title>
                <Card.Text>
                    Abigail is a Freshman at Cornell University studying Computer Science.
                </Card.Text>
                </Card.Body>
            </Card>
            <div className = "my-4"></div>
            <Card  className = "mx-auto"style={{ width: '20rem' }}>
                <Card.Body >
                <Card.Img variant="top" src="src/assets/Danielle.jpg" />
                <Card.Title> Danielle Imogu</Card.Title>
                <Card.Text>
                    Danielle is a Freshman at Cornell University studying Computer Science.
                </Card.Text>
                </Card.Body>
            </Card>
            <div className = "my-4"></div>
            <Card  className = "mx-auto" style={{ width: '20rem' }}>
                <Card.Body >
                <Card.Img variant="top" src="src/assets/Aryan.png" />
                <Card.Title> Aryan Kumar</Card.Title>
                <Card.Text>
                    Aryan is a Freshman at Cornell University studying Computer Science.
                </Card.Text>
                </Card.Body>
            </Card>
            <div className = "my-4"></div>
            <Card  className = "mx-auto" style={{ width: '20rem' }}>
                <Card.Body >
                <Card.Img variant="top" src="src/assets/Parvi.png" />
                <Card.Title> Parvi Chadha</Card.Title>
                <Card.Text>
                    Parvi is a Freshman at Cornell University studying Computer Science.
                </Card.Text>
                </Card.Body>
            </Card>
            <div className = "my-4"></div>

        </Stack>
             
        </div>
        
    );
}

export default About;