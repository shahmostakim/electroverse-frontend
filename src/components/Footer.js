import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
function Footer() {
  return (
    <footer>
      <Container>
        <Row>
            <Col className="text-center py-3">
                Copyright &copy; Electroverse Inc. | Developed by <a href="https://www.shahmostakim.com" target='_blank'>Shah Mostakim</a>
            </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
